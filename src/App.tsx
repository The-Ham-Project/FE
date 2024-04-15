import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyle from './styles/GlobalStyles';
import Router from './shared/Router';
import { Div1, Div4, Flex, Flex2 } from './pages/main/Main';
import NavigationBar from './components/layout/NavigationBar';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <GlobalStyle />

    <Flex2>
      <Flex>
        <Div4>

          <Router />
        </Div4>
      </Flex>
    </Flex2>
  </QueryClientProvider>
  );
}
export default App;
