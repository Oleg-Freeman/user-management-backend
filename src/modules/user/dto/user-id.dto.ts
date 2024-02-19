import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UserIdDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Mongo Object ID',
    example: '5f4a3b6e8b0c9d0e3c1f4b2d',
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
