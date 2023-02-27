import { ApiProperty } from '@nestjs/swagger';

export class WalletUpdateDto {
  @ApiProperty()
  address: string;

  @ApiProperty()
  favorite: boolean;
}
