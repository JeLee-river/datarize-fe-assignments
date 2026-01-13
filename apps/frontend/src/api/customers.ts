import { fetcher } from './fetcher';

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface Customer {
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

interface CustomerPurchase {
  date: string;
  quantity: number;
  product: string;
  price: number;
  imgSrc: string;
}
type GetCustomerPurchaseResponse = CustomerPurchase[];

export const getCustomerPurchases = (customerId: number) => {
  return fetcher.get<GetCustomerPurchaseResponse>({
    path: `/customers/${customerId}/purchases`,
  });
};
