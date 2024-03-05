import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/components/app/app';
import { DefaultCards } from './params';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App cards={DefaultCards} />
  </React.StrictMode>
);
