import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Friend, Message } from 'src/entities';
import { SocketService } from '../events/events.service';
import { FriendsService } from '../friends/friends.service';
import { UsersService } from '../users/users.service';
import { ChatResponse } from './dto/chats-response';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message) private messageModel: typeof Message,
    @InjectModel(Friend) private friendModel: typeof Friend,
    private readonly friendService: FriendsService,
    private readonly usersService: UsersService,
    private readonly socketService: SocketService,
  ) {}

  async create(
    senderId: number,
    receiverId: number,
    friendId: number,
    content: string,
  ): Promise<Message> {
    const message = await this.messageModel.create({
      senderId,
      receiverId,
      content,
    });
    const room = `user-${friendId}-messages`;
    this.socketService.socket.emit(room, message);
    this.socketService.socket.emit('event:messageSent');
    await this.friendService.updateLastMessage(
      senderId,
      receiverId,
      message.id,
    );
    return message;
  }

  async findAllChat(userId: number): Promise<ChatResponse[]> {
    try {
      const friends = await this.friendModel.findAll({
        where: {
          [Op.and]: [
            { status: true },
            { lastMessage: { [Op.not]: null } },
            { [Op.or]: [{ receiverId: userId }, { senderId: userId }] },
          ],
        },
      });

      const users = friends.map(async (friend) => {
        const senderId = friend.senderId;
        const receiverId = friend.receiverId;
        const message = await this.messageModel.findOne({
          where: { id: friend.lastMessage },
        });

        if (senderId === userId) {
          const user = await this.usersService.findOne(receiverId);
          return {
            friendId: friend.id,
            receiverId,
            username: user.name,
            avatar: user.avatar,
            lastMessage: message.content,
            createdAt: message.createdAt,
          };
        }
        const user = await this.usersService.findOne(senderId);
        return {
          friendId: friend.id,
          receiverId: senderId,
          username: user.name,
          avatar: user.avatar,
          lastMessage: message.content,
          createdAt: message.createdAt,
        };
      });

      return await Promise.all(users);
    } catch (e) {
      Promise.reject(e);
    }
  }

  async findAll(senderId: number, receiverId: number): Promise<Message[]> {
    try {
      const messages = await this.messageModel.findAll({
        where: {
          [Op.or]: [
            { [Op.and]: [{ senderId }, { receiverId }] },
            { [Op.and]: [{ senderId: receiverId }, { receiverId: senderId }] },
          ],
        },
      });

      return messages;
    } catch (e) {
      Promise.reject(e);
    }
  }
}
