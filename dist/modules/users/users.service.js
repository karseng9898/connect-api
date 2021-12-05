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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const dist_1 = require("sequelize/dist");
const bcrypt_service_1 = require("../../bcrypt.service");
const constants_1 = require("../../constants");
const entities_1 = require("../../entities");
const uuid_1 = require("uuid");
let UsersService = class UsersService {
    constructor(userModel, bcryptService) {
        this.userModel = userModel;
        this.bcryptService = bcryptService;
    }
    async findAll() {
        return this.userModel.findAll();
    }
    async findOne(id) {
        return this.userModel.findOne({ where: { id } });
    }
    async findbyUsername(username) {
        return this.userModel.findOne({
            where: {
                username: (0, dist_1.where)((0, dist_1.fn)('lower', (0, dist_1.col)('username')), username.toLowerCase()),
            },
        });
    }
    async updateRefreshToken(id, refreshToken) {
        this.userModel.update({ refreshToken }, { where: { id } });
    }
    async register(createUserInput) {
        try {
            const hashedPassword = this.bcryptService.hashPassword(createUserInput.password);
            const user = await this.userModel.create(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, createUserInput), { password: hashedPassword }));
            return user;
        }
        catch (e) {
            console.log(e);
            if (e.parent.errno === 1062) {
                throw new Error(e.errors[0].message);
            }
            throw new Error(e);
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(entities_1.User)),
    __metadata("design:paramtypes", [Object, bcrypt_service_1.BcryptService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map