import { User } from 'src/entities';
import { UsersService } from './users.service';
export declare class UsersResolver {
    private usersService;
    constructor(usersService: UsersService);
    getMe(user: User): Promise<User>;
    users(): Promise<User[]>;
    user(username: string): Promise<User>;
}
