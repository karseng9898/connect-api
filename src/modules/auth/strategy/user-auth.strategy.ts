import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/entities';
import { UserAuthService } from '../user-auth/user-auth.service';

@Injectable()
export class UserAuthStrategy extends PassportStrategy(Strategy, 'user') {
  constructor(private readonly userAuthService: UserAuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.userAuthService.validate(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
