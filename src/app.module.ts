import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReturnPredictorModule } from './return-predictor/return-predictor.module';
import { SipCalculatorModule } from './sip-calculator/sip-calculator.module';

@Module({
  imports: [ReturnPredictorModule, SipCalculatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
