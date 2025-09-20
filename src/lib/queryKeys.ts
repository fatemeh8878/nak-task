// Centralized query keys for better cache management
export const queryKeys = {
  // Auth related queries
  auth: {
    profile: ["auth", "profile"] as const,
  },

  // Product related queries
  products: {
    all: ["products"] as const,
    lists: () => [...queryKeys.products.all, "list"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.products.lists(), params] as const,
    details: () => [...queryKeys.products.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
  },

  // Attribute related queries
  attributes: {
    all: ["attributes"] as const,
    lists: () => [...queryKeys.attributes.all, "list"] as const,
    list: () => [...queryKeys.attributes.lists()] as const,
    details: () => [...queryKeys.attributes.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.attributes.details(), id] as const,
  },

  // SKU related queries
  skus: {
    all: ["skus"] as const,
    lists: () => [...queryKeys.skus.all, "list"] as const,
    list: () => [...queryKeys.skus.lists()] as const,
    details: () => [...queryKeys.skus.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.skus.details(), id] as const,
  },
} as const;

