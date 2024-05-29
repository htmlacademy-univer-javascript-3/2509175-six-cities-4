import { useEffect, useState } from 'react';
import cn from 'classnames';
import Offer from '../../components/offer/offer';
import Map from '../../components/location/map';
import { fetchOffers, pickCity } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { OfferProps } from '../../types/offer';
import { City, Point } from '../../types/location';
import OffersSort from '../../components/offers-sort/offers-sort';
import { SortStrategy } from '../../components/offers-sort/sort-strategy';
import LoadingSpinner from '../loading/spinner';

type LocationItemProps = {
  title: string;
  isActive: boolean;
  onClick: (city: string) => void;
};


function LocationItem(props: LocationItemProps): JSX.Element {
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
  const currentLocation: City = useAppSelector((state) => state.city);
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
              }}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

function ListOffers({ offers, setActiveOffer }: { offers: OfferProps[]; setActiveOffer: (arg0: OfferProps) => void }): JSX.Element {
  const selectedSortStrategy: SortStrategy = useAppSelector((state) => state.sortStrategy);
  const offersSorted = [...offers];

  switch (selectedSortStrategy) {
    case SortStrategy.PriceAsc:
      offersSorted.sort((a, b) => Number(a.price) - Number(b.price));
      break;
    case SortStrategy.PriceDesc:
      offersSorted.sort((a, b) => Number(b.price) - Number(a.price));
      break;
    case SortStrategy.Rating:
      offersSorted.sort((a, b) => Number(b.rating) - Number(a.rating));
      break;
  }
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offersSorted.map((e) => (
          <Offer offer={e} setState={() => setActiveOffer(e)} key={e.id} />
        ))
      }
    </div>
  );
}

function GetPointFromOffer(offer: OfferProps | undefined): Point | undefined {
  return offer && (
    {
      latitude: offer.location.latitude,
      longitude: offer.location.longitude,
      title: offer.id
    }
  );
}

export default function MainScreen({ locations }: { locations: City[] }): JSX.Element {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.isLoading);
  const currentLocation = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers.filter((offer) => offer.city.name === currentLocation.title));

  const [activeOffer, setActiveOffer] = useState<OfferProps | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch, currentLocation]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="page__main page__main--index">
      <ListLocations locations={locations} />
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {currentLocation.title}</b>
            <OffersSort />
            <ListOffers offers={offers} setActiveOffer={setActiveOffer} />
          </section>
          <div className="cities__right-section">
            <Map selectedPoint={GetPointFromOffer(activeOffer)} city={currentLocation} points={offers.map((offer) => GetPointFromOffer(offer)).filter((p) => !!p).map((p) => p as Point)} />
          </div>
        </div>
      </div>
    </main>
  );
}
