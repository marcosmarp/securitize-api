import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { WalletsProfile } from './automapper.profile';
import { EtherscanService } from '../etherscan/etherscan.service';
import { HttpModule } from '@nestjs/axios';
import { ExchangeRatesService } from '../exchange_rates/exchange_rates.service';
import { ExchangeRate } from '../exchange_rates/exchange_rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, ExchangeRate]), HttpModule],
  providers: [
    WalletsService,
    WalletsProfile,
    EtherscanService,
    ExchangeRatesService,
  ],
  controllers: [WalletsController],
})
export class WalletsModule {}
