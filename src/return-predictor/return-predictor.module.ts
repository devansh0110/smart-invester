import { Module } from '@nestjs/common';
import { ReturnPredictorService } from './return-predictor.service';
import { ReturnPredictorController } from './return-predictor.controller';

@Module({
  controllers: [ReturnPredictorController],
  providers: [ReturnPredictorService],
})
export class ReturnPredictorModule {}
