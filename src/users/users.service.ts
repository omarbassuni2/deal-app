import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { HydratedDocument, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { UserAuthInfoDto, UserSignUpDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  @InjectModel(User.name) userModel: Model<User>;
  constructor(private jwtService: JwtService) {}

  async signUp(data: UserSignUpDto): Promise<UserAuthInfoDto> {
    return this.userModel.create(data).then((user) => {
      return this.getUserAuthInfo(user);
    });
  }

  async signIn(
    phone: string,
    password: string,
  ): Promise<UserAuthInfoDto | undefined> {
    const user: UserDocument = await this.userModel.findOne({ phone });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('phone or password is wrong!');
    }
    return this.getUserAuthInfo(user);
  }

  private getUserAuthInfo(user: UserDocument): UserAuthInfoDto {
    (user as Omit<User, 'password'>) = _.omit(user.toObject(), ['password']);
    return {
      user,
      access_token: this.jwtService.sign(user),
    };
  }

  getUserStats() {
    // TO-DO: implement this
    return 'Not Implemented yet';
  }
}
