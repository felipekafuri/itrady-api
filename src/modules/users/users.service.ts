import { resolve } from 'path';

import { CommonService } from '../../common/common.service';
import { PrismaService } from '../../database/prisma/prisma.service';
import * as fs from 'fs';

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailService } from '../mail/mail.service';
import { UsersTokensService } from '../users-tokens/users-tokens.service';

interface UserRecommendation {
  recommended_user_id: string;
  user_id: string;
}

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService,
    private readonly mailService: MailService,
    private readonly userTokenService: UsersTokensService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const emailExists = await this.findByEmail(createUserDto.email);
    if (emailExists && emailExists.email === createUserDto.email) {
      throw new BadRequestException(
        `User with email ${emailExists.email} already exists.`,
      );
    }

    const userNameExists = await this.findByUsername(createUserDto.username);
    if (userNameExists && userNameExists.username === createUserDto.username) {
      throw new BadRequestException(
        `User with email ${userNameExists.username} already exists.`,
      );
    }

    createUserDto.password = await this.commonService.hashPassword(
      createUserDto.password,
    );

    const user = await this.prismaService.user.create({
      data: createUserDto,
    });

    delete user.password;

    return user;
  }

  findAll() {
    return this.prismaService.user.findMany({
      select: {
        avatar: true,
        email: true,
        id: true,
        phone_number: true,
        recommendations: true,
        username: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        avatar: true,
        email: true,
        id: true,
        phone_number: true,
        recommendations: true,
        username: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} was not found.`);
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    return user;
  }

  async findByUsername(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    return user;
  }

  async updateAvatar(id: string, avatar: string) {
    const user = await this.findOne(id);

    if (user.avatar !== '') {
      const filePath = resolve(
        __dirname,
        '..',
        '..',
        '..',
        'tmp',
        `user/${user.avatar}`,
      );
      try {
        await fs.promises.unlink(filePath);
      } catch {}
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        avatar,
      },
    });

    delete updatedUser.password;

    return updatedUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    // Check if email is already taken
    if (updateUserDto.email) {
      const emailExists = await this.findByEmail(updateUserDto.email);
      if (emailExists && emailExists.email === updateUserDto.email) {
        throw new BadRequestException(
          `User with email ${emailExists.email} already exists.`,
        );
      }
    }

    // Check if username is already taken
    if (updateUserDto.username) {
      const userNameExists = await this.findByUsername(updateUserDto.username);
      if (
        userNameExists &&
        userNameExists.username === updateUserDto.username
      ) {
        throw new BadRequestException(
          `User with username ${userNameExists.username} already exists.`,
        );
      }
    }

    // Update user
    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: updateUserDto,
    });

    delete updatedUser.password;

    return updatedUser;
  }

  async remove(id: string) {
    return await this.prismaService.user.delete({
      where: { id },
    });
  }

  async recommendUser({ recommended_user_id, user_id }: UserRecommendation) {
    const user = await this.findOne(recommended_user_id);

    if (recommended_user_id === user_id) {
      throw new ForbiddenException('User cannot recommend itself');
    }

    const payload = {
      recommended_user_id: user.id,
      user_id: user_id,
    };

    const recommendEvent = await this.prismaService.$transaction([
      this.prismaService.event.create({
        data: {
          name: 'recommend_user',
          type: 'user',
          payload,
          date: new Date(),
        },
      }),
      this.prismaService.user.update({
        where: { id: user.id },
        data: {
          recommendations: user.recommendations + 1,
        },
      }),
    ]);

    return recommendEvent;
  }

  async forgotPassword(email: string) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const templateDir = resolve(
      __dirname,
      '..',
      '..',
      'templates',
      'forgot_password.hbs',
    );

    const token = await this.userTokenService.create(user.id);

    await this.mailService.sendMail({
      subject: 'Esqueceu senha',
      templateData: {
        file: templateDir,
        variables: {
          name: user.name,
          link: `${process.env.APP_URL}/reset-password/${token.token}`,
        },
      },
      to: {
        name: user.name,
        email,
      },
    });
  }
}
