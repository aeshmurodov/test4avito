import { useQuery } from '@tanstack/react-query';
import { http } from './http';
import type { StatsSummary, DailyActivity, DecisionDistribution, CategoryStats } from '../types/stats';

export type StatsPeriod = 'today' | 'week' | 'month';

export function useStatsSummary(period: StatsPeriod = 'week') {
  return useQuery({
    queryKey: ['stats', 'summary', period],
    queryFn: async ({ signal }) => {
      const { data } = await http.get<StatsSummary>('/stats/summary', {
        params: { period },
        signal
      });
      return data;
    }
  });
}

export function useDailyActivity(period: StatsPeriod = 'week') {
  return useQuery({
    queryKey: ['stats', 'activity', period],
    queryFn: async ({ signal }) => {
      const { data } = await http.get<DailyActivity[]>('/stats/chart/activity', {
        params: { period },
        signal
      });
      return data;
    }
  });
}

export function useDecisionDistribution(period: StatsPeriod = 'week') {
  return useQuery({
    queryKey: ['stats', 'distribution', period],
    queryFn: async ({ signal }) => {
      const { data } = await http.get<DecisionDistribution>('/stats/chart/decisions', {
        params: { period },
        signal
      });
      return data;
    }
  });
}

export function useCategoryStats(period: StatsPeriod = 'week') {
  return useQuery({
    queryKey: ['stats', 'category', period],
    queryFn: async ({ signal }) => {
      const { data } = await http.get<CategoryStats>('/stats/chart/categories', {
        params: { period },
        signal
      });
      return data;
    }
  });
}
