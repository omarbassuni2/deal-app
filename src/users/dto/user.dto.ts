import { IsEnum, IsString } from 'class-validator';
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

export class UserSignUpDto {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsEnum(StatusEnum)
  status: StatusEnum;
}

export class UserLoginDto {
  @IsString()
  phone: string;

  @IsString()
  password: string;
}

export class UserAuthInfoDto {
  user: Omit<User, 'password'>;
  access_token: string;
}
