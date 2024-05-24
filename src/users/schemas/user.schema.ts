import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { RoleEnum, StatusEnum } from '../dto/user.dto';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, minlength: 1, maxlength: 64 })
  name: string;

  @Prop({
    minlength: '3',
    maxlength: 64,
    required: true,
    set: function (password: string) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    },
  })
  password: string;

  @Prop({ unique: true, required: true, index: true, length: 11 })
  phone: string;

  @Prop({ enum: RoleEnum })
  role: RoleEnum;

  @Prop({ enum: StatusEnum })
  status: StatusEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);

/*
   - Create a schema for users who will use the system, with the following attributes:
     - `name`
     - `phone` (unique)
     - `role`: 'ADMIN' | 'CLIENT' | 'AGENT'
     - `status`: 'ACTIVE' | 'DELETED'
*/
