import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExchangeRatesService } from './exchange_rates.service';
import { ExchangeRateUpdateDto } from './dtos/exchange_rate.update.dto';

@ApiTags('Exchange Rates')
@Controller('exchange-rates')
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @ApiOperation({ summary: 'Find all exchange rates' })
  @ApiResponse({
    status: 200,
    description: 'The exchange rates have been successfully retrieved.',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Get()
  async findAll() {
    return this.exchangeRatesService.findAll();
  }

  @ApiOperation({ summary: 'Update an exchange rate' })
  @ApiResponse({
    status: 200,
    description: 'The exchange rate has been successfully updated.',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: ExchangeRateUpdateDto) {
    return this.exchangeRatesService.update(id, dto);
  }
}
