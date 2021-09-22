import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createUserDto: CreateUserDto): Promise<import(".prisma/client").User>;
    findAll(): import(".prisma/client").PrismaPromise<{
        id: string;
        email: string;
        username: string;
        avatar: string;
        phone_number: string;
        recommendations: number;
    }[]>;
    findOne(id: string): Promise<string>;
    findByEmail(email: string): Promise<import(".prisma/client").User>;
    findByUsername(username: string): Promise<import(".prisma/client").User>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
