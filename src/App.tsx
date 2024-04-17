import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyle from './styles/GlobalStyles';
import { Outlet } from 'react-router-dom';
import Router from './shared/Router.tsx';
// import Router from './shared/Router';
// import { Div1, Div4, Flex, Flex2 } from './pages/main/Main';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />

      {/*<Flex2>*/}
      {/*  <Flex>*/}
      {/*    /!* <Div1></Div1> *!/*/}
      {/*    <Div4>*/}
      {/*<Outlet />*/}
      <Router />
      {/*      </Div4>*/}
      {/*    </Flex>*/}
      {/*  </Flex2>*/}
    </QueryClientProvider>
  );
}
export default App;
