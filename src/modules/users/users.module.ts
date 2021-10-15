import { Module } from '@nestjs/common';
import { CommonModule } from '../../common/common.module';

import { PrismaService } from '../../database/prisma/prisma.service';
import { MailModule } from '../mail/mail.module';
import { UploadFileModule } from '../upload-file/upload-file.module';
import { UsersTokensModule } from '../users-tokens/users-tokens.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
@Module({
  imports: [CommonModule, MailModule, UsersTokensModule, UploadFileModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
