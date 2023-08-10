import './App.css';
import { useAtom } from 'jotai';

import { LoginPage } from './Components/LoginPage';
import LoginStore from './Stores/LoginStore';
import Main from './Components/Main';

function App() {
  const [isLoggedIn] = useAtom(LoginStore.loginStatus);

  return <>{isLoggedIn ? <Main /> : <LoginPage />}</>;
}

export default App;
