import { Injectable } from '@nestjs/common';
import { AdCreationDto } from './dto/ads.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Ad, AdDocument } from './schemas/ads.schema';
import { Connection, Model, Types } from 'mongoose';

@Injectable()
export class AdsService {
  @InjectModel(Ad.name) adsModel: Model<AdDocument>;
  constructor(@InjectConnection() private readonly connection: Connection) {}
  createAd(data: AdCreationDto, userId: Types.ObjectId) {
    return this.adsModel.create({ ...data, userId });
  }

  getSingleAd(query: { _id: string }) {
    return this.adsModel.findOne(query);
  }

  getAds() {
    return this.adsModel.find();
  }

  // - Implement an endpoint that matches property requests with relevant ads based on district, price, and area.
  // - The endpoint should take an ad `_id` and return matching property requests, sorted by refreshedAt date descending.
  // - Include a price tolerance of +/- 10% in the matching system.
  //    - example: if ad price is 100 then requests with price 90 to 110 will be matched
  // - Include pagination in the response using MongoDB aggregation with a `single` database call.
  // - Ensure that the matching logic is efficient and can handle a large number of requests and ads (performance considerations).
  async getMatchingProperties(_id: string, page: number, limit: number) {
    const ad = await this.adsModel.findById(_id);
    if (!ad) {
      throw new Error('Ad not found');
    }
    return this.connection
      .collection('requests')
      .aggregate([
        {
          $match: {
            district: ad.district,
            area: ad.area,
          },
        },
        {
          $match: {
            price: { $gte: ad.price * 0.9, $lte: ad.price * 1.1 },
          },
        },
        {
          $sort: { refreshedAt: -1, _id: -1 }, // Adding _id: -1 to ensure uniqueness of the sort and avoid duplicates
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
      ])
      .toArray();
  }
}
