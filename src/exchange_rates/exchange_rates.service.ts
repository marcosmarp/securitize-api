import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExchangeRate } from './exchange_rate.entity';
import { ExchangeRateDto } from './dtos/exchange_rate.read.dto';
import { ExchangeRateUpdateDto } from './dtos/exchange_rate.update.dto';

@Injectable()
export class ExchangeRatesService {
  constructor(
    @InjectRepository(ExchangeRate)
    private readonly exchangeRateRepository: Repository<ExchangeRate>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  /**
   * Find all exchange rates
   * @returns ExchangeRateDto[]
   */
  public async findAll() {
    // find and sort so USD is first
    const exchangeRates = (await this.exchangeRateRepository.find()).sort((a) =>
      a.source === 'USD' ? -1 : 1,
    );

    return await this.mapper.mapArrayAsync(
      exchangeRates,
      ExchangeRate,
      ExchangeRateDto,
    );
  }

  /**
   * Update an exchange rate
   * @param id
   * @param dto
   */
  public async update(id: string, dto: ExchangeRateUpdateDto) {
    const entity = await this.exchangeRateRepository.findOneOrFail({
      where: { id },
    });
    this.exchangeRateRepository.merge(entity, dto);
    this.exchangeRateRepository.save(entity);
  }
}
