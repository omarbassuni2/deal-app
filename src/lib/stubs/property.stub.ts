import { Types } from 'mongoose';
import {
  PropertyCreationDto,
  PropertyTypeEnum,
} from 'src/lib/dto/property.dto';
export const stubUserObjectId = () =>
  new Types.ObjectId('6650d9986beecd96aa4c2f6b');

export const stubUser2ObjectId = () =>
  new Types.ObjectId('6650d9986beecd96aa4c2f62');

export const stubUser3ObjectId = () =>
  new Types.ObjectId('6650d9986beecd96aa4c2f63');

export const stubPropertyCreation = (
  userId?: Types.ObjectId,
): PropertyCreationDto & { userId: Types.ObjectId } => {
  return {
    propertyType: PropertyTypeEnum.APARTMENT,
    area: 'Area 51',
    price: 100,
    city: 'Nevada',
    district: 'District 51',
    description: 'Very long and percise description of the property',
    userId: userId || stubUserObjectId(),
  };
};
