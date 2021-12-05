import { Test, TestingModule } from '@nestjs/testing';
import { UserAuthResolver } from './user-auth.resolver';

describe('UserAuthResolver', () => {
  let resolver: UserAuthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAuthResolver],
    }).compile();

    resolver = module.get<UserAuthResolver>(UserAuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
