import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Friend, User } from 'src/entities';
import { UsersService } from '../users/users.service';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(Friend) private friendModel: typeof Friend,
    private readonly usersService: UsersService,
  ) {}

  create(userId: number, receiverId: number): Promise<Friend> {
    const friend = this.friendModel.create({ senderId: userId, receiverId });
    return friend;
  }

  async checkStatus(userId: number, friendId: number): Promise<Friend> {
    const friend = await this.friendModel.findOne({
      where: {
        [Op.or]: [
          { [Op.and]: [{ senderId: userId }, { receiverId: friendId }] },
          { [Op.and]: [{ senderId: friendId }, { receiverId: userId }] },
        ],
      },
    });
    return friend;
  }

  async findAll(userId: number): Promise<User[]> {
    try {
      const friends = await this.friendModel.findAll({
        where: {
          [Op.and]: [
            { status: true },
            { [Op.or]: [{ receiverId: userId }, { senderId: userId }] },
          ],
        },
      });

      const users = friends.map((friend) => {
        const senderId = friend.senderId;
        const receiverId = friend.receiverId;

        if (senderId === userId) {
          const user = this.usersService.findOne(receiverId);
          return user;
        }
        const user = this.usersService.findOne(senderId);
        return user;
      });

      return Promise.all(users);
    } catch (e) {
      Promise.reject(e);
    }
  }

  async findAllRequest(userId: number): Promise<Friend[]> {
    try {
      const friends = await this.friendModel.findAll({
        where: {
          [Op.and]: [{ status: false }, { receiverId: userId }],
        },
      });

      return friends;
    } catch (e) {
      Promise.reject(e);
    }
  }

  async findOne(id: number): Promise<Friend> {
    const friend = await this.friendModel.findOne({
      where: { id },
    });
    return friend;
  }

  async update(userId: number, friendId: number): Promise<boolean> {
    try {
      await this.friendModel.update(
        { status: true },
        {
          where: {
            [Op.and]: [{ senderId: friendId }, { receiverId: userId }],
          },
        },
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  async remove(userId: number, friendId: number): Promise<boolean> {
    try {
      const friend = await this.friendModel.findOne({
        where: {
          [Op.or]: [
            {
              [Op.and]: [{ senderId: userId }, { receiverId: friendId }],
            },
            {
              [Op.and]: [{ senderId: friendId }, { receiverId: userId }],
            },
          ],
        },
      });
      friend.destroy();
      return true;
    } catch (e) {
      return false;
    }
  }
}
