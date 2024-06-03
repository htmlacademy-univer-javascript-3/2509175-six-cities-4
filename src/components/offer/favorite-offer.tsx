import { Link } from 'react-router-dom';
import { OfferProps } from '../../types/offer';
import { useAppDispatch } from '../../hooks/use-store';
import { addFavoriteOffer, fetchFavoriteOffers } from '../../store/offer-actions';
import BookmarkButton from './bookmark-button';
import { Premium } from './offer';


export default function FavoriteOffer({ offer }: { offer: OfferProps }): JSX.Element {
  const dispatch = useAppDispatch();

  const onRemoveFromFavorite = () => {
    dispatch(addFavoriteOffer({ id: offer.id, status: 0 }));
    dispatch(fetchFavoriteOffers());
  };

  const offerLink = `/offer/${offer.id}`;

  return (
    <article className="favorites__card place-card">
      <Premium {...offer}/>
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={offerLink}>
          <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span
              className="place-card__price-text"
            >&#47;&nbsp;night
            </span>
          </div>
          <BookmarkButton isFavorite={offer.isFavorite} onClick={onRemoveFromFavorite} />
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
    </article>
  );
}
