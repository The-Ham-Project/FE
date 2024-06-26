import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyle from './styles/GlobalStyles';
import Router from './shared/Router.tsx';
// import Router from './shared/Router';
// import { Div1, Div4, Flex, Flex2 } from './pages/main/Main';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Router />
    </QueryClientProvider>
  );
}
export default App;
