import { ApiProperty } from '@nestjs/swagger';

export class ExchangeRateUpdateDto {
  @ApiProperty()
  rate: number;
}
