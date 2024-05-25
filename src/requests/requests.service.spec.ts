import { Test, TestingModule } from '@nestjs/testing';
import { RequestsService } from './requests.service';
import { TestUtils } from 'src/lib/test-utils';
import { Request, RequestSchema } from './schemas/requests.schema';
import {
  stubUserObjectId,
  stubPropertyCreation,
} from 'src/lib/stubs/property.stub';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { RequestUpdateDto } from './dto/requests.dto';
import _ from 'lodash';

describe('RequestsService', () => {
  let service: RequestsService;
  let module: TestingModule;
  let requestModel: Model<Request>;
  let firstDocId: string;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TestUtils.getTestConfigModule(),
        TestUtils.getTestMongooseModule('requests-service'),
        TestUtils.getTestMongooseSchemas([
          { name: Request.name, schema: RequestSchema },
        ]),
      ],
      providers: [RequestsService],
    }).compile();

    service = module.get<RequestsService>(RequestsService);
    requestModel = module.get<Model<Request>>(getModelToken(Request.name));
  });
  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When testing creation', () => {
    it('Should create a request', async () => {
      const response = await service.createRequest(
        stubPropertyCreation(),
        stubUserObjectId(),
      );
      expect(response).toMatchObject(stubPropertyCreation());
    });

    it('Should throw validation errors', async () => {
      await expect(
        service.createRequest({} as any, stubUserObjectId()),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Request validation failed: description: Path \`description\` is required., district: Path \`district\` is required., city: Path \`city\` is required., price: Path \`price\` is required., area: Path \`area\` is required., propertyType: Path \`propertyType\` is required."`,
      );
    });
  });

  describe('When testing get requests', () => {
    it("Should return user's requests", async () => {
      const requests = await service.getRequests();
      expect(requests.length).toBeGreaterThanOrEqual(1);
      firstDocId = requests[0]._id.toString();
    });
    it('Should return a single user request', async () => {
      const singleRequest = await service.getSingleRequest({
        _id: firstDocId,
      });
      expect(singleRequest.length).toBe(1);
      expect(singleRequest[0]).toMatchObject(stubPropertyCreation());
    });
  });

  describe('when testing update', () => {
    it('Should update the request successfully', async () => {
      const newData: RequestUpdateDto = {
        description: 'New Description',
        price: 43434334,
        area: 'New Area',
      };
      const edited = await service.updateRequest(newData, {
        userId: stubUserObjectId(),
        _id: firstDocId,
      });
      expect(_.pick(edited, Object.keys(newData))).toMatchObject(newData);
    });

    it('Should throw database validation error', async () => {
      const newData: RequestUpdateDto = {
        description: '',
        price: -122,
        area: '',
      };
      await expect(
        service.updateRequest(newData, {
          userId: stubUserObjectId(),
          _id: firstDocId,
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Validation failed: area: Path \`area\` is required., price: Path \`price\` (-122) is less than minimum allowed value (1)., description: Path \`description\` is required."`,
      );
    });
  });
});
