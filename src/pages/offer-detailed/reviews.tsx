import { useAppSelector } from '../../hooks/use-store';
import { OfferReview } from '../../types/offer';
import { UserAuthState } from '../../components/private-route/userAuthState';
import ReviewForm from '../../components/review-form/review-form';


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

export default function Reviews({reviews, id} : {reviews: OfferReview[]; id: string}): JSX.Element {
  const isUserAuth = useAppSelector((state) => state.userAuthState) === UserAuthState.Auth;

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {[...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10).map((review) => <Review review={review} key={review.id}/>)}
      </ul>
      {isUserAuth && <ReviewForm id={id} />}
    </section>
  );
}
