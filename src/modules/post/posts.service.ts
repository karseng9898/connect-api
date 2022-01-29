import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post, User } from 'src/entities';
import { FriendsService } from '../friends/friends.service';
import { PostResponse } from './dto/post-response';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post) private postModel: typeof Post,
    @InjectModel(User) private userModel: typeof User,
    private readonly friendService: FriendsService,
  ) {}

  async create(authorId: number, content: string): Promise<Post> {
    const post = await this.postModel.create({
      author: authorId,
      content,
    });

    return post;
  }

  async reportPost(postId: number): Promise<void> {
    await this.postModel.update({ reported: true }, { where: { id: postId } });
  }

  async deletePost(postId: number): Promise<void> {
    await this.postModel.destroy({ where: { id: postId } });
  }

  async findAll(): Promise<Post[]> {
    try {
      const posts = await this.postModel.findAll({});
      return posts;
    } catch (e) {
      Promise.reject(e);
    }
  }

  async findAllReportedPost(): Promise<Post[]> {
    try {
      const posts = await this.postModel.findAll({ where: { reported: true } });
      return posts;
    } catch (e) {
      Promise.reject(e);
    }
  }

  async findAllPosts(user: User): Promise<PostResponse[]> {
    try {
      const postsArray: PostResponse[] = [];
      const friends = await this.friendService.findAll(user.id);

      friends.map(async (friend) => {
        const post = await this.postModel.findAll({
          where: { author: friend.user.id },
        });

        post.map(function (item) {
          postsArray.push({
            authorId: friend.user.id,
            id: item.id,
            username: friend.user.name,
            avatar: friend.user.avatar,
            content: item.content,
            createdAt: item.createdAt,
          });
        });
      });

      const ownPosts = await this.postModel.findAll({
        where: { author: user.id },
      });

      const me = await this.userModel.findOne({ where: { id: user.id } });
      ownPosts.map((ownPost) => {
        postsArray.push({
          authorId: user.id,
          id: ownPost.id,
          username: user.name,
          avatar: me.avatar,
          content: ownPost.content,
          createdAt: ownPost.createdAt,
        });
      });

      return postsArray;
    } catch (e) {
      Promise.reject(e);
    }
  }
}
