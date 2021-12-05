import { Strategy } from 'passport-local';
import { User } from 'src/entities';
import { UserAuthService } from '../user-auth/user-auth.service';
declare const UserAuthStrategy_base: new (...args: any[]) => Strategy;
export declare class UserAuthStrategy extends UserAuthStrategy_base {
    private readonly userAuthService;
    constructor(userAuthService: UserAuthService);
    validate(username: string, password: string): Promise<User>;
}
export {};
