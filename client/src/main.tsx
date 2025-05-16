
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './components/ThemeProvider';
import './styles/globals.css';
import './styles/auth.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="freelance-hub-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
