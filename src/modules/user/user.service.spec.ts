import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const mockJwtService = {
    signAsync: jest
      .fn()
      .mockImplementation((payload) =>
        Promise.resolve(JSON.stringify(payload)),
      ),
  };
  const hashedPassword =
    '$2a$10$LfVaZBCakFN.iLdgLJq9t.orKUXE9g4rBnJA2hBMj.B9qofGDsDA.';
  const baseEntity = {
    _id: Date.now().toString(),
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  };
  const testUser: User = {
    ...baseEntity,
    email: 'exaple001@gmail.com',
    password: hashedPassword,
    firstName: 'John',
    lastName: 'Doe',
    token: 'eyJhbGci',
  };
  const mockUserModel = (findOneSuccess: boolean) => ({
    create: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ ...user, ...baseEntity }),
      ),
    findOne: jest.fn().mockImplementation(() => {
      return findOneSuccess ? Promise.resolve(testUser) : undefined;
    }),
    findByIdAndUpdate: jest.fn().mockImplementation((id, update) => {
      return Promise.resolve({ ...testUser, ...update, _id: id });
    }),
  });

  const testSetup = async (findOneSuccess: boolean) => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: JwtService, useValue: mockJwtService },
        {
          provide: getModelToken('User'),
          useValue: mockUserModel(findOneSuccess),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  };

  it('should be defined', async () => {
    await testSetup(true);
    expect(service).toBeDefined();
  });

  it('should register user', async () => {
    await testSetup(false);
    expect(
      await service.register({
        email: 'exaple001@gmail.com',
        password: 'Qwerty123.',
        firstName: 'John',
        lastName: 'Doe',
      }),
    ).toEqual({
      ...testUser,
      _id: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      token: expect.any(String),
      password: expect.any(String),
    });
  });

  it('should login user', async () => {
    await testSetup(true);
    expect(
      await service.login({
        email: 'exaple001@gmail.com',
        password: 'Qwerty123.',
      }),
    ).toEqual({
      ...testUser,
      email: 'exaple001@gmail.com',
      _id: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      token: expect.any(String),
      password: expect.any(String),
    });
  });

  it('should update user', async () => {
    await testSetup(true);
    expect(
      await service.update(testUser, {
        firstName: 'Carl',
        lastName: 'Johnson',
      }),
    ).toEqual({
      ...testUser,
      firstName: 'Carl',
      lastName: 'Johnson',
    });
  });
});
