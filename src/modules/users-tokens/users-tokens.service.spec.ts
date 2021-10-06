import { Test, TestingModule } from '@nestjs/testing';
import { UsersTokensService } from './users-tokens.service';

describe('UsersTokensService', () => {
  let service: UsersTokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersTokensService],
    }).compile();

    service = module.get<UsersTokensService>(UsersTokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
