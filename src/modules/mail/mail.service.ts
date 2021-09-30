import { Injectable } from '@nestjs/common';
import ISendMailDTO from './dtos/ISendMailDTO';
import nodemailer from 'nodemailer';
import IParseMailTemplateDTO from './dtos/IParseMailTemplateDTO';
import * as fs from 'fs';
import handlebars from 'handlebars';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }

  async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    await this.mailerService.sendMail({
      from: {
        name: from?.name || 'Equipe ITrady',
        address: from?.email || 'suporte@anjoanimal.com',
      },
      to: {
        name: to.name || '',
        address: to.email,
      },
      subject,
      html: await this.parse(templateData),
    });
  }
}
