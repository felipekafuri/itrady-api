import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateUserTokenDto } from './dto/create-user-token';

@Injectable()
export class UsersTokensService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string) {
    const token: CreateUserTokenDto = {
      userId,
      created_at: new Date(),
      expires: new Date(new Date().getHours() + 2),
    };

    return await this.prismaService.userToken.create({ data: token });
  }
}
