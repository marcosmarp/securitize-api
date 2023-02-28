import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';
import { WalletCreationDto } from './dtos/wallet.create.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { WalletDto } from './dtos/wallet.read.dto';
import { WalletUpdateDto } from './dtos/wallet.update.dto';
import { EtherscanService } from 'src/etherscan/etherscan.service';
import { ExchangeRate } from '../exchange_rates/exchange_rate.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(ExchangeRate)
    private readonly exchangeRatesRepository: Repository<ExchangeRate>,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly etherscanService: EtherscanService,
  ) {}

  /**
   * Create a new wallet
   * @returns string
   */
  public async create(dto: WalletCreationDto) {
    const existingAddress = await this.walletRepository.findOne({
      where: { address: dto.address },
    });

    if (existingAddress)
      throw new BadRequestException('Address already exists');

    const entity = this.walletRepository.create(dto);
    await this.walletRepository.save(entity);
    return await entity.id;
  }

  /**
   * Find all wallets
   */
  public async findAll() {
    const wallets = await this.walletRepository.find();
    return await this.mapper.mapArrayAsync(wallets, Wallet, WalletDto);
  }

  /**
   * Find a wallet by id
   * @param id
   * @returns WalletDto
   */
  public async findOne(id: string) {
    const wallet = await this.walletRepository.findOneOrFail({
      where: { id },
    });
    const dto = await this.mapper.mapAsync(wallet, Wallet, WalletDto);

    dto.isOld = await this.etherscanService.getIsWalletOld(dto.address);
    dto.balance = await this.etherscanService.getWalletBalance(dto.address);

    const exchangeRates = await this.exchangeRatesRepository.find();
    const usdExchangeRate = exchangeRates.filter((x) => x.source === 'USD');
    const eurExchangeRate = exchangeRates.filter((x) => x.source === 'EUR');

    dto.balanceInUsd = dto.balance * usdExchangeRate[0].rate;
    dto.balanceInEur = dto.balance * eurExchangeRate[0].rate;

    return dto;
  }

  /**
   * Update a wallet
   * @param id
   * @param dto
   */
  public async update(id: string, dto: WalletUpdateDto) {
    const entity = await this.walletRepository.findOneOrFail({
      where: { id },
    });
    this.walletRepository.merge(entity, dto);
    this.walletRepository.save(entity);
  }

  /**
   * Delete a wallet
   * @param id
   */
  public async delete(id: string) {
    const entity = await this.walletRepository.findOneOrFail({
      where: { id },
    });
    this.walletRepository.remove(entity);
  }
}
