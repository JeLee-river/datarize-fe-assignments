import { fetcher } from './fetcher';

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Customer {
  id: number;
  name: string;
  count: number;
  totalAmount: number;
}
interface GetCustomersParams {
  sortBy?: 'asc' | 'desc';
  name?: string;
  page?: number;
  limit?: number;
  from?: string;
  to?: string;
  [key: string]: string | number | boolean | null | undefined;
}
interface GetCustomersResponse {
  data: Customer[];
  pagination: Pagination;
}

export const getCustomers = (params?: GetCustomersParams) => {
  return fetcher.get<GetCustomersResponse>({
    path: '/customers',
    query: params,
  });
};

export interface CustomerPurchase {
  date: string;
  quantity: number;
  product: string;
  price: number;
  imgSrc: string;
}
type GetCustomerPurchaseResponse = CustomerPurchase[];

interface GetCustomerPurchasesParams {
  from?: string;
  to?: string;
  [key: string]: string | number | boolean | null | undefined;
}

export const getCustomerPurchases = (customerId: number, params?: GetCustomerPurchasesParams) => {
  return fetcher.get<GetCustomerPurchaseResponse>({
    path: `/customers/${customerId}/purchases`,
    query: params,
  });
};
