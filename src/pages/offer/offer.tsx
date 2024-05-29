import { useParams, Link } from 'react-router-dom';
import ReviewForm from '../../components/review-form/review-form';
import { OfferInfo } from '../../components/offer/offer';
import { OfferProps, OfferReview, OfferWithDetailsProps } from '../../types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { addFavoriteOffer, fetchOfferById, fetchOfferReviews, fetchOffersNearby } from '../../store/action';
import { useEffect } from 'react';
import NotFound from '../../components/errors/404';
import LoadingSpinner from '../loading/spinner';
import { UserAuthState } from '../../components/private-route/userAuthState';
import Header from '../../components/header/header';

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

function Review({review}: {review: OfferReview}): JSX.Element {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: review.rating * 20 }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={review.date}>{new Date(review.date).toDateString()}</time>
      </div>
    </li>
  );
}

function Reviews({reviews, id} : {reviews: OfferReview[]; id: string}): JSX.Element {
  const isUserAuth = useAppSelector((state) => state.userAuthState) === UserAuthState.Auth;
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => <Review review={review} key={review.id}/>)}
      </ul>
      {isUserAuth && <ReviewForm id={id} />}
    </section>
  );
}

function NearPlace(offer: OfferProps): JSX.Element {
  const offerLink = `/offer/${offer.id}`;
  return (
    <article className="near-places__card place-card">
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <Link to={offerLink}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <OfferInfo offer={offer} offerLink={offerLink} />
    </article>
  );
}

function ListNearPlaces({offers} : {offers: OfferProps[]}): JSX.Element {
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {
            offers.map((place) => (<NearPlace {...place} key={place.id}/>))
          }
        </div>
      </section>
    </div>
  );
}

function ListGoods({ goods }: OfferWithDetailsProps): JSX.Element {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {
          goods.map((good) => (<li className="offer__inside-item" key={good}>{good}</li>))
        }
      </ul>
    </div>
  );
}

function ListFeatures(offer: OfferWithDetailsProps): JSX.Element {
  return (
    <ul className="offer__features">
      {
        offer.type && <li className="offer__feature offer__feature--entire">{offer.type}</li>
      }
      {
        offer.maxAdults > 0 && <li className="offer__feature offer__feature--adults">Max {offer.maxAdults} adults</li>
      }
      {
        offer.bedrooms > 0 && <li className="offer__feature offer__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
      }
    </ul>
  );
}

function ListOfferPhotos({ images }: OfferWithDetailsProps): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {
          images.map((image) => (
            <div className="offer__image-wrapper" key={image}>
              <img className="offer__image" src={image} alt="Photo studio" />
            </div>))
        }
      </div>
    </div>
  );
}

export default function OfferDetailed(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.isLoading);
  const offer = useAppSelector((state) => state.currentOffer);
  const offersNearby = useAppSelector((state) => state.offersNearby);
  const offerReviews = useAppSelector((state) => state.offerReviews);

  const onAddOfferToFavorite = (o: OfferProps) => {
    dispatch(addFavoriteOffer({ id: o.id, status: o.isFavorite ? 0 : 1 }));
  };

  useEffect(() => {
    dispatch(fetchOfferById(id ?? ''));
    dispatch(fetchOffersNearby(id ?? ''));
    dispatch(fetchOfferReviews(id ?? ''));
  }, [dispatch, id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if(!offer) {
    return <NotFound/>;
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <ListOfferPhotos {...offer} />
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
              <Reviews reviews={offerReviews ?? []} id={id ?? ''} />
            </div>
          </div>
          <section className="offer__map map"></section>
        </section>
        <ListNearPlaces offers={offersNearby ?? []}/>
      </main>
    </div >
  );
}
