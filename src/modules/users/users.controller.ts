import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { resolve } from 'path';
import { diskStorage } from 'multer';
import { Public } from '../../common/decorators/public-route.decorator';
import { v4 } from 'uuid';

interface RequestType extends Request {
  user: {
    userId: string;
  };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @Post('avatar/:id')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: resolve(__dirname, '..', '..', '..', 'tmp', 'user'),
        filename: (request, file, callback) => {
          const fileName = `${v4()}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    }),
  )
  uploadAvatar(
    @Param('id') id: string,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    const userAvatar = avatar.filename;
    return this.usersService.updateAvatar(id, userAvatar);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete()
  remove(@Request() req: RequestType) {
    return this.usersService.remove(req.user.userId);
  }

  @Post('/recommend/:id')
  recommendUser(@Param('id') id: string, @Request() req: RequestType) {
    return this.usersService.recommendUser({
      recommended_user_id: id,
      user_id: req.user.userId,
    });
  }

  @Public()
  @Post('/forgot-password')
  forgotPassword(@Body() body: { email: string }) {
    return this.usersService.forgotPassword(body.email);
  }

  @Public()
  @Post('/reset-password/:token')
  resetPassword(@Body() body, @Param('token') token) {
    const { new_password, password_confirmation } = body;

    return this.usersService.resetPassword({
      new_password,
      password_confirmation,
      token,
    });
  }
}
