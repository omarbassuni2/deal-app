import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';

export enum PropertyTypeEnum {
  'VILLA' = 'VILLA',
  'HOUSE' = 'HOUSE',
  'LAND' = 'LAND',
  'APARTMENT' = 'APARTMENT',
}

export class PropertyBaseDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 1024)
  description: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 64)
  area: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;
}

export class PropertyCreationDto extends PropertyBaseDto {
  @IsNotEmpty()
  @IsEnum(PropertyTypeEnum)
  propertyType: PropertyTypeEnum;

  @IsNotEmpty()
  @IsString()
  @Length(1, 64)
  city: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 64)
  district: string;
}
