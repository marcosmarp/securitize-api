import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Wallet } from './wallet.entity';
import { WalletDto } from './dtos/wallet.read.dto';

@Injectable()
export class WalletsProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, Wallet, WalletDto);
    };
  }
}
