import { createRoot } from 'react-dom/client';
import { App } from './app.tsx';
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/main.scss';
import '@/model/init.ts';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
