import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersTokensService } from './users-tokens.service';

@Module({
  providers: [UsersTokensService, PrismaService],
  exports: [UsersTokensService],
})
export class UsersTokensModule {}
