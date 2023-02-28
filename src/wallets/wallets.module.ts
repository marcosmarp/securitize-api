import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { WalletsProfile } from './automapper.profile';
import { EtherscanService } from '../etherscan/etherscan.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet]), HttpModule],
  providers: [WalletsService, WalletsProfile, EtherscanService],
  controllers: [WalletsController],
})
export class WalletsModule {}
