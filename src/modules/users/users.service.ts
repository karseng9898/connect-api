import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as fs from 'fs';
import { FileUpload } from 'graphql-upload';
import { col, fn, where } from 'sequelize/dist';
import { BcryptService } from 'src/bcrypt.service';
import { User } from 'src/entities';
import { finished } from 'stream/promises';
import { v4 as uuid } from 'uuid';
import { CreateUserInput } from '../auth/dto/create-user-input.dto';
import { AvatarUploadResponse } from './dto/avatar-upload-response.dto';

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

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        email: where(fn('lower', col('email')), email.toLowerCase()),
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

  updateMe(
    user: User,
    name: string,
    thumbnail: FileUpload | null,
  ): Promise<AvatarUploadResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let url = '';
        if (thumbnail) {
          const { filename, createReadStream } = thumbnail;
          const randomId = uuid();
          const stream = createReadStream();
          const pathName = `./public/images/avatar/${randomId}-${filename}`;

          console.log(pathName);
          const out = fs.createWriteStream(pathName);

          stream.pipe(out);
          await finished(out);

          url = `http://localhost:3000/images/avatar/${randomId}-${filename}`;
          await this.userModel.update(
            { avatar: url, name },
            { where: { id: user.id } },
          );
        } else {
          await this.userModel.update({ name }, { where: { id: user.id } });
        }

        resolve({ url });
      } catch (err) {
        reject(err);
      }
    });
  }
}
