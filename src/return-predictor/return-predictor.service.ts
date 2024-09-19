import { Injectable } from '@nestjs/common';
import { ReturnPredictorOutputDto } from './dto/return-predictor.dto';

@Injectable()
export class ReturnPredictorService {
  calculateReturn(
    stockPeakValue: number,
    currentValue: number,
  ): ReturnPredictorOutputDto {
    const gap = stockPeakValue - currentValue;
    const expectedReturn = (gap * 100) / currentValue;
    const correction = (gap * 100) / stockPeakValue;

    return { expectedReturn, correction };
  }
}
