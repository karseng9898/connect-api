import { User } from 'src/entities';
import { UsersService } from 'src/modules/users/users.service';
import { CreateUserInput } from '../dto/create-user-input.dto';
import { LoginResponse } from '../dto/login-response.dto';
import { LoginUserInput } from '../dto/login-user-input.dto';
import { UserAuthService } from './user-auth.service';
export declare class UserAuthResolver {
    private userAuthService;
    private readonly usersService;
    constructor(userAuthService: UserAuthService, usersService: UsersService);
    login(_: LoginUserInput, context: any): Promise<LoginResponse>;
    register(createUserInput: CreateUserInput): Promise<User>;
}
