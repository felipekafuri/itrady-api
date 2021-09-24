/// <reference types="multer" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto, avatar: Express.Multer.File): Promise<import(".prisma/client").User>;
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
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): Promise<import(".prisma/client").User>;
}
