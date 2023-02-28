import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class WalletDto {
  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap()
  @ApiProperty()
  address: string;

  @AutoMap()
  @ApiProperty()
  favorite: boolean;

  @ApiProperty()
  balance: number;

  @ApiProperty()
  isOld: boolean;

  @ApiProperty()
  balanceInUsd: number;

  @ApiProperty()
  balanceInEur: number;
}
