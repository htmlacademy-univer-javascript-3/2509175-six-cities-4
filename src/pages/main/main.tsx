import { useState } from 'react';
import Map from '../../components/location/map';
import { useAppSelector } from '../../hooks/use-store';
import { OfferProps } from '../../types/offer';
import { City } from '../../types/location';
import OffersSort from '../../components/offers-sort/offers-sort';
import LoadingSpinner from '../loading/spinner';
import ListLocations from './list-locations';
import ListOffers from './list-offers';


export default function MainScreen({ locations }: { locations: City[] }): JSX.Element {
  const isLoading = useAppSelector((state) => state.isLoading);
  const currentLocation = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers.filter((offer) => offer.city.name === currentLocation.title));

  const [activeOffer, setActiveOffer] = useState<OfferProps | undefined>(undefined);

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
            <Map selectedOffer={activeOffer} city={currentLocation} mapOffers={offers} page='cities'/>
          </div>
        </div>
      </div>
    </main>
  );
}
