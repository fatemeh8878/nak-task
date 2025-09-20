// Common API types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginationParams {
  page?: number;
  perPage?: number;
  limit?: number;
  offset?: number;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

// Auth types
export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email?: string;
  avatar?: string;
}

// Product types
export interface ProductAttribute {
  name: string;
  values: string[];
}

export interface Product extends Record<string, unknown> {
  id?: string;
  _id?: string;
  name: string;
  description?: string;
  skus?: string[];
  skusIds?: string[];
  attributes: ProductAttribute[];
  createdAt?: string;
  updatedAt?: string;
  countOfSkus?: number;
}

// Attribute types
export interface Attribute extends Record<string, unknown> {
  _id?: string;
  id?: string;
  name: string;
  values: string[];
  createdAt?: string;
  updatedAt?: string;
}

// SKU types
export interface Sku extends Record<string, unknown> {
  _id?: string;
  id?: string;
  model: string;
  price: string;
  numberInStock: string;
  productId?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Error types
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
}
