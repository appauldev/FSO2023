import './App.css';
import { useAtom } from 'jotai';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import LoginPage from './Components/LoginPage';
import LoginStore from './Stores/LoginStore';
import Main from './Components/Main';

function App() {
  const queryClient = new QueryClient();

  const [isLoggedIn] = useAtom(LoginStore.loginStatus);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {isLoggedIn ? <Main /> : <LoginPage />}
      </QueryClientProvider>
    </>
  );
}

export default App;
