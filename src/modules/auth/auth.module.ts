import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_TOKEN } from 'src/constants';
import { UsersModule } from '../users/users.module';
import { JWTStrategy } from './strategy/jwt.strategy';
import { UserAuthStrategy } from './strategy/user-auth.strategy';
import { UserAuthResolver } from './user-auth/user-auth.resolver';
import { UserAuthService } from './user-auth/user-auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: JWT_TOKEN.secret,
      signOptions: { expiresIn: '3d' },
    }),
    PassportModule,
  ],
  providers: [UserAuthService, UserAuthStrategy, JWTStrategy, UserAuthResolver],
})
export class AuthModule {}
