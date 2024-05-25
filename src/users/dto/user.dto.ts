import { IsEnum, IsString, Length } from 'class-validator';
import { User } from '../schemas/user.schema';
export enum RoleEnum {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  AGENT = 'AGENT',
}

export enum StatusEnum {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
}
export class UserDto {
  @IsString()
  name: string;

  @Length(11, 11)
  @IsString()
  phone: string;

  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsEnum(StatusEnum)
  status: StatusEnum;
}
export class UserSignUpDto extends UserDto {
  @IsString()
  password: string;
}

export class UserLoginDto {
  @IsString()
  phone: string;

  @IsString()
  password: string;
}

export class UserAuthInfoDto extends UserDto {
  bearerToken: string;
}

// [{
//     name: 'name',
//     role: 'name',
//     ...other user data,
//     adsCount: 0,
//     totalAdsAmount: 0,
//     requestsCount: 10,
//     totalRequestsAmount: 23600,
// }],
export class StatsDataDto extends UserDto {
  adsCount: number;
  requestsCount: number;
}

export class UserStatsDto {
  data: StatsDataDto[];
  totalAdsAmount: number;
  totalRequestsAmount: number;
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
