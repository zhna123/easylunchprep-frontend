import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, BuildStepProvider } from "./Context"
import Router from "./routes/Router"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BuildStepProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BuildStepProvider>
    </QueryClientProvider>
  )
}

export default App
