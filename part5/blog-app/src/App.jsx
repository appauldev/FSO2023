import './App.css';
import { useAtom } from 'jotai';

import { LoginPage } from './Components/LoginPage';
import LoginStore from './Stores/LoginStore';
import BlogHomePage from './Components/BlogHomePage';

function App() {
  const [isLoggedIn] = useAtom(LoginStore.loginStatus);

  return <>{isLoggedIn ? <BlogHomePage /> : <LoginPage />}</>;
}

export default App;
