import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Repositories from "./Repositories";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Repositories />
      </QueryClientProvider>
    </>
  );
}

export default App;
