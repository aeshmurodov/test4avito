export interface StatsSummary {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
}

export interface DailyActivity {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface DecisionDistribution {
  approved: number;
  rejected: number;
  requestChanges: number;
}

export type CategoryStats = Record<string, number>;
