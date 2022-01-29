import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Friend, Post, User } from 'src/entities';
import { FriendsModule } from '../friends/friends.module';
import { PostResolver } from './posts.resolver';
import { PostService } from './posts.service';

@Module({
  imports: [SequelizeModule.forFeature([Post, Friend, User]), FriendsModule],
  providers: [PostResolver, PostService],
})
export class PostModule {}
