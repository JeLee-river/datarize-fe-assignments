type QueryParams = Record<string, string | number | boolean | null | undefined>;

interface FetcherOptions {
  path: string;
  query?: QueryParams;
}

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const fetcher = {
  get: <T>({ path, query }: FetcherOptions): Promise<T> => {
    return request(convertUrl(path, query));
  },
};

const request = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    let errorMessage = `에러가 발생했습니다. 상태: ${response.status}`;

    try {
      const errorData = await response.json();
      if (errorData?.message) {
        errorMessage = errorData.message;
      }
    } catch (error) {
      console.warn('에러 응답 파싱 실패:', error);
    }

    throw new Error(errorMessage);
  }

  return response.json();
};

const convertUrl = (path: string, params?: QueryParams) => {
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const url = new URL(path.startsWith('/') ? path.slice(1) : path, base);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return;
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
};
