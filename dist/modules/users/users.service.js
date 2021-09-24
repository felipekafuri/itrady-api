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
const fs_1 = require("fs");
const path_1 = require("path");
const common_service_1 = require("../../common/common.service");
const prisma_service_1 = require("../../database/prisma/prisma.service");
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor(prismaService, commonService) {
        this.prismaService = prismaService;
        this.commonService = commonService;
    }
    async create(createUserDto) {
        const userExists = await this.findByEmail(createUserDto.email);
        if (userExists && userExists.email === createUserDto.email) {
            throw new common_1.BadRequestException(`User with email ${userExists.email} already exists.`);
        }
        if (userExists && userExists.username === createUserDto.username) {
            throw new common_1.BadRequestException(`User with email ${userExists.username} already exists.`);
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
                console.log(filePath);
                await fs_1.default.promises.stat(filePath);
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
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        common_service_1.CommonService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map