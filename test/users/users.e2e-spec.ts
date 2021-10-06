import {
  HttpServer,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../src/database/prisma/prisma.service';
import { UsersModule } from '../../src/modules/users/users.module';
import * as request from 'supertest';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

describe('[Feature] Users - /users', () => {
  const user: CreateUserDto = {
    email: 'example1@example.com',
    username: 'username1',
    password: '123456',
    name: 'User Name',
    phone_number: '99999999',
  };
  let app: INestApplication;
  let httpServer: HttpServer;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
    httpServer = app.getHttpServer();
  });

  it('Create [POST /]', async () => {
    return request(httpServer)
      .post('/users')
      .send(user)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        // const expectedUser = expect.objectContaining(user);
        expect(body).toHaveProperty('id');
      });
  });

  it.todo('Get all [GET /]');
  it.todo('Get one [GET /:id]');
  it.todo('Update one [PATCH /:id]');
  it.todo('Delete one [DELETE /:id]');

  afterAll(async () => {
    await app.close();
  });
});
