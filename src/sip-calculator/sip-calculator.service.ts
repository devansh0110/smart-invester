// src/sip-calculator/sip-calculator.service.ts
import { Injectable } from '@nestjs/common';
import {
  Frequency,
  MonthlyBalance,
  SIPCalculatorDto,
  SIPCalculatorOutputDto,
  TaxApplicable,
} from './dto/sip-calculator.dto';

@Injectable()
export class SipCalculatorService {
  calculateSIP(sipCalculatorDto: SIPCalculatorDto): SIPCalculatorOutputDto {
    const {
      sipAmount,
      sipFrequency,
      expectedReturn,
      timePeriod,
      yearlyStepup = 0,
      expenseRatio,
      longTermCapitalGain,
      shortTermCapitalGain,
    } = sipCalculatorDto;

    const frequencyMultiplier = this.getFrequencyMultiplier(sipFrequency);
    const totalInstallments = timePeriod * frequencyMultiplier;
    const monthlyRate = expectedReturn / 12 / 100; // Monthly expected return rate

    let totalInvestedAmount = 0;
    let totalGain = 0;
    let totalExpenses = 0;
    const monthlyBalances: MonthlyBalance[] = [];

    for (let i = 1; i <= totalInstallments; i++) {
      const installment =
        sipAmount *
        (1 + yearlyStepup / 100) ** Math.floor(i / frequencyMultiplier);
      totalInvestedAmount += installment;

      const prevBalance = i > 1 ? monthlyBalances[i - 2].accumulated : 0;
      const currentMonthGain = prevBalance * monthlyRate;
      const currentAccumulated = prevBalance + installment + currentMonthGain;

      const currentMonthExpense =
        currentAccumulated * (expenseRatio / 100 / 12);
      totalExpenses += currentMonthExpense;

      totalGain += currentMonthGain;
      monthlyBalances.push({
        month: i,
        installment,
        gain: currentMonthGain,
        accumulated: currentAccumulated - currentMonthExpense,
        expenses: currentMonthExpense,
      });
    }

    const taxApplicable: TaxApplicable = this.calculateTax(
      totalGain,
      longTermCapitalGain,
      shortTermCapitalGain,
      timePeriod,
    );

    return {
      totalInvestedAmount,
      totalGain: totalGain - totalExpenses,
      totalAccumulated: totalInvestedAmount + totalGain - totalExpenses,
      totalExpenses,
      taxApplicable,
      monthlyBalanceSheet: monthlyBalances,
    };
  }

  private getFrequencyMultiplier(frequency: Frequency): number {
    switch (frequency) {
      case Frequency.WEEKLY:
        return 52;
      case Frequency.BIWEEKLY:
        return 26;
      case Frequency.MONTHLY:
        return 12;
      default:
        return 12;
    }
  }

  private calculateTax(
    totalGain: number,
    longTermCapitalGain: number,
    shortTermCapitalGain: number,
    timePeriod: number,
  ): TaxApplicable {
    // Assuming long-term gain applies after 1 year
    const longTermTax =
      (totalGain *
        (timePeriod > 1 ? longTermCapitalGain : shortTermCapitalGain)) /
      100;
    const shortTermTax =
      timePeriod <= 1 ? (totalGain * shortTermCapitalGain) / 100 : 0;

    return {
      longTermTax,
      shortTermTax,
    };
  }
}
