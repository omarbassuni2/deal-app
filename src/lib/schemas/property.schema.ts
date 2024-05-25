import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { PropertyTypeEnum } from '../dto/property.dto';

export class Property {
  // TO-DO: use indexes
  @Prop({ required: true })
  propertyType: PropertyTypeEnum;

  @Prop({ required: true, minlength: 1, maxlength: 64, index: true })
  area: string;

  @Prop({ required: true, min: 1, index: true })
  price: number;

  @Prop({ required: true, minlength: 1, maxlength: 64 })
  city: string;

  @Prop({ required: true, minlength: 1, maxlength: 64, index: true })
  district: string;

  @Prop({ required: true, minlength: 1, maxlength: 1024 })
  description: string;

  @Prop({ default: Date.now })
  refreshedAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', index: true, required: true })
  userId: Types.ObjectId;
}
