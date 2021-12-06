import { BcryptService } from 'src/bcrypt.service';
import { User } from 'src/entities';
import { CreateUserInput } from '../auth/dto/create-user-input.dto';
export declare class UsersService {
    private userModel;
    private readonly bcryptService;
    constructor(userModel: typeof User, bcryptService: BcryptService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findbyUsername(username: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    updateRefreshToken(id: string, refreshToken: string): Promise<void>;
    register(createUserInput: CreateUserInput): Promise<User>;
}
