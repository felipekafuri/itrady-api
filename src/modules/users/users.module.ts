import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';

import { PrismaService } from '../../database/prisma/prisma.service';
import { MailModule } from '../mail/mail.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [CommonModule, MailModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
