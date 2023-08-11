import './App.css';
import { useAtomValue } from 'jotai';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import LoginPage from './Components/LoginPage';
import LoginStore from './Stores/LoginStore';
import Main from './Components/Main';
import LoadingFullPage from './Components/LoadingFullPage';

function App() {
  const queryClient = new QueryClient();
  const isLoggedIn = useAtomValue(LoginStore.loginStatus);
  console.log('isLoggedIn', isLoggedIn);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {isLoggedIn ? (
          <Main />
        ) : window.localStorage.getItem('loginStatus') !== 'true' ? (
          <LoginPage />
        ) : (
          <LoadingFullPage />
        )}
      </QueryClientProvider>
    </>
  );
}

export default App;
