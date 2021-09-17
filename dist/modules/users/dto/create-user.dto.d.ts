import { User } from '../entities/user.entity';
export declare class CreateUserDto extends User {
    email: string;
    name: string;
    password: string;
    username: string;
    avatar: string;
    phone_number: string;
}
