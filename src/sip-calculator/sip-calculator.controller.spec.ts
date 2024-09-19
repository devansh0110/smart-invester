import { Test, TestingModule } from '@nestjs/testing';
import { SipCalculatorController } from './sip-calculator.controller';
import { SipCalculatorService } from './sip-calculator.service';

describe('SipCalculatorController', () => {
  let controller: SipCalculatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SipCalculatorController],
      providers: [SipCalculatorService],
    }).compile();

    controller = module.get<SipCalculatorController>(SipCalculatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
