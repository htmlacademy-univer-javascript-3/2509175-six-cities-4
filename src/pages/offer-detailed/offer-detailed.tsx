import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { addFavoriteOffer, fetchOfferById, fetchOfferReviews, fetchOffersNearby } from '../../store/offer-actions';
import { OfferProps, OfferWithDetailsProps } from '../../types/offer';
import NotFound from '../../components/errors/404';
import LoadingSpinner from '../loading/spinner';
import Header from '../../components/header/header';
import Map from '../../components/location/map';
import ListFeatures from './list-features';
import ListGoods from './list-goods';
import ListPhotos from './list-photos';
import ListNearPlaces from './list-near-places';
import Reviews from './reviews';


function Premium({ isPremium }: OfferWithDetailsProps): false | JSX.Element {
  return (
    isPremium && (
      <div className="offer__mark">
        <span>Premium</span>
      </div>
    )
  );
}

function Pro({ host }: OfferWithDetailsProps): false | JSX.Element {
  return (
    host.isPro && (
      <span className="offer__user-status">
        Pro
      </span>
    )
  );
}

function BookmarkButton({ isFavorite, onClick }: { isFavorite: boolean; onClick: () => void }) {
  const className = isFavorite ? 'offer__bookmark-button offer__bookmark-button--active button' : 'offer__bookmark-button button';
  return (
    <button className={className} type="button" onClick={onClick}>
      <svg className="offer__bookmark-icon" width="31" height="33">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
    </button>
  );
}

function Host(offer: OfferWithDetailsProps): JSX.Element {
  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
          <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
        </div>
        <span className="offer__user-name">
          {offer.host.name}
        </span>
        <Pro {...offer} />
      </div>
      <div className="offer__description">
        <p className="offer__text">
          A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
        </p>
        <p className="offer__text">
          An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
        </p>
      </div>
    </div>
  );
}

export default function OfferDetailed(): JSX.Element {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.isLoading);
  const offer = useAppSelector((state) => state.currentOffer);
  const offersNearby = useAppSelector((state) => state.offersNearby?.slice(0, 3) ?? []);
  const offerReviews = useAppSelector((state) => state.offerReviews);

  const onAddOfferToFavorite = (o: OfferProps) => {
    dispatch(addFavoriteOffer({ id: o.id, status: o.isFavorite ? 0 : 1 }));
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferById(id));
      dispatch(fetchOffersNearby(id));
      dispatch(fetchOfferReviews(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if(!id || !offer) {
    return <NotFound/>;
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <ListPhotos {...offer} />
          <div className="offer__container container">
            <div className="offer__wrapper">
              <Premium {...offer} />
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <BookmarkButton isFavorite={offer.isFavorite} onClick={() => onAddOfferToFavorite(offer)}/>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${offer.rating * 20 }%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ListFeatures {...offer} />
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <ListGoods {...offer} />
              <Host {...offer} />
              <Reviews reviews={offerReviews ?? []} id={id} />
            </div>
          </div>
          <Map city={{title: offer.city.name, ...offer.city.location}} mapOffers={[offer, ...offersNearby]} selectedOffer={offer} page='offer'/>
        </section>
        <ListNearPlaces offers={offersNearby}/>
      </main>
    </div >
  );
}
