import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { RoleEnum, StatusEnum } from '../dto/user.dto';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop({
    required: true,
    set: function (password: string) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    },
  })
  password: string;

  @Prop({ unique: true, required: true })
  phone: string;

  @Prop({ enum: RoleEnum })
  role: RoleEnum;

  @Prop({ enum: StatusEnum })
  status: StatusEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);
