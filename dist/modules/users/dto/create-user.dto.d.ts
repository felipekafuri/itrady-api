import { User } from '../entities/user.entity';
export declare class CreateUserDto extends User {
    email: string;
    name: string;
    password: string;
    username: string;
    phone_number: string;
}
