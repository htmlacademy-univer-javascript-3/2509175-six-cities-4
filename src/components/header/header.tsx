import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { unauth } from '../../store/action';
import { UserAuthState } from '../private-route/userAuthState';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector((state) => state.userInfo);
  const userAuthState = useAppSelector((state) => state.userAuthState);
  const allOffers = useAppSelector((state) => state.offers);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to='/' className="header__logo-link">
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            {userAuthState === UserAuthState.Auth ? (
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <NavLink className="header__nav-link header__nav-link--profile" to='/favorites'>
                    <div className="header__avatar-wrapper user__avatar-wrapper"><img src={userInfo?.avatarUrl} /></div>
                    <span className="header__user-name user__name">{userInfo?.email}</span>
                    <span className="header__favorite-count">{allOffers.filter((offer) => offer.isFavorite).length}</span>
                  </NavLink>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#" onClick={() => {
                    dispatch(unauth());
                  }}
                  >
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>) : (
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <NavLink className="header__nav-link header__nav-link--profile" to='/login'>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
