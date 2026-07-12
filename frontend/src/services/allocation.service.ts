import { axiosClient } from '@/services/api/axiosClient';
import type { Allocation, BookingSlot } from '@/types/allocation.types';

export const allocationService = {
  async getAllocations(): Promise<Allocation[]> {
    const { data } = await axiosClient.get('/allocations');
    return data;
  },
  async getBookings(): Promise<BookingSlot[]> {
    const { data } = await axiosClient.get('/allocations/bookings');
    return data;
  },
  async approve(id: string): Promise<void> {
    await axiosClient.post(`/allocations/${id}/approve`);
  },
  async reject(id: string): Promise<void> {
    await axiosClient.post(`/allocations/${id}/reject`);
  },
  async returnAsset(id: string): Promise<void> {
    await axiosClient.post(`/allocations/${id}/return`);
  },
};
