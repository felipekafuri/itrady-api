import { UserToken } from '../entities/UserToken';
export declare class CreateUserTokenDto extends UserToken {
    userId: string;
    expires: string | Date;
    created_at: string | Date;
}
