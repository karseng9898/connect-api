import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_TOKEN } from 'src/constants';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_TOKEN.secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      username: payload.username,
      name: payload.name,
      avatar: payload.avatar,
    };
  }
}
