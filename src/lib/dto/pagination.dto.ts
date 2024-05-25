import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PaginationQuery {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number;
}
