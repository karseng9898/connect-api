import { Field, ObjectType } from '@nestjs/graphql';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/entities';

@Table({ tableName: 'messages' })
@ObjectType()
export class Message extends Model {
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
  content: string;

  @Field()
  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
