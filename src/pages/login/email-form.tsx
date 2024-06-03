import React from 'react';

function EmailForm({email, handleEmailChange} : { email : string; handleEmailChange: (_: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="login__input-wrapper form__input-wrapper">
      <label className="visually-hidden">E-mail</label>
      <input
        className="login__input form__input"
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        required
      />
    </div>
  );
}

export default React.memo(EmailForm);
