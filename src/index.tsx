import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/components/app/app';
import { DefaultOffers } from './params';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App count={10} />
  </React.StrictMode>
);

/*
root.render(
  <React.StrictMode>
    <App offers={DefaultOffers} />
  </React.StrictMode>
);
*/
