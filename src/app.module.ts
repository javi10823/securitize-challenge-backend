import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WalletsController } from './controllers/wallets/wallet.controller';
import { WalletsService } from './controllers/wallets/services/wallet.service';
import { EtherscanService } from './controllers/etherscan/etherscan.service';
import { ConfigModule } from '@nestjs/config';
import { ExchangeratesController } from './controllers/exchangerates/exchangerates.controller';
import { ExchangeratesService } from './controllers/exchangerates/services/exchangerates.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [WalletsController, ExchangeratesController],
  providers: [WalletsService, EtherscanService, ExchangeratesService],
})
export class AppModule {}
