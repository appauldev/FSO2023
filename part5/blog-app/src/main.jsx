import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Notifications } from '@mantine/notifications';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Notifications position="bottom-center" limit={4} />
    <App />
  </React.StrictMode>
);
