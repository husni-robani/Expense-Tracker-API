import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { SigninDto, SignupDto } from 'src/auth/dto/auth.dto';
import * as pactum from 'pactum';
import { ResponseExpenseDto } from '../src/expense/dto/expense.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();

    pactum.request.setBaseUrl('http://localhost:3000');
  });

  afterAll(() => {
    app.close();
  });

  // Auth Testing
  describe('Auth', () => {
    const signUpDto: SignupDto = {
      email: 'test111@gmail.com',
      username: 'test111',
      password: '123',
    };

    const signInDto: SigninDto = {
      email: 'test111@gmail.com',
      password: '123',
    };

    // Signup
    describe('Signup', () => {
      // expected error
      it('should throw if one of properties is empty', () => {
        return pactum
          .spec()
          .post('/api/auth/signup')
          .withBody({
            email: signUpDto.email,
            password: signUpDto.password,
          })
          .expectStatus(400);
      });

      // expected error
      it('should throw if no body provided', () => {
        return pactum.spec().post('/api/auth/signup').expectStatus(400);
      });

      // expected success
      it('should signup', () => {
        return pactum
          .spec()
          .post('/api/auth/signup')
          .withBody(signUpDto)
          .expectStatus(201);
      });
    });

    // Signin
    describe('Signin', () => {
      it('should throw if one of properties is empty', () => {
        return pactum
          .spec()
          .post('/api/auth/signin')
          .withBody({
            password: signInDto.password,
          })
          .expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum.spec().post('/api/auth/signin').expectStatus(400);
      });

      it('should signin', () => {
        return pactum
          .spec()
          .post('/api/auth/signin')
          .withBody(signInDto)
          .expectStatus(200)
          .stores('user_token', 'access_token');
      });
    });
  });

  // // User
  describe('Get Authenticated User Data', () => {
    it('Should throw if access token not provided', () => {
      return pactum.spec().get('/api/users/me').expectStatus(401);
    });

    it('should get current user', () => {
      return pactum
        .spec()
        .get('/api/users/me')
        .withHeaders({
          Authorization: 'Bearer $S{user_token}',
        })
        .expectStatus(200);
    });
  });

  // Expense
  describe('Expense', () => {
    const newExpense = {
      amount: 30000,
      name: 'Beli Kopi',
      description: 'Membeli kopi di kampus',
    };

    const updateExpense = {
      amount: 10000,
    };

    describe('Create Expense', () => {
      it('should trow if access token is not provided', () => {
        return pactum
          .spec()
          .post('/api/expenses')
          .withBody(newExpense)
          .expectStatus(401);
      });

      it('should create expense', () => {
        return pactum
          .spec()
          .post('/api/expenses')
          .withBody(newExpense)
          .withHeaders({
            Authorization: 'Bearer $S{user_token}',
          })
          .stores('expense_id', 'id')
          .expectStatus(201);
      });
    });

    describe('Get Expense By Id', () => {
      it('should trow if access token is not provided', () => {
        return pactum
          .spec()
          .get('/api/expenses/$S{expense_id}')
          .expectStatus(401);
      });

      it('should get expense', () => {
        return pactum
          .spec()
          .get('/api/expenses/$S{expense_id}')
          .withHeaders({
            Authorization: 'Bearer $S{user_token}',
          })
          .expectStatus(200);
      });
    });

    describe('Update Expense By Id', () => {
      it('should trow if access token is not provided', () => {
        return pactum
          .spec()
          .patch('/api/expenses/$S{expense_id}')
          .withBody(updateExpense)
          .expectStatus(401);
      });

      it('should update expense', () => {
        return pactum
          .spec()
          .patch('/api/expenses/$S{expense_id}')
          .withBody(updateExpense)
          .withHeaders({
            Authorization: 'Bearer $S{user_token}',
          })
          .expectStatus(200);
      });
    });

    describe('Delete Expense By Id', () => {
      it('should trow if access token is not provided', () => {
        return pactum
          .spec()
          .delete('/api/expenses/$S{expense_id}')
          .expectStatus(401);
      });

      it('should delete expense', () => {
        return pactum
          .spec()
          .delete('/api/expenses/$S{expense_id}')
          .withHeaders({
            Authorization: 'Bearer $S{access_token}',
          })
          .expectStatus(401);
      });
    });
  });

  // Delete User
  describe('Delete Authenticated User', () => {
    it('Should throw if access token not provided', () => {
      return pactum.spec().delete('/api/users/me').expectStatus(401);
    });

    it('Should Delete User', () => {
      return pactum
        .spec()
        .delete('/api/users/me')
        .withHeaders({
          Authorization: 'Bearer $S{user_token}',
        })
        .expectStatus(200);
    });
  });
});
