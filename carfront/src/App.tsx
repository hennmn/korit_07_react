import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Carlist from "./components/Carlist";

const queryClient = new QueryClient();

function App() {
  return (
    // meterial 어쩌구라고 css를 편하게 사용하기 위해서 미리 짜놓아진 거...?  이게 MUI
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Car Shop</Typography>
        </Toolbar>
      </AppBar>
      {/* useQuery는 이 밑에 감싸는 용도로 씀. 복습 필요 */}
      <QueryClientProvider client={queryClient}>
        <Carlist />
      </QueryClientProvider>
    </Container>
  );
}

export default App;
