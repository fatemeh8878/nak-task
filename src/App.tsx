import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./routes/Routes";
import { GlobalStyles } from "./styles/GlobalStyles";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <AppRouter />
    </QueryClientProvider>
  );
};

export default App;
