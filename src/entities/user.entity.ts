import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Friend, Message } from '.';

@Table({ tableName: 'users' })
@ObjectType()
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  @Field()
  id: number;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column
  @Field()
  name: string;

  @Column
  password: string;

  @Column
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Column
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Column({ allowNull: true })
  refreshToken?: string;

  @Column({ allowNull: true })
  @Field(() => String, { nullable: true })
  avatar?: string;

  @HasMany(() => Friend)
  friends: Friend[];

  @HasMany(() => Message)
  messages: Message[];
}
