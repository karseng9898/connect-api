import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Friend, Message } from 'src/entities';
import { FriendsModule } from '../friends/friends.module';
import { UsersModule } from '../users/users.module';
import { MessageResolver } from './messages.resolver';
import { MessageService } from './messages.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Message, Friend]),
    FriendsModule,
    UsersModule,
  ],
  providers: [MessageResolver, MessageService],
})
export class MessageModule {}
