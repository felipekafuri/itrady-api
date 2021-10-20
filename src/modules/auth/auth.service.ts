import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CommonService } from '../../common/common.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { addDays, getUnixTime } from 'date-fns';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly commonService: CommonService,
    private readonly prismaService: PrismaService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException();
    }

    const isPasswordValid = await this.commonService.comparePassword(
      pass,
      user.password,
    );

    if (isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };

    const refreshToken = await this.generateRefreshToken(user.id);

    return {
      access_token: this.jwtService.sign(payload),
      refreshToken,
    };
  }

  async generateRefreshToken(userId: string) {
    const expiresIn = getUnixTime(addDays(new Date(), 2));

    await this.prismaService.refreshToken.deleteMany({
      where: { userId },
    });

    const generatedRefreshToken = await this.prismaService.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return generatedRefreshToken;
  }

  async refreshUserToken(refreshToken: string) {
    const refreshTokenData = await this.prismaService.refreshToken.findUnique({
      where: {
        id: refreshToken,
      },
    });

    if (!refreshTokenData) {
      throw new NotFoundException();
    }

    const user = await this.usersService.findOne(refreshTokenData.userId);

    const payload = { username: user.username, sub: user.id };

    // If the token has expired
    if (refreshTokenData.expiresIn < getUnixTime(new Date())) {
      await this.prismaService.refreshToken.deleteMany({
        where: { userId: refreshTokenData.userId },
      });

      const newRefreshToken = await this.generateRefreshToken(
        refreshTokenData.userId,
      );

      const refreshedAccessToken = this.jwtService.sign(payload, {
        expiresIn: newRefreshToken.expiresIn,
      });
      return {
        newRefreshToken,
        refreshedAccessToken,
      };
    } else {
      const refreshedAccessToken = this.jwtService.sign(payload, {
        expiresIn: refreshTokenData.expiresIn,
      });

      return {
        refreshedAccessToken,
      };
    }
  }
}
