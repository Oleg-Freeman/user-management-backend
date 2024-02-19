import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { configService } from '../src/configs';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    jest.setTimeout(10000);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe(configService.getValidationOptions()),
    );
    await app.init();
  });

  it('register -> login -> logout', () => {
    return request(app.getHttpServer())
      .post('/users/register')
      .send({
        email: 'example@gmail.com',
        password: 'Qwerty123.',
        firstName: 'John',
        lastName: 'Doe',
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          _id: expect.any(String),
          email: 'example@gmail.com',
          firstName: 'John',
          lastName: 'Doe',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          token: expect.any(String),
        });
      })
      .then(() =>
        request(app.getHttpServer())
          .post('/users/login')
          .send({
            email: 'example@gmail.com',
            password: 'Qwerty123.',
          })
          .expect(200)
          .then((response) => {
            expect(response.body).toEqual({
              _id: expect.any(String),
              email: 'example@gmail.com',
              firstName: 'John',
              lastName: 'Doe',
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
              token: expect.any(String),
            });

            return request(app.getHttpServer())
              .get('/users/logout')
              .set('Authorization', `Bearer ${response.body.token}`)
              .expect(204);
          }),
      );
  });
});
