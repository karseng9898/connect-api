import { Test, TestingModule } from '@nestjs/testing';
import { FriendsResolver } from './friends.resolver';
import { FriendsService } from './friends.service';

describe('FriendsResolver', () => {
  let resolver: FriendsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendsResolver, FriendsService],
    }).compile();

    resolver = module.get<FriendsResolver>(FriendsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
