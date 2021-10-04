"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const handlebars_1 = require("handlebars");
const mailer_1 = require("@nestjs-modules/mailer");
let MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async parse({ file, variables, }) {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });
        const parseTemplate = handlebars_1.default.compile(templateFileContent);
        return parseTemplate(variables);
    }
    async sendMail({ to, from, subject, templateData, }) {
        await this.mailerService.sendMail({
            from: {
                name: (from === null || from === void 0 ? void 0 : from.name) || 'Equipe ITrady',
                address: (from === null || from === void 0 ? void 0 : from.email) || 'contact@felipekafuri.com',
            },
            to: {
                name: to.name || '',
                address: to.email,
            },
            subject,
            html: await this.parse(templateData),
        });
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map