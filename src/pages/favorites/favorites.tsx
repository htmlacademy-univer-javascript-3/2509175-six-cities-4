import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { useEffect } from 'react';
import { fetchFavoriteOffers } from '../../store/offer-actions';
import Header from '../../components/header/header';
import ListFavoriteOffers from './list-favorite-offers';


export default function Favorites(): JSX.Element {
  const dispatch = useAppDispatch();

  const favoriteOffers = useAppSelector((state) => state.favoriteOffers) ?? [];

  useEffect(() => {
    dispatch(fetchFavoriteOffers());
  }, [dispatch]);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ListFavoriteOffers offers={favoriteOffers} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="markup/main.html">
          <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo"
            width="64" height="33"
          />
        </a>
      </footer>
    </div>
  );
}
