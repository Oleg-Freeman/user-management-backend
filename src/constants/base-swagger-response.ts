import { ApiProperty } from '@nestjs/swagger';

export class BaseSwaggerResponse {
  @ApiProperty({
    example: '60f3e3e3e3e3e3e3e3e3e3e3',
    description: 'Id',
    required: true,
  })
  _id?: string;

  @ApiProperty({
    example: '2021-07-18T15:00:00.000Z',
    description: 'Date of creation',
    required: true,
  })
  createdAt?: string;

  @ApiProperty({
    example: '2021-07-18T15:00:00.000Z',
    description: 'Date of last update',
    required: true,
  })
  updatedAt?: string;
}
