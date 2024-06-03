import React from 'react';
import { Link } from 'react-router-dom';
import { OfferProps } from '../../types/offer';
import { useAppDispatch } from '../../hooks/use-store';
import { addFavoriteOffer } from '../../store/offer-actions';
import BookmarkButton from './bookmark-button';


function OfferInfo({ offer, offerLink }: { offer: OfferProps; offerLink: string }): JSX.Element {
  const dispatch = useAppDispatch();

  const onAddOfferToFavorite = () => {
    dispatch(addFavoriteOffer({ id: offer.id, status: offer.isFavorite ? 0 : 1 }));
  };

  return (
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offer.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <BookmarkButton isFavorite={offer.isFavorite} onClick={onAddOfferToFavorite} />
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{ width: offer.rating * 20 }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={offerLink}>
          {offer.title}
        </Link>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  );
}

export default React.memo(OfferInfo);
