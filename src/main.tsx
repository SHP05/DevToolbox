import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ThemeModeProvider } from './app/ThemeModeContext';
import { App } from './app/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ThemeModeProvider>
        <App />
      </ThemeModeProvider>
    </HashRouter>
  </StrictMode>,
);
