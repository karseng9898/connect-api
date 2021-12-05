import { Model } from 'sequelize-typescript';
export declare class User extends Model {
    id: string;
    username: string;
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    refreshToken?: string;
}
