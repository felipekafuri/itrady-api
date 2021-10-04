import { CommonService } from '../../common/common.service';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailService } from '../mail/mail.service';
import { UsersTokensService } from '../users-tokens/users-tokens.service';
interface UserRecommendation {
    recommended_user_id: string;
    user_id: string;
}
export declare class UsersService {
    private readonly prismaService;
    private readonly commonService;
    private readonly mailService;
    private readonly userTokenService;
    constructor(prismaService: PrismaService, commonService: CommonService, mailService: MailService, userTokenService: UsersTokensService);
    create(createUserDto: CreateUserDto): Promise<import(".prisma/client").User>;
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
    findByEmail(email: string): Promise<import(".prisma/client").User>;
    findByUsername(username: string): Promise<import(".prisma/client").User>;
    updateAvatar(id: string, avatar: string): Promise<import(".prisma/client").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import(".prisma/client").User>;
    remove(id: string): Promise<import(".prisma/client").User>;
    recommendUser({ recommended_user_id, user_id }: UserRecommendation): Promise<[import(".prisma/client").Event, import(".prisma/client").User]>;
    forgotPassword(email: string): Promise<void>;
}
export {};
