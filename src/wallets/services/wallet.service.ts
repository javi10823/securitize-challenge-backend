import { Injectable } from '@nestjs/common';
import { EtherscanService } from 'src/etherscan/etherscan.service';
import { IWallet } from '../../interfaces/wallet.interface';

@Injectable()
export class WalletsService {
  private readonly wallets: IWallet[] = [];

  constructor(private readonly etherscanService: EtherscanService) {}

  async create(wallet: IWallet) {
    // Address wallet data
    const etherscanWallet = await this.etherscanService.findOne(wallet);

    // Address first transaction data
    const lastTrx = await this.etherscanService.findFirstTransaction(
      wallet.address,
    );

    // isOld = first transaction of the address was at least 1 year ago
    let isOld = false;
    if (lastTrx.data.result.length > 0) {
      const lastTrxTimestamp = parseInt(lastTrx.data.result[0].timeStamp);
      isOld = Date.now() - lastTrxTimestamp > 31536000;
    }

    // Wei Balance to Ether Balance
    const balance = parseInt(etherscanWallet.data.result) / 1000000000000000000;

    // Get next id for the wallet
    let id = 0;
    if (this.wallets.length > 0)
      id = this.wallets[this.wallets.length - 1].id + 1;

    const arrIndex = this.wallets.push({
      ...wallet,
      id,
      balance,
      isOld,
    });

    return this.wallets[arrIndex - 1];
  }

  async find(address: number[]) {
    // Address wallet data
    const etherscanService = await this.etherscanService.find(
      this.wallets.filter((wallet) => address.includes(wallet.id)),
    );

    return etherscanService.data.result.map((wallet, index) => {
      const arrIndex = this.wallets.findIndex(
        (wallet) => wallet.id === address[index],
      );
      this.wallets[arrIndex].balance =
        parseInt(wallet.balance) / 1000000000000000000 || 0;
      return this.wallets[address[index]];
    });
  }

  findAll(): IWallet[] {
    return this.wallets;
  }

  async update(id: number, address?: string): Promise<IWallet> {
    const arrIndex = this.wallets.findIndex((wallet) => wallet.id === id);

    if (address) {
      this.wallets[arrIndex].address = address;
    }

    // Address wallet data
    const etherscanWallet = await this.etherscanService.findOne(
      this.wallets[arrIndex],
    );

    // Address first transaction data
    const lastTrx = await this.etherscanService.findFirstTransaction(
      this.wallets[arrIndex].address,
    );

    // isOld = first transaction of the address was at least 1 year ago
    let isOld = false;
    if (lastTrx.data.result.length > 0) {
      const lastTrxTimestamp = parseInt(lastTrx.data.result[0].timeStamp);
      isOld = Date.now() - lastTrxTimestamp > 31536000;
    }

    // Wei Balance to Ether Balance
    const balance = parseInt(etherscanWallet.data.result) / 1000000000000000000;

    // Update wallet
    this.wallets[arrIndex].balance = balance;
    this.wallets[arrIndex].isOld = isOld;

    return this.wallets[arrIndex];
  }

  delete(id: number) {
    const arrIndex = this.wallets.findIndex((wallet) => wallet.id === id);
    this.wallets.splice(arrIndex, 1);
    return { message: 'Deleted succesfully' };
  }
}
