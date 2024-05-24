import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { TestUtils } from 'src/lib/test-utils';
import _ from 'lodash';
import { UserSignUpDto } from './dto/user.dto';
import { stubValidUserSignUp } from './stubs/users.stub';

describe('UsersService', () => {
  let service: UsersService;
  let module: TestingModule;
  let userModel: Model<User>;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TestUtils.getTestConfigModule(),
        TestUtils.getTestMongooseModule('users-services'),
        TestUtils.getTestJwtModule(),
        TestUtils.getTestMongooseSchemas([
          { name: User.name, schema: UserSchema },
        ]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });
  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When testing Users ', () => {
    const userStub: UserSignUpDto = stubValidUserSignUp();
    it('Should create a user the first time', async () => {
      const user1 = await service.signUp(userStub);
      expect(user1).toBeDefined();
    });

    it('Should not create user and throw an error because of phone duplication', async () => {
      await expect(service.signUp(userStub)).rejects.toThrow();
    });

    it('Should return user auth info', async () => {
      const user1 = await service.signIn(userStub.phone, userStub.password);
      expect(user1.user.phone).toBe(userStub.phone);
      expect(user1.access_token).toBeDefined();
      expect(typeof user1.access_token).toBe('string');
      expect(_.get(user1, 'user.password')).toBeUndefined();
    });

    it('Should throw an error', async () => {
      await expect(
        service.signIn(userStub.phone, 'NotAValidPassword'),
      ).rejects.toThrow();
    });
  });
});
