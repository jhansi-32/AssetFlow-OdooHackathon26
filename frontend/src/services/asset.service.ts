import { axiosClient } from '@/services/api/axiosClient';
import type { Asset, AssetFilters, AssetTimelineEvent, PaginatedResult } from '@/types/asset.types';

export const assetService = {
  async getAssets(filters: AssetFilters): Promise<PaginatedResult<Asset>> {
    const { data } = await axiosClient.get('/assets', { params: filters });
    return data;
  },
  async getAsset(id: string): Promise<Asset> {
    const { data } = await axiosClient.get(`/assets/${id}`);
    return data;
  },
  async getAssetTimeline(id: string): Promise<AssetTimelineEvent[]> {
    const { data } = await axiosClient.get(`/assets/${id}/timeline`);
    return data;
  },
  async createAsset(payload: Partial<Asset>): Promise<Asset> {
    const { data } = await axiosClient.post('/assets', payload);
    return data;
  },
  async updateAsset(id: string, payload: Partial<Asset>): Promise<Asset> {
    const { data } = await axiosClient.put(`/assets/${id}`, payload);
    return data;
  },
  async deleteAsset(id: string): Promise<void> {
    await axiosClient.delete(`/assets/${id}`);
  },
  async bulkImport(file: File): Promise<{ imported: number; failed: number }> {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await axiosClient.post('/assets/bulk-import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
  async bulkExport(filters: AssetFilters): Promise<Blob> {
    const { data } = await axiosClient.get('/assets/bulk-export', {
      params: filters,
      responseType: 'blob',
    });
    return data;
  },
};
