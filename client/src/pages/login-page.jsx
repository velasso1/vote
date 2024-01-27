import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/slices/user";
import { setUser } from "../store/slices/user";

const LoginPage = () => {
  const [userData, setUserData] = useState({
    login: "",
    password: "",
  });

  const dispatch = useDispatch();

  const enter = (e) => {
    e.preventDefault();

    dispatch(signIn(userData));
    dispatch(setUser({ login: "lvogin", token: "2111" }));
  };

  return (
    <>
      <div className="login">
        <form onSubmit={(e) => enter(e)} className="login__form">
          <input
            className="login__input"
            placeholder="введите логин"
            value={userData.login}
            onChange={(e) =>
              setUserData({ ...userData, login: `${e.target.value.trim()}` })
            }
          />
          <input
            className="login__input"
            placeholder="введите пароль"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: `${e.target.value.trim()}` })
            }
            type="password"
          />
          <button className="login__button">Войти</button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
