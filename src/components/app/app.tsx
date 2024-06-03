import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainScreen from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer-detailed/offer-detailed';
import NotFound from '../errors/404';
import { PrivateRoute } from '../private-route/private-route';
import { Provider } from 'react-redux';
import { City } from '../../types/location';
import { store } from '../../store';

export default function App(props: { locations: City[] }): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainScreen {...props} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/favorites' element={<PrivateRoute><Favorites /></PrivateRoute>} />
          <Route path='/offer/:id' element={<Offer />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
