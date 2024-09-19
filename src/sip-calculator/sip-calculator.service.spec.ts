import { Test, TestingModule } from '@nestjs/testing';
import { SipCalculatorService } from './sip-calculator.service';

describe('SipCalculatorService', () => {
  let service: SipCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SipCalculatorService],
    }).compile();

    service = module.get<SipCalculatorService>(SipCalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
