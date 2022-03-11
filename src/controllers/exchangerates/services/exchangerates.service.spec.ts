import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeratesService } from './exchangerates.service';

describe('ExchangeratesService', () => {
  let service: ExchangeratesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeratesService],
    }).compile();

    service = module.get<ExchangeratesService>(ExchangeratesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
