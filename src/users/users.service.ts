import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { UserAuthInfoDto, UserSignUpDto, UserStatsDto } from './dto/user.dto';
import { Ad } from 'src/ads/schemas/ads.schema';

@Injectable()
export class UsersService {
  @InjectModel(User.name) userModel: Model<User>;
  @InjectModel(Ad.name) private readonly adModel: Model<Ad>;
  @InjectModel(Request.name) private readonly requestModel: Model<Request>;
  constructor(private jwtService: JwtService) {}

  async signUp(data: UserSignUpDto): Promise<UserAuthInfoDto> {
    const bearerToken = this.jwtService.sign(_.omit(data, ['password']));
    return this.userModel.create({ ...data, bearerToken });
  }

  async signIn(
    phone: string,
    password: string,
  ): Promise<UserAuthInfoDto | undefined> {
    const user: UserDocument = await this.userModel.findOne({ phone });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('phone or password is wrong!');
    }
    return _.omit(user.toObject(), ['password']);
  }

  async getUserStats(page: number, limit: number): Promise<UserStatsDto> {
    const stats = await this.userModel
      .aggregate([
        {
          $lookup: {
            from: 'ads',
            localField: '_id',
            foreignField: 'userId',
            as: 'ads',
          },
        },
        {
          $lookup: {
            from: 'requests',
            localField: '_id',
            foreignField: 'userId',
            as: 'requests',
          },
        },
        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            role: { $first: '$role' },
            phone: { $first: '$phone' },
            status: { $first: '$status' },
            adsCount: { $sum: { $size: '$ads' } },
            requestsCount: { $sum: { $size: '$requests' } },
          },
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
      ])
      .exec();
    const totalAdsAmount: number = await this.adModel.countDocuments();
    const totalRequestsAmount: number =
      await this.requestModel.countDocuments();
    const totalUsers: number = await this.userModel.countDocuments();
    const response = {
      data: stats,
      totalAdsAmount,
      totalRequestsAmount,
      page,
      limit,
      total: totalUsers,
      hasNextPage: totalUsers / limit - page > 0,
      hasPreviousPage: page - 1 > 0,
    };
    return response;
  }
}
