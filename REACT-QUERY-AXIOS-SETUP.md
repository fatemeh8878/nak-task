# React Query & Axios Setup Guide

This project has been configured with React Query (TanStack Query) and Axios for efficient data fetching and state management.

## 🚀 What's Been Set Up

### 1. Dependencies Installed

- `@tanstack/react-query` - For server state management
- `@tanstack/react-query-devtools` - For debugging queries
- `axios` - For HTTP requests

### 2. Configuration Files

#### API Configuration (`src/services/api.ts`)

- Axios instance with base configuration
- Request/response interceptors for authentication
- Automatic token handling
- Error handling for 401 responses

#### Query Client (`src/services/queryClient.ts`)

- Configured with optimal defaults
- Smart retry logic
- Cache management settings

### 3. Service Layer

#### Authentication Service (`src/services/authService.ts`)

- Login/Register/Logout functions
- Profile management
- Token refresh

#### Product Service (`src/services/productService.ts`)

- CRUD operations for products
- Pagination support
- Search functionality

#### Attribute Service (`src/services/attributeService.ts`)

- CRUD operations for attributes
- Type-safe attribute management

### 4. Custom Hooks

#### Authentication Hook (`src/hooks/useAuth.ts`)

```typescript
const {
  user,
  isAuthenticated,
  login,
  register,
  logout,
  isLoggingIn,
  loginError,
} = useAuth();
```

#### Product Hooks (`src/hooks/useProducts.ts`)

```typescript
// Fetch products with pagination
const { data, isLoading, error } = useProducts(page, limit, search);

// Create product
const createProduct = useCreateProduct();

// Update product
const updateProduct = useUpdateProduct();

// Delete product
const deleteProduct = useDeleteProduct();
```

#### Attribute Hooks (`src/hooks/useAttributes.ts`)

```typescript
// Similar pattern to products
const { data, isLoading, error } = useAttributes(page, limit, search);
const createAttribute = useCreateAttribute();
// ... etc
```

## 🔧 Environment Setup

Create a `.env` file in your project root:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 📝 Usage Examples

### 1. Authentication

```typescript
import { useAuth } from "../hooks";

const LoginPage = () => {
  const { login, isLoggingIn, loginError } = useAuth();

  const handleLogin = (credentials) => {
    login(credentials);
  };

  return (
    <form onSubmit={handleLogin}>
      {/* form fields */}
      <button disabled={isLoggingIn}>
        {isLoggingIn ? "Signing In..." : "Sign In"}
      </button>
      {loginError && <div>Error: {loginError.message}</div>}
    </form>
  );
};
```

### 2. Data Fetching

```typescript
import { useProducts } from "../hooks";

const ProductsPage = () => {
  const { data, isLoading, error, refetch } = useProducts(1, 10, "search term");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};
```

### 3. Mutations

```typescript
import { useCreateProduct } from "../hooks";

const AddProductForm = () => {
  const createProduct = useCreateProduct();

  const handleSubmit = (productData) => {
    createProduct.mutate(productData, {
      onSuccess: () => {
        // Handle success
        console.log("Product created!");
      },
      onError: (error) => {
        // Handle error
        console.error("Failed to create product:", error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={createProduct.isPending}>
        {createProduct.isPending ? "Creating..." : "Create Product"}
      </button>
    </form>
  );
};
```

## 🛠️ Key Features

### 1. Automatic Caching

- Queries are automatically cached
- Smart invalidation on mutations
- Background refetching

### 2. Loading States

- Built-in loading indicators
- Optimistic updates
- Error handling

### 3. Type Safety

- Full TypeScript support
- Type-safe API responses
- IntelliSense support

### 4. DevTools

- React Query DevTools included
- Debug queries in development
- Monitor cache state

## 🔄 Query Invalidation

The hooks automatically invalidate related queries when mutations occur:

```typescript
// When you create a product, the products list will automatically refetch
const createProduct = useCreateProduct();
createProduct.mutate(newProduct); // Products list updates automatically
```

## 🎯 Best Practices

1. **Use the custom hooks** instead of calling services directly
2. **Handle loading and error states** in your components
3. **Use optimistic updates** for better UX
4. **Leverage the cache** - don't refetch unnecessarily
5. **Use the DevTools** for debugging

## 🚨 Error Handling

The setup includes comprehensive error handling:

- Network errors are automatically retried
- 401 errors trigger automatic logout
- User-friendly error messages
- Fallback UI for error states

## 📱 React Query DevTools

In development, you can access the React Query DevTools to:

- Monitor all queries and mutations
- Inspect cache contents
- Manually trigger refetches
- Debug query states

The DevTools are automatically included and will appear in the bottom-left corner of your app in development mode.

## 🔧 Customization

You can customize the query client configuration in `src/services/queryClient.ts`:

```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Adjust cache time
      retry: 3, // Adjust retry count
      // ... other options
    },
  },
});
```

This setup provides a robust foundation for data fetching and state management in your React application!
