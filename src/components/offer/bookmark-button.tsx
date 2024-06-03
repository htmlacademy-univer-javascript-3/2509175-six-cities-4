export default function BookmarkButton({ isFavorite, onClick }: { isFavorite: boolean; onClick: () => void }) {
  const className = isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button';
  return (
    <button className={className} type="button" onClick={onClick}>
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
    </button>
  );
}
