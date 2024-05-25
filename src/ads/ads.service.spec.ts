import { Test, TestingModule } from '@nestjs/testing';
import { AdsService } from './ads.service';
import { TestUtils } from 'src/lib/test-utils';
import { Ad, AdSchema } from './schemas/ads.schema';
import {
  stubUserObjectId,
  stubPropertyCreation,
} from 'src/lib/stubs/property.stub';
import { getQueryWithRespectToAdmin } from 'src/lib/utility';
import { stubAdmin, stubClient } from 'src/lib/stubs/request-roles.stub';
import { RequestSchema } from 'src/requests/schemas/requests.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { shouldBeMatchedArr, shouldNotBeMatchedArr } from './stubs/ads.stub';

describe('AdsService', () => {
  let service: AdsService;
  let module: TestingModule;
  let _id: string, requestModel: Model<Request>;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TestUtils.getTestConfigModule(),
        TestUtils.getTestMongooseModule('ads-service'),
        TestUtils.getTestMongooseSchemas([
          { name: Ad.name, schema: AdSchema },
          { name: Request.name, schema: RequestSchema },
        ]),
      ],
      providers: [AdsService],
    }).compile();
    requestModel = module.get<Model<Request>>(getModelToken(Request.name));
    service = module.get<AdsService>(AdsService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('When testing ad creation', () => {
    it('Should create an ad', async () => {
      const response = await service.createAd(
        stubPropertyCreation(),
        stubUserObjectId(),
      );
      expect(response).toMatchObject(stubPropertyCreation());
    });

    it('Should throw validation errors', async () => {
      await expect(
        service.createAd({} as any, stubUserObjectId()),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Ad validation failed: description: Path \`description\` is required., district: Path \`district\` is required., city: Path \`city\` is required., price: Path \`price\` is required., area: Path \`area\` is required., propertyType: Path \`propertyType\` is required."`,
      );
    });
  });

  describe('when testing ad retrievals', () => {
    it('Should return all documents', async () => {
      const response = await service.getAds();
      expect(response.length).toBeGreaterThan(0);
      _id = response[0]._id.toString();
    });
    it('Should return a single documents', async () => {
      const response = await service.getSingleAd({
        ...getQueryWithRespectToAdmin(stubAdmin()),
        _id,
      });
      expect(response).toBeDefined();
    });
  });

  describe('when matching ids with requests', () => {
    it('Should return all documents with matching criteria', async () => {
      await requestModel.insertMany([
        ...shouldBeMatchedArr(),
        ...shouldNotBeMatchedArr(),
      ]);
      const response = await service.getMatchingProperties(_id, 1, 10);
      expect(response.length).toBe(shouldBeMatchedArr().length);
    });
    it('Should not return documents at all', async () => {
      // sending a user id as a dummy instead of a document id
      await expect(
        service.getMatchingProperties(stubUserObjectId().toString(), 1, 10),
      ).rejects.toThrow();
    });
  });
});
