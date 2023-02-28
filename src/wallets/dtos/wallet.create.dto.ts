import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class WalletCreationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(42)
  address: string;
}
