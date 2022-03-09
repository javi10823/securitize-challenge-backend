import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletsController } from './wallets/wallet.controller';
import { WalletsService } from './wallets/services/wallet.service';
import { EtherscanService } from './etherscan/etherscan.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController, WalletsController],
  providers: [AppService, WalletsService, EtherscanService],
})
export class AppModule {}
