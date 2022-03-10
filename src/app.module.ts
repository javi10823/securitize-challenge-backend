import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WalletsController } from './controllers/wallets/wallet.controller';
import { WalletsService } from './controllers/wallets/services/wallet.service';
import { EtherscanService } from './controllers/etherscan/etherscan.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [WalletsController],
  providers: [WalletsService, EtherscanService],
})
export class AppModule {}
