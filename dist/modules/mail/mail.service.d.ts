import ISendMailDTO from './dtos/ISendMailDTO';
import IParseMailTemplateDTO from './dtos/IParseMailTemplateDTO';
import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    parse({ file, variables, }: IParseMailTemplateDTO): Promise<string>;
    sendMail({ to, from, subject, templateData, }: ISendMailDTO): Promise<void>;
}
