import { Strategy } from 'passport-jwt';
declare const JWTStrategy_base: new (...args: any[]) => Strategy;
export declare class JWTStrategy extends JWTStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        id: any;
        username: any;
    }>;
}
export {};
