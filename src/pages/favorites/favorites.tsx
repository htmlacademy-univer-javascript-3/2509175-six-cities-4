import { OfferProps } from '../../types/offer';
import { FavoriteOffer } from '../../components/offer/offer';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { useEffect } from 'react';
import { fetchFavoriteOffers } from '../../store/action';
import Header from '../../components/header/header';
import { Locations } from '../../data/location';


function ListCityFavoriteOffers({ offers }: { offers: OfferProps[] }): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{offers[0].city.name}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {
          offers.map((e) => (
            <FavoriteOffer offer={e} key={e.id}/>
          ))
        }
      </div>
    </li>
  );
}

function ListFavoriteOffers({ offers }: {offers: OfferProps[]}): JSX.Element {
  const offersByCity : Record<string, OfferProps[]> = offers.reduce<Record<string, OfferProps[]>>((res: Record<string, OfferProps[]>, a: OfferProps) => {
    res[a.city.name] = res[a.city.name] || [];
    res[a.city.name].push(a);
    return res;
  }, {});

  return (
    <ul className="favorites__list">
      {
        Locations.map((location) => offersByCity[location.title] && (
          <ListCityFavoriteOffers offers={offersByCity[location.title]} key={location.title}/>
        ))
      }
    </ul>
  );
}

function Favorites(): JSX.Element {
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

export default Favorites;
