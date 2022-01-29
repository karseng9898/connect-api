import { Field, ObjectType } from '@nestjs/graphql';
import {
  BeforeCreate,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/entities';
import { Message } from './message.entity';

@Table({ tableName: 'friends' })
@ObjectType()
export class Friend extends Model {
  @Field()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Field()
  @ForeignKey(() => User)
  @Column
  senderId: number;

  @Field()
  @ForeignKey(() => User)
  @Column
  receiverId: number;

  @Field()
  @Column
  status: boolean;

  @Field()
  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Field({ nullable: true })
  @ForeignKey(() => Message)
  @Column
  lastMessage?: number;

  @BeforeCreate
  static async beforeCreateFriend(instance: Friend) {
    instance.status = false;
  }
}
