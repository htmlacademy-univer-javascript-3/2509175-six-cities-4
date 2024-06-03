import React from 'react';

function PasswordForm({password, handlePasswordChange} : { password : string; handlePasswordChange: (_: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="login__input-wrapper form__input-wrapper">
      <label className="visually-hidden">Password</label>
      <input
        className="login__input form__input"
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
    </div>

  );
}

export default React.memo(PasswordForm);
