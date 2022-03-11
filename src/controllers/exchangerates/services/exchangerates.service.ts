import { Injectable } from '@nestjs/common';
import { IRates } from 'src/interfaces/exchangerates.interface';

@Injectable()
export class ExchangeratesService {
  private readonly rates: IRates[] = [
    {
      currency: 'USD',
      rates: 2793,
    },
    {
      currency: 'EUR',
      rates: 2542.33,
    },
  ];

  findAll() {
    return this.rates;
  }

  update(currency: string, rate: number) {
    const rateIndex = this.rates.findIndex(
      (rate) => rate.currency === currency,
    );
    this.rates[rateIndex].rates = rate;
    return this.rates[rateIndex];
  }

  convert(currency, amount) {
    const rateIndex = this.rates.findIndex(
      (rate) => rate.currency === currency,
    );
    return this.rates[rateIndex].rates * amount;
  }
}
