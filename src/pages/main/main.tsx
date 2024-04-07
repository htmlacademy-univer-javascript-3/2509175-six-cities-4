import { useState } from 'react';
import cn from 'classnames';
import Offer from '../../components/offer/offer';
import Map from '../../components/location/map';
import { filterOffers, pickCity } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { OfferProps } from '../../types/offer';
import { City, Point } from '../../types/location';

type LocationItemProps = {
  title: string;
  isActive: boolean;
  onClick: (city: string) => void;
};

function LocationItem(props: LocationItemProps) : JSX.Element {
  const { title, isActive, onClick } = props;
  const onClickCallback = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick(title);
  };

  return (
    <li className="locations__item">
      <a className={cn('locations__item-link', 'tabs__item', isActive && 'tabs__item--active')} onClick={onClickCallback}>
        <span>{title}</span>
      </a>
    </li>
  );
}

function ListLocations({ locations }: { locations: City[] }): JSX.Element {
  const currentLocation : City = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {locations.map((city) => (
            <LocationItem
              key={`${city.title}`}
              title={city.title}
              isActive={city.title === currentLocation.title}
              onClick={(cityName: string) => {
                dispatch(pickCity(locations.find((c) => c.title === cityName)!));
                dispatch(filterOffers());
              }}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

function ListOffers({ offers, setActiveOffer }: { offers: OfferProps[]; setActiveOffer: (arg0: OfferProps) => void }): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((e) => (
          <Offer offer={e} setState={() => setActiveOffer(e)} key={e.id} />
        ))
      }
    </div>
  );
}

function GetPointFromOffer(offer: OfferProps): Point {
  return (
    {
      latitude: offer.location.latitude,
      longitude: offer.location.longitude,
      title: offer.id
    }
  );
}

export default function MainScreen({ locations }: { locations: City[] }): JSX.Element {
  const currentLocation : City = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const [activeOffer, setActiveOffer] = useState(offers[0]);
  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <ListLocations locations={locations} />
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {currentLocation.title}</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>
            <ListOffers offers={offers} setActiveOffer={setActiveOffer} />
          </section>
          <div className="cities__right-section">
            <Map selectedPoint={GetPointFromOffer(activeOffer)} city={currentLocation} points={offers.map((offer) => GetPointFromOffer(offer))}/>
          </div>
        </div>
      </div>
    </main>
  );
}
