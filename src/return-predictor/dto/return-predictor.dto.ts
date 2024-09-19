// src/dto/return-predictor.dto.ts
import { IsNumber } from 'class-validator';

export class ReturnPredictorInputDto {
  @IsNumber()
  stockPeakValue: number;

  @IsNumber()
  currentValue: number;
}

export class ReturnPredictorOutputDto {
  expectedReturn: number;
  correction: number;
}
