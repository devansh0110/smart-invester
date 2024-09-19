import { Body, Controller, Post } from '@nestjs/common';
import { ReturnPredictorService } from './return-predictor.service';
import {
  ReturnPredictorInputDto,
  ReturnPredictorOutputDto,
} from './dto/return-predictor.dto';
@Controller('return-predictor')
export class ReturnPredictorController {
  constructor(
    private readonly returnPredictorService: ReturnPredictorService,
  ) {}
  @Post()
  calculateReturn(
    @Body() returnPredictorDto: ReturnPredictorInputDto,
  ): ReturnPredictorOutputDto {
    const { stockPeakValue, currentValue } = returnPredictorDto;
    return this.returnPredictorService.calculateReturn(
      stockPeakValue,
      currentValue,
    );
  }
}
