import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors except 408, 429
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          if (
            error?.response?.status === 408 ||
            error?.response?.status === 429
          ) {
            return failureCount < 2;
          }
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

// Query client utility functions
export const queryClientUtils = {
  // Invalidate all queries
  invalidateAll: () => {
    queryClient.invalidateQueries();
  },

  // Invalidate specific query keys
  invalidateQueries: (queryKey: string[]) => {
    queryClient.invalidateQueries({ queryKey });
  },

  // Clear all cache
  clearCache: () => {
    queryClient.clear();
  },

  // Prefetch data
  prefetchQuery: async (
    queryKey: string[],
    queryFn: () => Promise<unknown>
  ) => {
    await queryClient.prefetchQuery({ queryKey, queryFn });
  },
};
