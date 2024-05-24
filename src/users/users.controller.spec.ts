import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { TestUtils } from 'src/lib/test-utils';
import { User, UserSchema } from './schemas/user.schema';
import { stubValidUserSignUp } from './stubs/users.stub';
import { UsersService } from './users.service';
import _ from 'lodash';
import { UserLoginDto } from './dto/user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let module: TestingModule;
  const validUser = stubValidUserSignUp();
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TestUtils.getTestConfigModule(),
        TestUtils.getTestMongooseModule('users-controller'),
        TestUtils.getTestJwtModule(),
        TestUtils.getTestMongooseSchemas([
          { name: User.name, schema: UserSchema },
        ]),
      ],
      providers: [UsersService],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    await module.close();
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('When testing signUp validation', () => {
    it('Should create user', async () => {
      const response = await controller.signUp(validUser);
      expect(_.omit(response.user, ['__v', '_id'])).toMatchObject(
        _.omit(stubValidUserSignUp(), ['password']),
      );
    });
    it('Should throw validation errors', async () => {
      await expect(controller.signUp({} as any)).rejects.toThrow();
    });
  });

  describe('When testing signIn', () => {
    it('Should allow signIn', async () => {
      const body: UserLoginDto = _.pick(validUser, ['phone', 'password']);
      const response = await controller.signIn(body);
      expect(_.omit(response.user, ['__v', '_id'])).toMatchObject(
        _.omit(validUser, ['password']),
      );
    });
    it('Should throw UnauthorizedException', async () => {
      await expect(controller.signIn({} as any)).rejects.toThrow();
    });
  });
});
