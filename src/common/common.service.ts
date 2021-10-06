import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { v4 } from 'uuid';
import { differenceInHours } from 'date-fns';

@Injectable()
export class CommonService {
  async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }

  async isTokenExpired(expirationDate: Date): Promise<boolean> {
    return differenceInHours(expirationDate, new Date()) > 2 ? true : false;
  }
}
