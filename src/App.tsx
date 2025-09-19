import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./routes/Routes";
import AuthAppRouter from "./routes/Routes-auth";
import { useAuthStore } from "./stores/authStore";
import { GlobalStyles } from "./styles/GlobalStyles";

const App = () => {
  const queryClient = new QueryClient();
  const { isAuthenticated } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />

      {isAuthenticated ? <AppRouter /> : <AuthAppRouter />}
    </QueryClientProvider>
  );
};

export default App;
