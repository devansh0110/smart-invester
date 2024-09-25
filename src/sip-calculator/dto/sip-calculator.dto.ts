// src/dto/sip-calculator.dto.ts
import { IsNumber, IsEnum, IsOptional } from 'class-validator';

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
  yearlyStepup: number; // Optional yearly step-up percentage

  @IsNumber()
  expenseRatio: number; // Annual expense ratio in percentage

  @IsNumber()
  longTermCapitalGain: number; // Long-term capital gain tax in percentage

  @IsNumber()
  shortTermCapitalGain: number; // Short-term capital gain tax in percentage

  @IsNumber()
  inflationRate: number; // New field for inflation rate
}

// src/dto/sip-calculator-output.dto.ts
export class MonthlyBalance {
  month: number;
  installment: number;
  gain: number;
  accumulated: number;
  expenses: number;
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
