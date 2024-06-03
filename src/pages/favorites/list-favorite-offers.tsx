import React from 'react';
import { OfferProps } from '../../types/offer';
import FavoriteOffer from '../../components/offer/favorite-offer';
import { Locations } from '../../components/location/location';


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

export default React.memo(ListFavoriteOffers);
