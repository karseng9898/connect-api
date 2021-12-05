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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_service_1 = require("../../../bcrypt.service");
const constants_1 = require("../../../constants");
const entities_1 = require("../../../entities");
const users_service_1 = require("../../users/users.service");
let UserAuthService = class UserAuthService {
    constructor(usersService, jwtService, bcryptService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.bcryptService = bcryptService;
    }
    async validate(username, password) {
        let user;
        if (username.includes('@')) {
            user = await this.usersService.findByEmail(username);
        }
        else {
            user = await this.usersService.findbyUsername(username);
        }
        if (!user) {
            return null;
        }
        const isPasswordValid = this.bcryptService.comparePassword(password, user.password);
        return isPasswordValid ? user : null;
    }
    async login(user) {
        return new Promise(async (resolve, reject) => {
            try {
                const payload = { username: user.username, sub: user.id };
                const refresh_token = this.jwtService.sign(payload, {
                    secret: constants_1.JWT_TOKEN.secret,
                    expiresIn: '1w',
                });
                const access_token = this.jwtService.sign(payload);
                await this.usersService.updateRefreshToken(user.id, refresh_token);
                resolve({ access_token, refresh_token });
            }
            catch (e) {
                reject(e);
            }
        });
    }
};
UserAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        bcrypt_service_1.BcryptService])
], UserAuthService);
exports.UserAuthService = UserAuthService;
//# sourceMappingURL=user-auth.service.js.map