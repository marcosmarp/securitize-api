import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ExchangeRateDto {
  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap()
  @ApiProperty()
  source: string;

  @AutoMap()
  @ApiProperty()
  rate: number;
}
