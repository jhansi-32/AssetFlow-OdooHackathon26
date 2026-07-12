import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { assetService } from '@/services/asset.service';
import type { Asset, AssetFilters } from '@/types/asset.types';
import { toast } from 'sonner';

export function useAssets(filters: AssetFilters) {
  return useQuery({
    queryKey: ['assets', filters],
    queryFn: () => assetService.getAssets(filters),
    placeholderData: (prev) => prev,
  });
}

export function useAsset(id: string) {
  return useQuery({ queryKey: ['assets', id], queryFn: () => assetService.getAsset(id), enabled: !!id });
}

export function useAssetTimeline(id: string) {
  return useQuery({
    queryKey: ['assets', id, 'timeline'],
    queryFn: () => assetService.getAssetTimeline(id),
    enabled: !!id,
  });
}

export function useAssetMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ['assets'] });

  const create = useMutation({
    mutationFn: (payload: Partial<Asset>) => assetService.createAsset(payload),
    onSuccess: () => {
      invalidate();
      toast.success('Asset created');
    },
    onError: () => toast.error('Could not create asset'),
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Asset> }) =>
      assetService.updateAsset(id, payload),
    onSuccess: () => {
      invalidate();
      toast.success('Asset updated');
    },
    onError: () => toast.error('Could not update asset'),
  });

  const remove = useMutation({
    mutationFn: (id: string) => assetService.deleteAsset(id),
    onSuccess: () => {
      invalidate();
      toast.success('Asset deleted');
    },
    onError: () => toast.error('Could not delete asset'),
  });

  return { create, update, remove };
}
