import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from './http';
import type { Ad, AdStatus } from '../types/ad';

interface AdsResponse {
  ads: Ad[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

const moderateEndpoints: Record<Exclude<AdStatus, 'pending'>, string> = {
  approved: 'approve',
  rejected: 'reject',
  draft: 'request-changes'
};

export function useAdsList(params: URLSearchParams) {
  return useQuery({
    queryKey: ["adsList", params.toString()], // ОБЯЗАТЕЛЬНО!
    queryFn: async ({ signal }) => {
      const paramsObject = Object.fromEntries(params);
      const limit = paramsObject.limit ?? '10';

      const { data } = await http.get<AdsResponse>('/ads', {
        params: { ...paramsObject, limit },
        signal
      });

      return data;
    }
  });
}

export function useAd(id: number) {
  return useQuery({
    queryKey: ['ad', id],
    queryFn: async ({ signal }) => {
      const { data } = await http.get<Ad>(`/ads/${id}`, {
        signal
      });
      return data;
    },
    enabled: !!id
  });
}

export function useModerateAd(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { status: Exclude<AdStatus, 'pending'>; reason?: string; comment?: string }) => {
      const endpoint = moderateEndpoints[payload.status];
      const body = payload.status === 'approved' ? undefined : { reason: payload.reason ?? 'Not specified', comment: payload.comment };
      const { data } = await http.post(`/ads/${id}/${endpoint}`, body);
      return data?.ad as Ad | undefined;
    },
    onSuccess: (updatedAd) => {
      if (updatedAd) {
        qc.setQueryData(['ad', id], updatedAd);
      }
      qc.invalidateQueries({ queryKey: ['ads'], exact: false });
      qc.invalidateQueries({ queryKey: ['ad', id] });
      qc.invalidateQueries({ queryKey: ['stats'], exact: false });
    }
  });
}

export function useBulkModerateAds() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { ids: number[]; status: Exclude<AdStatus, 'pending'>; reason?: string; comment?: string }) => {
      const endpoint = moderateEndpoints[payload.status];
      const requests = payload.ids.map((id) => {
        const body = payload.status === 'approved' ? undefined : { reason: payload.reason ?? 'Bulk moderation', comment: payload.comment };
        return http.post(`/ads/${id}/${endpoint}`, body);
      });
      return Promise.all(requests);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['ads'], exact: false });
      qc.invalidateQueries({ queryKey: ['stats'], exact: false });
    }
  });
}
