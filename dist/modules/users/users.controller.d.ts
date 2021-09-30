/// <reference types="multer" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
interface RequestType extends Request {
    user: {
        userId: string;
    };
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import(".prisma/client").User>;
    uploadAvatar(id: string, avatar: Express.Multer.File): Promise<import(".prisma/client").User>;
    findAll(): import(".prisma/client").PrismaPromise<{
        id: string;
        email: string;
        username: string;
        avatar: string;
        phone_number: string;
        recommendations: number;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        username: string;
        avatar: string;
        phone_number: string;
        recommendations: number;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import(".prisma/client").User>;
    remove(req: RequestType): Promise<import(".prisma/client").User>;
    recommendUser(id: string, req: RequestType): Promise<[import(".prisma/client").Event, import(".prisma/client").User]>;
    forgotPassword(body: {
        email: string;
    }): Promise<void>;
}
export {};
