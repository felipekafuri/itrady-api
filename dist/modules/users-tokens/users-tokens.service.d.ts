import { PrismaService } from '../../database/prisma/prisma.service';
export declare class UsersTokensService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(userId: string): Promise<import(".prisma/client").UserToken>;
}
