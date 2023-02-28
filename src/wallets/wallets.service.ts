import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';
import { WalletCreationDto } from './dtos/wallet.create.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { WalletDto } from './dtos/wallet.read.dto';
import { WalletUpdateDto } from './dtos/wallet.update.dto';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectMapper() private readonly mapper: Mapper,
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
