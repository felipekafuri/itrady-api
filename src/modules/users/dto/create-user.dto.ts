import { IsEmail, isString, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @IsString()
  avatar: string;

  @IsString()
  phone_number: string;
}
