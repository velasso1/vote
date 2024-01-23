import React from "react";

const LoginPage = () => {
  const login = (e) => {
    e.preventDefault();
    console.log("click");
  };

  return (
    <>
      <div className="login">
        <form onSubmit={(e) => login(e)} className="login__form">
          <input
            className="login__input"
            placeholder="введите логин"
            type="email"
          />
          <input
            className="login__input"
            placeholder="введите пароль"
            type="password"
          />
          <button className="login__button">Войти</button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
