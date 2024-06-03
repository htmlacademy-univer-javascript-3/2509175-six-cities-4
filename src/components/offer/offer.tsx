import React from 'react';
import { Link } from 'react-router-dom';
import { OfferProps } from '../../types/offer';
import OfferInfo from './offer-info';

export function Premium({ isPremium }: OfferProps): false | JSX.Element {
  return (
    isPremium && (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    )
  );
}

function Offer({ offer, setState }: { offer: OfferProps; setState: () => void }): JSX.Element {
  const offerLink = `/offer/${offer.id}`;
  return (
    <article className="cities__card place-card" onMouseOver={setState}>
      <Premium {...offer} />
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={offerLink}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <OfferInfo offer={offer} offerLink={offerLink} />
    </article>
  );
}

export default React.memo(Offer, (prev, next) => prev.offer === next.offer);
