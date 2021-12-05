import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/bcrypt.service';
import { User } from 'src/entities';
import { UsersService } from 'src/modules/users/users.service';
import { LoginResponse } from '../dto/login-response.dto';
export declare class UserAuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly bcryptService;
    constructor(usersService: UsersService, jwtService: JwtService, bcryptService: BcryptService);
    validate(username: string, password: string): Promise<User>;
    login(user: User): Promise<LoginResponse>;
}
