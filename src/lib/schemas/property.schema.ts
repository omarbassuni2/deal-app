import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { PropertyTypeEnum } from '../dto/property.dto';

export class Property {
  // TO-DO: use indexes
  @Prop({ required: true })
  propertyType: PropertyTypeEnum;

  @Prop({ required: true, minlength: 1, maxlength: 64 })
  area: string;

  @Prop({ required: true, min: 1 })
  price: number;

  @Prop({ required: true, minlength: 1, maxlength: 64 })
  city: string;

  @Prop({ required: true, minlength: 1, maxlength: 64 })
  district: string;

  @Prop({ required: true, minlength: 1, maxlength: 1024 })
  description: string;

  @Prop({ default: new Date() }) // TO-DO: this is a milli seconds earlier than createdAt. make it equal to createdAt
  refreshedAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', index: true })
  userId: Types.ObjectId;
}
