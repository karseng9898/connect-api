import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BCRYPT_CONSTANT } from 'src/constants';

@Injectable()
export class BcryptService {
  hashPassword(password: string): string {
    return bcrypt.hashSync(password, BCRYPT_CONSTANT.SALT_ROUND);
  }

  comparePassword(rawPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(rawPassword, hashedPassword);
  }
}
