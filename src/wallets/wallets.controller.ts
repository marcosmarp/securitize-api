import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WalletCreationDto } from './dtos/wallet.create.dto';
import { WalletUpdateDto } from './dtos/wallet.update.dto';

@ApiTags('Wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @ApiOperation({ summary: 'Create a new wallet' })
  @ApiResponse({
    status: 201,
    description: 'The wallet has been successfully created.',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Post()
  async createWallet(@Body() dto: WalletCreationDto) {
    this.walletsService.create(dto);
  }

  @ApiOperation({ summary: 'Find all wallets' })
  @ApiResponse({
    status: 200,
    description: 'The wallets have been successfully retrieved.',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Get()
  async findAll() {
    return this.walletsService.findAll();
  }

  @ApiOperation({ summary: 'Update a wallet' })
  @ApiResponse({
    status: 200,
    description: 'The wallet has been successfully updated.',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Put(':id')
  async updateWallet(@Param('id') id: string, @Body() dto: WalletUpdateDto) {
    this.walletsService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete a wallet' })
  @ApiResponse({
    status: 200,
    description: 'The wallet has been successfully deleted.',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Delete(':id')
  async deleteWallet(@Param('id') id: string) {
    this.walletsService.delete(id);
  }
}
