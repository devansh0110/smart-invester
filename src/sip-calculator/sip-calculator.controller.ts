import { Body, Controller, Post } from '@nestjs/common';
import {
  SIPCalculatorDto,
  SIPCalculatorOutputDto,
} from './dto/sip-calculator.dto';
import { SipCalculatorService } from './sip-calculator.service';

@Controller('sip-calculator')
export class SipCalculatorController {
  constructor(private readonly sipCalculatorService: SipCalculatorService) {}

  @Post()
  calculateSIP(
    @Body() sipCalculatorDto: SIPCalculatorDto,
  ): SIPCalculatorOutputDto {
    return this.sipCalculatorService.calculateSIP(sipCalculatorDto);
  }
}
