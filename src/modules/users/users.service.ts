import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { col, fn, where } from 'sequelize/dist';
import { BcryptService } from 'src/bcrypt.service';
import { BCRYPT_CONSTANT } from 'src/constants';
import { User } from 'src/entities';
import { v4 as uuid } from 'uuid';
import { CreateUserInput } from '../auth/dto/create-user-input.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly bcryptService: BcryptService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }

  async findbyUsername(username: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        username: where(fn('lower', col('username')), username.toLowerCase()),
      },
    });
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
    this.userModel.update({ refreshToken }, { where: { id } });
  }

  async register(createUserInput: CreateUserInput): Promise<User> {
    try {
      const hashedPassword = this.bcryptService.hashPassword(
        createUserInput.password,
      );

      const user = await this.userModel.create({
        id: uuid(),
        ...createUserInput,
        password: hashedPassword,
      });
      return user;
    } catch (e) {
      console.log(e);
      if (e.parent.errno === 1062) {
        throw new Error(e.errors[0].message);
      }
      throw new Error(e);
    }
  }
}
