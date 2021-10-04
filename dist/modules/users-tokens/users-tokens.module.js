"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersTokensModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma/prisma.service");
const users_tokens_service_1 = require("./users-tokens.service");
let UsersTokensModule = class UsersTokensModule {
};
UsersTokensModule = __decorate([
    (0, common_1.Module)({
        providers: [users_tokens_service_1.UsersTokensService, prisma_service_1.PrismaService],
        exports: [users_tokens_service_1.UsersTokensService],
    })
], UsersTokensModule);
exports.UsersTokensModule = UsersTokensModule;
//# sourceMappingURL=users-tokens.module.js.map