export declare class BcryptService {
    hashPassword(password: string): string;
    comparePassword(rawPassword: string, hashedPassword: string): boolean;
}
