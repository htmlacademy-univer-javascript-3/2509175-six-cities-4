import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/components/app/app';
import { Locations } from './components/location/location';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App locations={Locations}/>
  </React.StrictMode>
);

