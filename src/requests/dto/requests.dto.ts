import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { PropertyBaseDto, PropertyCreationDto } from 'src/lib/dto/property.dto';

export class RequestCreationDto extends PropertyCreationDto {}

export class RequestUpdateDto implements PropertyBaseDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(1, 1024)
  description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(1, 64)
  area: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;
}
