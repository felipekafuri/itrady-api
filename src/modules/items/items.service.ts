import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UploadFileService } from '../upload-file/upload-file.service';
import { CreateItemDto, PurposeTypes } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly uploadFileService: UploadFileService,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item = await this.prismaService.item.create({
      data: {
        ...createItemDto,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    await this.uploadFileService.uploadFile(
      createItemDto.thumbnail,
      process.env.AWS_USER_BUCKET,
    );

    return item;
  }

  async findAll() {
    return this.prismaService.item.findMany();
  }

  async findOne(id: string) {
    const item = await this.prismaService.item.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Item was not found');
    }

    return item;
  }

  async findByPurpose(purpose: PurposeTypes) {
    const item = await this.prismaService.$queryRaw`
      SELECT * FROM "Item" WHERE purpose = ${purpose}
    `;

    if (!item) {
      throw new NotFoundException('Item was not found');
    }

    return item;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.uploadFileService.deleteFile(
      item.thumbnail,
      process.env.AWS_USER_BUCKET,
    );

    this.prismaService.item.delete({ where: { id } });
    return;
  }
}
