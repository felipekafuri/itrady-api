import { IsDateString, IsString } from 'class-validator';
import { UserToken } from '../entities/UserToken';

export class CreateUserTokenDto extends UserToken {
  @IsString()
  userId: string;

  @IsDateString()
  expires: string | Date;

  @IsDateString()
  created_at: string | Date;
}
