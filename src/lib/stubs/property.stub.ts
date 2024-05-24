import { Types } from 'mongoose';
import {
  PropertyCreationDto,
  PropertyTypeEnum,
} from 'src/lib/dto/property.dto';

export const stubPropertyCreation = (): PropertyCreationDto => {
  return {
    propertyType: PropertyTypeEnum.APARTMENT,
    area: 'Area 51',
    price: 1000000,
    city: 'Nevada',
    district: 'District 51',
    description: 'Very long and percise description of the property',
  };
};

export const stubUserObjectId = () =>
  new Types.ObjectId('6650d9986beecd96aa4c2f6b');
