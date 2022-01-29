import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Friend } from 'src/entities';
import { UsersModule } from '../users/users.module';
import { FriendsResolver } from './friends.resolver';
import { FriendsService } from './friends.service';

@Module({
  imports: [SequelizeModule.forFeature([Friend]), UsersModule],
  providers: [FriendsResolver, FriendsService],
  exports: [FriendsService],
})
export class FriendsModule {}
