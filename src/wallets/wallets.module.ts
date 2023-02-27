import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { WalletsProfile } from './automapper.profile';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  providers: [WalletsService, WalletsProfile],
  controllers: [WalletsController],
})
export class WalletsModule {}
