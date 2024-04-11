import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyle from './styles/GlobalStyles';
import Router from './shared/Router';
import { Div1, Div4, Flex, Flex2 } from './pages/main/Main';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />

      <Flex2>
        <Flex>
          <Div1></Div1>
          <Div4>
            <Router />
          </Div4>
        </Flex>
      </Flex2>
    </QueryClientProvider>
  );
}
export default App;
