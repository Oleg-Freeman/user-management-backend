import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ default: 0, required: false, type: 'number' })
  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;

  @ApiProperty({ default: 10, required: false, type: 'number' })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}
