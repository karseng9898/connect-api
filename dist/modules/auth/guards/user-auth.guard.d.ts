import { ExecutionContext } from '@nestjs/common';
declare const UserAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class UserAuthGuard extends UserAuthGuard_base {
    constructor();
    getRequest(context: ExecutionContext): any;
}
export {};
