// src/sip-calculator/sip-calculator.service.ts
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
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
      inflationRate,
    } = sipCalculatorDto;

    const frequencyMultiplier = this.getFrequencyMultiplier(sipFrequency);
    const totalInstallments = timePeriod * frequencyMultiplier;
    const monthlyRate = expectedReturn / 12 / 100; // Convert annual return to monthly decimal

    let totalInvestedAmount = 0; // Total amount invested before expenses
    let netInvestedAmount = 0; // Total amount invested after deducting expenses
    let totalGain = 0;
    let totalExpenses = 0;
    const monthlyBalances: MonthlyBalance[] = [];
    const currentMonth = moment();
    for (let i = 1; i <= totalInstallments; i++) {
      currentMonth.add(1, 'months');
      const year = Math.floor((i - 1) / frequencyMultiplier); // Zero-based year index
      const installment = sipAmount * Math.pow(1 + yearlyStepup / 100, year); // Apply step-up annually
      const expense = installment * (expenseRatio / 100); // Upfront expense on each installment
      const netInstallment = installment - expense; // Installment after deducting expense

      totalInvestedAmount += installment; // Accumulate gross installment
      netInvestedAmount += netInstallment; // Accumulate net installment
      totalExpenses += expense; // Accumulate expenses

      const prevBalance =
        i > 1 ? monthlyBalances[i - 2].cumulativeAccumulated : 0;
      const currentMonthGain = prevBalance * monthlyRate;
      const currentAccumulated =
        prevBalance + netInstallment + currentMonthGain;

      totalGain += currentMonthGain;

      monthlyBalances.push({
        month: currentMonth.format('MMM YY'),
        monthIndex: i,
        currentMonthInstallment: Math.round(netInstallment),
        currentMonthGain: Math.round(currentMonthGain),
        cumulativeInvestment: Math.round(netInvestedAmount),
        cumulativeAccumulated: Math.round(currentAccumulated),
      });
    }

    const taxApplicable: TaxApplicable = this.calculateTax(
      totalGain,
      longTermCapitalGain,
      shortTermCapitalGain,
      timePeriod,
    );

    const totalAccumulated = netInvestedAmount + totalGain;

    // Calculate inflation-adjusted accumulated amount
    const inflationAdjustedAccumulated = this.calculateInflationAdjustedAmount(
      totalAccumulated,
      inflationRate,
      timePeriod,
    );

    const corpusAfterTax =
      totalAccumulated - taxApplicable.longTermTax - taxApplicable.shortTermTax;

    const inflationAdjustedCorpusAfterTax =
      this.calculateInflationAdjustedAmount(
        corpusAfterTax,
        inflationRate,
        timePeriod,
      );
    return {
      totalInvestedAmount: Math.round(totalInvestedAmount),
      totalExpenses: Math.round(totalExpenses),
      netInvestedAmount: Math.round(netInvestedAmount), // Include net invested amount
      totalGain: Math.round(totalGain),
      totalAccumulated: Math.round(totalAccumulated),
      inflationAdjustedAccumulated: Math.round(inflationAdjustedAccumulated),
      taxApplicable,
      corpusAfterTax: Math.round(corpusAfterTax),
      inflationAdjustedCorpusAfterTax: Math.round(
        inflationAdjustedCorpusAfterTax,
      ),
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
    // Calculate long-term tax if investment period is more than 1 year
    const longTermTax =
      (totalGain *
        (timePeriod > 1 ? longTermCapitalGain : shortTermCapitalGain)) /
      100;
    // Calculate short-term tax if investment period is 1 year or less
    const shortTermTax =
      timePeriod <= 1 ? (totalGain * shortTermCapitalGain) / 100 : 0;

    return {
      longTermTax: Math.round(longTermTax),
      shortTermTax: Math.round(shortTermTax),
    };
  }

  private calculateInflationAdjustedAmount(
    accumulatedAmount: number,
    inflationRate: number,
    timePeriod: number,
  ): number {
    // Adjust the accumulated amount for inflation over the investment period
    return accumulatedAmount / Math.pow(1 + inflationRate / 100, timePeriod);
  }
}
