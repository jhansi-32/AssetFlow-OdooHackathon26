import { PaginationMeta } from '../interfaces/apiResponse.interface';

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface NormalizedPagination {
  skip: number;
  take: number;
  page: number;
  limit: number;
  orderBy: Record<string, 'asc' | 'desc'> | undefined;
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export function normalizePagination(q: PaginationQuery): NormalizedPagination {
  const page = Math.max(Number(q.page) || DEFAULT_PAGE, 1);
  const limit = Math.min(Math.max(Number(q.limit) || DEFAULT_LIMIT, 1), MAX_LIMIT);
  const skip = (page - 1) * limit;
  const orderBy = q.sortBy ? { [q.sortBy]: q.sortOrder === 'desc' ? 'desc' : 'asc' } as Record<string, 'asc' | 'desc'> : undefined;

  return { skip, take: limit, page, limit, orderBy };
}

export function buildPaginationMeta(total: number, page: number, limit: number): PaginationMeta {
  return { page, limit, total, totalPages: Math.max(Math.ceil(total / limit), 1) };
}
