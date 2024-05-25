import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { TestUtils } from 'src/lib/test-utils';
import _ from 'lodash';
import { UserSignUpDto } from './dto/user.dto';
import {
  stubUserStats,
  stubValidUser2SignUp,
  stubValidUser3SignUp,
  stubValidUserSignUp,
} from './stubs/users.stub';
import {
  stubPropertyCreation,
  stubUser2ObjectId,
  stubUser3ObjectId,
} from 'src/lib/stubs/property.stub';
import { Ad, AdSchema } from 'src/ads/schemas/ads.schema';
import { RequestSchema } from 'src/requests/schemas/requests.schema';

describe('UsersService', () => {
  let service: UsersService;
  let module: TestingModule;
  let userModel: Model<User>,
    requestModel = Model<Request>,
    adModel: Model<Ad>;
  const userStub: UserSignUpDto = stubValidUserSignUp();
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TestUtils.getTestConfigModule(),
        TestUtils.getTestMongooseModule('users-services'),
        TestUtils.getTestJwtModule(),
        TestUtils.getTestMongooseSchemas([
          { name: User.name, schema: UserSchema },
          { name: Ad.name, schema: AdSchema },
          { name: Request.name, schema: RequestSchema },
        ]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
    requestModel = module.get<Model<Request>>(getModelToken(Request.name));
    adModel = module.get<Model<Ad>>(getModelToken(Ad.name));
  });
  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When testing sign up ', () => {
    it('Should create a user the first time', async () => {
      const user1 = await service.signUp(userStub as any); // To ensure that our user has the same _id in all places
      expect(user1).toBeDefined();
    });

    it('Should not create user and throw an error because of phone duplication', async () => {
      await expect(service.signUp(userStub)).rejects.toThrow();
    });
  });
  describe('When testing sign in', () => {
    it('Should return user auth info', async () => {
      const user1 = await service.signIn(userStub.phone, userStub.password);
      expect(user1.phone).toBe(userStub.phone);
      expect(user1.bearerToken).toBeDefined();
      expect(typeof user1.bearerToken).toBe('string');
      expect(_.get(user1, 'password')).toBeUndefined();
    });

    it('Should throw an error', async () => {
      await expect(
        service.signIn(userStub.phone, 'NotAValidPassword'),
      ).rejects.toThrow();
    });
  });
  describe('When testing stats', () => {
    it('Should return stats', async () => {
      await requestModel.insertMany(Array(17).fill(stubPropertyCreation()));
      await service.signUp(stubValidUser2SignUp() as any);
      await service.signUp(stubValidUser3SignUp() as any);
      await adModel.insertMany([
        ...Array(11).fill(stubPropertyCreation(stubUser2ObjectId())),
        ...Array(5).fill(stubPropertyCreation(stubUser3ObjectId())),
      ]);
      const stats = await service.getUserStats(1, 10);
      expect(
        stats.data
          .map((d) => _.omit(d, ['_id']))
          .sort((a, b) => a.phone.localeCompare(b.phone)),
      ).toMatchObject(
        stubUserStats()
          .data.map((d) => _.omit(d, ['_id']))
          .sort((a, b) => a.phone.localeCompare(b.phone)),
      );
      expect(_.omit(stats, ['data'])).toMatchObject(
        _.omit(stubUserStats(), ['data']),
      );
    });
  });
});
