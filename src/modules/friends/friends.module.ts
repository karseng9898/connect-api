import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsResolver } from './friends.resolver';
import { Friend } from 'src/entities';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Friend]), UsersModule],
  providers: [FriendsResolver, FriendsService],
})
export class FriendsModule {}
