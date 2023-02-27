import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletsModule } from './wallets/wallets.module';
import { ExchangeRatesModule } from './exchange_rates/exchange_rates.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        schema: 'public',
        synchronize: true,
        autoLoadEntities: true,
        ssl: true,
      }),
    }),
    WalletsModule,
    ExchangeRatesModule,
  ],
})
export class AppModule {}
