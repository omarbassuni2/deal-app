import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './schemas/requests.schema';
import { Model, Types } from 'mongoose';
import { RequestCreationDto, RequestUpdateDto } from './dto/requests.dto';

@Injectable()
export class RequestsService {
  @InjectModel(Request.name) private requestsModel: Model<Request>;
  async createRequest(
    data: RequestCreationDto,
    userId: Types.ObjectId,
  ): Promise<Request> {
    return this.requestsModel.create({ ...data, userId });
  }

  // UserId is optional to allow admin to do everything
  async updateRequest(
    data: RequestUpdateDto,
    query: { userId?: Types.ObjectId; _id: string },
  ): Promise<Request> {
    // - Implement an endpoint for updating property requests (description - area - price).
    return this.requestsModel.findOneAndUpdate(query, data, {
      new: true,
      runValidators: true,
    });
  }
  async getRequests(): Promise<Request[]> {
    return this.requestsModel.find();
  }
  async getSingleRequest(query: { _id: string }): Promise<Request> {
    return this.requestsModel.findOne(query);
  }
}
