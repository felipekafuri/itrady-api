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
exports.UsersService = void 0;
const path_1 = require("path");
const common_service_1 = require("../../common/common.service");
const prisma_service_1 = require("../../database/prisma/prisma.service");
const fs = require("fs");
const common_1 = require("@nestjs/common");
const mail_service_1 = require("../mail/mail.service");
const users_tokens_service_1 = require("../users-tokens/users-tokens.service");
let UsersService = class UsersService {
    constructor(prismaService, commonService, mailService, userTokenService) {
        this.prismaService = prismaService;
        this.commonService = commonService;
        this.mailService = mailService;
        this.userTokenService = userTokenService;
    }
    async create(createUserDto) {
        const emailExists = await this.findByEmail(createUserDto.email);
        if (emailExists && emailExists.email === createUserDto.email) {
            throw new common_1.BadRequestException(`User with email ${emailExists.email} already exists.`);
        }
        const userNameExists = await this.findByUsername(createUserDto.username);
        if (userNameExists && userNameExists.username === createUserDto.username) {
            throw new common_1.BadRequestException(`User with email ${userNameExists.username} already exists.`);
        }
        createUserDto.password = await this.commonService.hashPassword(createUserDto.password);
        const user = await this.prismaService.user.create({
            data: createUserDto,
        });
        delete user.password;
        return user;
    }
    findAll() {
        return this.prismaService.user.findMany({
            select: {
                avatar: true,
                email: true,
                id: true,
                phone_number: true,
                recommendations: true,
                username: true,
            },
        });
    }
    async findOne(id) {
        const user = await this.prismaService.user.findUnique({
            where: { id },
            select: {
                avatar: true,
                email: true,
                id: true,
                phone_number: true,
                recommendations: true,
                username: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} was not found.`);
        }
        return user;
    }
    async findByEmail(email) {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });
        return user;
    }
    async findByUsername(username) {
        const user = await this.prismaService.user.findUnique({
            where: { username },
        });
        return user;
    }
    async updateAvatar(id, avatar) {
        const user = await this.findOne(id);
        if (user.avatar !== '') {
            const filePath = (0, path_1.resolve)(__dirname, '..', '..', '..', 'tmp', `user/${user.avatar}`);
            try {
                await fs.promises.unlink(filePath);
            }
            catch (_a) { }
        }
        const updatedUser = await this.prismaService.user.update({
            where: { id: user.id },
            data: {
                avatar,
            },
        });
        delete updatedUser.password;
        return updatedUser;
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
        if (updateUserDto.email) {
            const emailExists = await this.findByEmail(updateUserDto.email);
            if (emailExists && emailExists.email === updateUserDto.email) {
                throw new common_1.BadRequestException(`User with email ${emailExists.email} already exists.`);
            }
        }
        if (updateUserDto.username) {
            const userNameExists = await this.findByUsername(updateUserDto.username);
            if (userNameExists &&
                userNameExists.username === updateUserDto.username) {
                throw new common_1.BadRequestException(`User with username ${userNameExists.username} already exists.`);
            }
        }
        const updatedUser = await this.prismaService.user.update({
            where: { id: user.id },
            data: updateUserDto,
        });
        delete updatedUser.password;
        return updatedUser;
    }
    async remove(id) {
        return await this.prismaService.user.delete({
            where: { id },
        });
    }
    async recommendUser({ recommended_user_id, user_id }) {
        const user = await this.findOne(recommended_user_id);
        if (recommended_user_id === user_id) {
            throw new common_1.ForbiddenException('User cannot recommend itself');
        }
        const payload = {
            recommended_user_id: user.id,
            user_id: user_id,
        };
        const recommendEvent = await this.prismaService.$transaction([
            this.prismaService.event.create({
                data: {
                    name: 'recommend_user',
                    type: 'user',
                    payload,
                    date: new Date(),
                },
            }),
            this.prismaService.user.update({
                where: { id: user.id },
                data: {
                    recommendations: user.recommendations + 1,
                },
            }),
        ]);
        return recommendEvent;
    }
    async forgotPassword(email) {
        const user = await this.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const templateDir = (0, path_1.resolve)(__dirname, '..', 'mail', 'templates', 'forgot_password.hbs');
        const token = await this.userTokenService.create(user.id);
        await this.mailService.sendMail({
            subject: 'Esqueceu senha',
            templateData: {
                file: templateDir,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_URL}/reset-password/${token.token}`,
                },
            },
            to: {
                name: user.name,
                email,
            },
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        common_service_1.CommonService,
        mail_service_1.MailService,
        users_tokens_service_1.UsersTokensService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map