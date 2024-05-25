import { PropertyCreationDto } from 'src/lib/dto/property.dto';
import { Request } from 'src/requests/schemas/requests.schema';

export class AdCreationDto extends PropertyCreationDto {}

export class AdMatchingDto {
  data: Request[];
  page: number;
  limit: number;
  total: number;
}
