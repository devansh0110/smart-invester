import { Test, TestingModule } from '@nestjs/testing';
import { ReturnPredictorService } from './return-predictor.service';

describe('ReturnPredictorService', () => {
  let service: ReturnPredictorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReturnPredictorService],
    }).compile();

    service = module.get<ReturnPredictorService>(ReturnPredictorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
