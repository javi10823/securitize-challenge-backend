import { Body, Controller, Get, Put } from '@nestjs/common';
import { UpdateRatesDto } from './dto/updateRates.dto';
import { ExchangeratesService } from './services/exchangerates.service';

@Controller('exchangerates')
export class ExchangeratesController {
  constructor(private readonly exchangeratesService: ExchangeratesService) {}

  @Get()
  getRates() {
    return this.exchangeratesService.findAll();
  }

  @Put()
  updateRates(@Body() updateRatesDto: UpdateRatesDto) {
    return this.exchangeratesService.update(
      updateRatesDto.currency,
      updateRatesDto.rate,
    );
  }
}
