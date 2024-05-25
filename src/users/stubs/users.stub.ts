import {
  stubUser2ObjectId,
  stubUser3ObjectId,
  stubUserObjectId,
} from 'src/lib/stubs/property.stub';
import { RoleEnum, StatusEnum, UserStatsDto } from '../dto/user.dto';
import _ from 'lodash';
export const stubValidUserSignUp = () => {
  return {
    _id: stubUserObjectId(),
    name: 'name',
    password: 'password',
    phone: '01111110707',
    role: RoleEnum.CLIENT,
    status: StatusEnum.ACTIVE,
  };
};
export const stubValidUser2SignUp = () => {
  return {
    _id: stubUser2ObjectId(),
    name: 'name',
    password: 'password',
    phone: '01111110702',
    role: RoleEnum.AGENT,
    status: StatusEnum.ACTIVE,
  };
};
export const stubValidUser3SignUp = () => {
  return {
    _id: stubUser3ObjectId(),
    name: 'name',
    password: 'password',
    phone: '01111110703',
    role: RoleEnum.AGENT,
    status: StatusEnum.ACTIVE,
  };
};

export const stubUserStats = (): UserStatsDto => {
  return {
    data: [
      {
        ..._.omit(stubValidUserSignUp(), ['password']),
        adsCount: 0,
        requestsCount: 17,
      },
      {
        ..._.omit(stubValidUser2SignUp(), ['password']),
        adsCount: 11,
        requestsCount: 0,
      },
      {
        ..._.omit(stubValidUser3SignUp(), ['password']),
        adsCount: 5,
        requestsCount: 0,
      },
    ],
    totalAdsAmount: 16,
    totalRequestsAmount: 17,
    page: 1,
    limit: 10,
    total: 3,
    hasNextPage: false,
    hasPreviousPage: false,
  };
};
