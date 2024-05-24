import { Injectable } from '@nestjs/common';
import { AdCreationDto } from './dto/ads.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ad, AdDocument } from './schemas/ads.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class AdsService {
  @InjectModel(Ad.name) adsModel: Model<AdDocument>;
  createAd(data: AdCreationDto, userId: Types.ObjectId) {
    return this.adsModel.create({ ...data, userId });
  }

  getSingleAdd(query: { _id: string; userId?: Types.ObjectId }) {
    return this.adsModel.findOne(query);
  }

  getAds(query: { userId?: Types.ObjectId }) {
    return this.adsModel.find(query);
  }
}
