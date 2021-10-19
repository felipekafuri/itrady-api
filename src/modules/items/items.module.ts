import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UploadFileService } from '../upload-file/upload-file.service';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, PrismaService, UploadFileService],
})
export class ItemsModule {}
