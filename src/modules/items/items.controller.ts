import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto, PurposeTypes } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';
import { resolve } from 'path';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: resolve(__dirname, '..', '..', '..', 'tmp'),
        filename: (request, file, callback) => {
          const fileName = `${v4()}-${file.originalname}`;
          return callback(null, fileName);
        },
      }),
    }),
  )
  create(@Body() createItemDto: CreateItemDto, @Request() req) {
    createItemDto.owner_id = req.user.userId;
    createItemDto.thumbnail = req.file.filename;

    return this.itemsService.create(createItemDto);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Get('/purpose/search')
  findByPurpose(@Query() query: { purpose: PurposeTypes }) {
    const { purpose } = query;
    return this.itemsService.findByPurpose(purpose);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.itemsService.remove(id);
    return;
  }
}
