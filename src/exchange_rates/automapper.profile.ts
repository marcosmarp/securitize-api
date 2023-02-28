import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ExchangeRateDto } from './dtos/exchange_rate.read.dto';
import { ExchangeRate } from './exchange_rate.entity';

@Injectable()
export class ExchangeRatesProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, ExchangeRate, ExchangeRateDto);
    };
  }
}
