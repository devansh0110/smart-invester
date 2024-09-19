import { Module } from '@nestjs/common';
import { SipCalculatorService } from './sip-calculator.service';
import { SipCalculatorController } from './sip-calculator.controller';

@Module({
  controllers: [SipCalculatorController],
  providers: [SipCalculatorService],
})
export class SipCalculatorModule {}
