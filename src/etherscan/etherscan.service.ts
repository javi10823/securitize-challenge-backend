import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { IWallet } from 'src/interfaces/wallet.interface';
import {
  IEtherscanMultiResult,
  IEtherscanResult,
  IEtherscanTransaction,
} from '../interfaces/etherscan.interface';

@Injectable()
export class EtherscanService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  findOne(wallet: IWallet): Promise<AxiosResponse<IEtherscanResult>> {
    return this.httpService
      .get(
        this.configService.get('ETHERSCAN_URL') +
          '?module=account&action=balance' +
          '&address=' +
          wallet.address +
          '&tag=latest' +
          '&apikey=' +
          this.configService.get('ETHERSCAN_APIKEY'),
      )
      .toPromise();
  }

  find(wallets: IWallet[]): Promise<AxiosResponse<IEtherscanMultiResult>> {
    return this.httpService
      .get(
        this.configService.get('ETHERSCAN_URL') +
          '?module=account&action=balancemulti' +
          '&address=' +
          wallets.map((wallet) => wallet.address).join(',') +
          '&tag=latest' +
          '&apikey=' +
          this.configService.get('ETHERSCAN_APIKEY'),
      )
      .toPromise();
  }

  findFirstTransaction(
    address: string,
  ): Promise<AxiosResponse<IEtherscanTransaction>> {
    return this.httpService
      .get(
        this.configService.get('ETHERSCAN_URL') +
          '?module=account&action=txlist' +
          '&address=' +
          address +
          '&startblock=0&endblock=99999999&page=1&offset=1&sort=asc' +
          '&apikey=' +
          this.configService.get('ETHERSCAN_APIKEY'),
      )
      .toPromise();
  }
}
