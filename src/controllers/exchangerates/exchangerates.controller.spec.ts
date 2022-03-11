import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeratesController } from './exchangerates.controller';

describe('ExchangeratesController', () => {
  let controller: ExchangeratesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeratesController],
    }).compile();

    controller = module.get<ExchangeratesController>(ExchangeratesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
