import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: process.env.AWS_TRANSPORT_URL,
      defaults: {
        auth: {
          user: process.env.AWS_SMTP_USER,
          pass: process.env.AWS_SMTP_PASSWORD,
        },
        port: 465,
        secure: true,
      },
      template: {
        dir: `${__dirname}/templates`,
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
