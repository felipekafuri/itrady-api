import { IsEmail, isString, IsString, MinLength } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  username: string;

  avatar: string;

  @IsString()
  phone_number: string;
}
