import { fetcher } from './fetcher';

export interface PurchaseFrequency {
  range: string;
  count: number;
}
interface GetPurchaseFrequencyParams {
  from?: string;
  to?: string;
  [key: string]: string | number | boolean | null | undefined;
}
type PurchaseFrequencyResponse = PurchaseFrequency[];

export const getPurchaseFrequency = (params?: GetPurchaseFrequencyParams) => {
  return fetcher.get<PurchaseFrequencyResponse>({
    path: '/purchase-frequency',
    query: params,
  });
};

interface Purchase {
  date: string;
  customerName: string;
  productName: string;
  price: number;
  quantity: number;
}
interface GetPurchasesParams {
  from?: string;
  to?: string;
  [key: string]: string | number | boolean | null | undefined;
}
export type PurchaseResponse = Purchase[];

export const getPurchases = (params?: GetPurchasesParams) => {
  return fetcher.get<PurchaseResponse>({
    path: '/purchases',
    query: params,
  });
};
