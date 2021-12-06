import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/bcrypt.service';
import { JWT_TOKEN } from 'src/constants';
import { User } from 'src/entities';
import { UsersService } from 'src/modules/users/users.service';
import { LoginResponse } from '../dto/login-response.dto';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  async validate(username: string, password: string): Promise<User> {
    let user: User;
    if (username.includes('@')) {
      user = await this.usersService.findByEmail(username);
    } else {
      user = await this.usersService.findbyUsername(username);
    }

    if (!user) {
      return null;
    }

    const isPasswordValid = this.bcryptService.comparePassword(
      password,
      user.password,
    );

    return isPasswordValid ? user : null;
  }

  async login(user: User): Promise<LoginResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const payload = { username: user.username, sub: user.id };

        const refresh_token = this.jwtService.sign(payload, {
          secret: JWT_TOKEN.secret,
          expiresIn: '1w',
        });
        const access_token = this.jwtService.sign(payload);
        await this.usersService.updateRefreshToken(user.id, refresh_token);
        console.log('test', this.jwtService.verify(access_token));

        resolve({ access_token, refresh_token });
      } catch (e) {
        reject(e);
      }
    });
  }
}
