import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id?: string;
  email: string;
  name: string;
  username: string;
  password: string;
  avatar?: string;
  phone_number: string;
  recommendations?: number;
  UserToken?: Prisma.UserTokenUncheckedCreateNestedManyWithoutUserInput;
}
