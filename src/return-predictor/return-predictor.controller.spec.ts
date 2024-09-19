import { Test, TestingModule } from '@nestjs/testing';
import { ReturnPredictorController } from './return-predictor.controller';
import { ReturnPredictorService } from './return-predictor.service';

describe('ReturnPredictorController', () => {
  let controller: ReturnPredictorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReturnPredictorController],
      providers: [ReturnPredictorService],
    }).compile();

    controller = module.get<ReturnPredictorController>(
      ReturnPredictorController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
