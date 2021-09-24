import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CommonService } from 'src/common/common.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly commonService;
    constructor(usersService: UsersService, jwtService: JwtService, commonService: CommonService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
