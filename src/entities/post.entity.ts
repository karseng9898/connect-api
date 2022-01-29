import { Field, ObjectType } from '@nestjs/graphql';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/entities';

@Table({ tableName: 'posts' })
@ObjectType()
export class Post extends Model {
  @Field()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Field()
  @ForeignKey(() => User)
  @Column
  author: number;

  @Field()
  @Column
  content: string;

  @Field()
  @Column
  createdAt: Date;

  @Field()
  @Column
  reported: boolean;

  @Column
  updatedAt: Date;
}
