// src/dto/sip-calculator.dto.ts
import { IsNumber, IsEnum, IsOptional, Min, Max } from 'class-validator';

export enum Frequency {
  MONTHLY = 'Monthly',
  WEEKLY = 'Weekly',
  BIWEEKLY = 'Bi-Weekly',
}

export class SIPCalculatorDto {
  @IsNumber()
  sipAmount: number;

  @IsEnum(Frequency)
  sipFrequency: Frequency;

  @IsNumber()
  expectedReturn: number; // Expected annual return in percentage

  @IsNumber()
  timePeriod: number; // Time period in years

  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'yearlyStepup Value must be at least 0' })
  yearlyStepup: number; // Optional yearly step-up percentage

  @IsNumber()
  @Min(0, { message: 'expenseRatio Value must be at least 0' })
  @Max(5, { message: 'expenseRatio Value must be at most 5' })
  expenseRatio: number; // Annual expense ratio in percentage

  @IsNumber()
  @Min(0, { message: 'longTermCapitalGain Value must be at least 10' })
  longTermCapitalGain: number; // Long-term capital gain tax in percentage

  @IsNumber()
  @Min(0, { message: 'shortTermCapitalGain Value must be at least 10' })
  shortTermCapitalGain: number; // Short-term capital gain tax in percentage

  @IsNumber()
  @Min(0, { message: 'inflationRate Value must be at least 10' })
  @Max(20, { message: 'inflationRate Value must be at most 20' })
  inflationRate: number; // New field for inflation rate
}

// src/dto/sip-calculator-output.dto.ts
export class MonthlyBalance {
  month: string;
  monthIndex: number;
  currentMonthInstallment: number;
  currentMonthGain: number;
  cumulativeInvestment: number;
  cumulativeAccumulated: number;
}

export class TaxApplicable {
  longTermTax: number;
  shortTermTax: number;
}

export class SIPCalculatorOutputDto {
  totalInvestedAmount: number; // Gross total invested amount (before expenses)
  netInvestedAmount: number; // Total invested amount after deducting expenses
  totalGain: number;
  totalAccumulated: number;
  totalExpenses: number;
  taxApplicable: TaxApplicable;
  monthlyBalanceSheet: MonthlyBalance[];
  inflationAdjustedAccumulated: number; // Inflation-adjusted accumulated amount
  corpusAfterTax;
  inflationAdjustedCorpusAfterTax;
}
