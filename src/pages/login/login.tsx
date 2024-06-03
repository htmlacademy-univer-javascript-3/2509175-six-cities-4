import { FormEvent, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../store/auth-actions';
import { UserAuthState } from '../../components/private-route/userAuthState';
import { store } from '../../store';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-store';
import PasswordForm from './password-form';
import EmailForm from './email-form';

function LoginHeader() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to='/' >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authorizationStatus = useAppSelector((state) => state.userAuthState);

  const handleEmailChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(evt.target.value);
    }, []);

  const handlePasswordChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(evt.target.value);
    }, []);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    store.dispatch(auth({ email, password }));
  };

  if (authorizationStatus === UserAuthState.Auth) {
    return <Navigate to='/' />;
  }

  return (
    <div className="page page--gray page--login">
      <LoginHeader />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <EmailForm email={email} handleEmailChange={handleEmailChange} />
              <PasswordForm password={password} handlePasswordChange={handlePasswordChange}/>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default React.memo(Login);
