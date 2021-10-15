import { User, UserToken } from '@prisma/client';

export const user: User = {
  id: '2875907e-32ec-4662-8184-2e20ff5aa3ed',
  email: 'example@example.com',
  username: 'username',
  password: '12345',
  avatar: 'user.png',
  name: 'User Name',
  phone_number: '99999999',
  recommendations: 0,
  created_at: new Date(),
};

export const userToken: UserToken = {
  created_at: new Date(),
  expires: new Date(new Date().getHours() + 2),
  id: 'ef395c0f-21b0-478d-85da-da5f17dcf999',
  token: '636a58b3-d706-4164-b5ef-ba86559b7524',
  userId: '2875907e-32ec-4662-8184-2e20ff5aa3ed',
};

const mockCRUD = (entity: any) => ({
  create: jest.fn().mockResolvedValue(entity),
  findMany: jest.fn().mockResolvedValue([entity]),
  findUnique: jest.fn().mockResolvedValue(entity),
  update: jest.fn().mockResolvedValue(entity),
  delete: jest.fn().mockResolvedValue(entity),
});

const mockPrismaService = {
  user: mockCRUD(user),
  userToken: mockCRUD(userToken),
};

export default mockPrismaService;
