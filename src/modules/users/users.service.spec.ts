import { Test, TestingModule } from '@nestjs/testing';
import mockPrismaService from '../../utils/__mocks__/prisma.service';
import { CommonService } from '../../common/common.service';
import { PrismaService } from '../../database/prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { UsersTokensService } from '../users-tokens/users-tokens.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: CommonService,
          useValue: {
            comparePassword: jest.fn(),
            hashPassword: jest.fn(),
          },
        },
        { provide: MailService, useValue: {} },
        { provide: UsersTokensService, useValue: {} },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create users', async () => {
    const user = await service.create({
      email: 'pathaj@gis.de',
      password: '123456',
      name: 'Pathaj',
      phone_number: '+491767890123',
      username: 'pathaj',
      avatar: 'user.png',
    });

    console.log(user);
    expect(user).toHaveProperty('id');
  });
});
