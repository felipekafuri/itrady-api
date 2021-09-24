import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.findByEmail(createUserDto.email);

    if (userExists && userExists.email === createUserDto.email) {
      throw new BadRequestException(
        `User with email ${userExists.email} already exists.`,
      );
    }

    if (userExists && userExists.username === createUserDto.username) {
      throw new BadRequestException(
        `User with email ${userExists.username} already exists.`,
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

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    return await this.prismaService.user.delete({
      where: { id },
    });
  }
}
