export interface FinanceSummary {
  totalSpending: number;
  totalServicesPurchased: number;
  averageSpend: number;
  percentageIncrease: number;
}

export interface MonthlySpend {
  month: string;
  amount: number;
}

export interface RecentPayments {
  name: string;
  date: string;
  service: string;
  provider: string;
  price: number;
}
