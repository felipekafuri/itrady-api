import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { CommonService } from './common/common.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { UsersModule } from './modules/users/users.module';
import { MailModule } from './modules/mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { UsersTokensModule } from './modules/users-tokens/users-tokens.module';
import { UploadFileService } from './modules/upload-file/upload-file.service';
import { UploadFileModule } from './modules/upload-file/upload-file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UsersModule,
    AuthModule,
    CommonModule,
    MailModule,
    UsersTokensModule,
    UploadFileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useExisting: JwtAuthGuard,
    },
    JwtAuthGuard,
    CommonService,
    UploadFileService,
  ],
})
export class AppModule {}
