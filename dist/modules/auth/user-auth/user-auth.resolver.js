"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const entities_1 = require("../../../entities");
const users_service_1 = require("../../users/users.service");
const create_user_input_dto_1 = require("../dto/create-user-input.dto");
const login_response_dto_1 = require("../dto/login-response.dto");
const login_user_input_dto_1 = require("../dto/login-user-input.dto");
const user_auth_guard_1 = require("../guards/user-auth.guard");
const user_auth_service_1 = require("./user-auth.service");
let UserAuthResolver = class UserAuthResolver {
    constructor(userAuthService, usersService) {
        this.userAuthService = userAuthService;
        this.usersService = usersService;
    }
    login(_, context) {
        return this.userAuthService.login(context.user);
    }
    register(createUserInput) {
        return this.usersService.register(createUserInput);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => login_response_dto_1.LoginResponse),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    __param(0, (0, graphql_1.Args)('loginUserInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_input_dto_1.LoginUserInput, Object]),
    __metadata("design:returntype", void 0)
], UserAuthResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Mutation)(() => entities_1.User),
    __param(0, (0, graphql_1.Args)('createUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_dto_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UserAuthResolver.prototype, "register", null);
UserAuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [user_auth_service_1.UserAuthService,
        users_service_1.UsersService])
], UserAuthResolver);
exports.UserAuthResolver = UserAuthResolver;
//# sourceMappingURL=user-auth.resolver.js.map