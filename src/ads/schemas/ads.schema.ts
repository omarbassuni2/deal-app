import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Property } from 'src/lib/schemas/property.schema';

export type AdDocument = HydratedDocument<Ad>;

// - `propertyType` "VILLA" | "HOUSE" |"LAND" | "APARTMENT"
// - `area`
// - `price`
// - `city`
// - `district`
// - `description`
// - `refreshedAt`: Date (date of last time user refreshed his request)

// - Create a schema for storing ads with same attributes. (As Requests)

// - Ads and requests should be linked to users who create them.

@Schema({ timestamps: true, autoIndex: true })
export class Ad extends Property {}

export const AdSchema = SchemaFactory.createForClass(Ad);
AdSchema.index({ area: 1, district: 1 });
