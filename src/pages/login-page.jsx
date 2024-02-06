import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/slices/user";
import { setUser } from "../store/slices/user";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userData, setUserData] = useState({
    login: "",
    password: "",
  });
  const [state, setState] = useState({
    error: false,
    empty: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const enter = (e) => {
    e.preventDefault();

    // check for empty inputs
    if (!userData.login || !userData.password) {
      setState({ ...state, empty: true });
      return;
    }

    // simulate check for wrong login or password
    if (userData.login.length <= 0 || userData.password.length <= 0) {
      setState({ ...state, error: true });
      return;
    }

    dispatch(signIn(userData));
    dispatch(
      setUser({ login: `${userData.login}`, password: `${userData.password}` })
    );
    navigate("/events");
  };

  return (
    <>
      <div className="login">
        <form onSubmit={(e) => enter(e)} className="login__form">
          <input
            className="login__input"
            placeholder="Введите логин"
            value={userData.login}
            onChange={(e) =>
              setUserData({ ...userData, login: `${e.target.value.trim()}` })
            }
          />
          <input
            className="login__input"
            placeholder="Введите пароль"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: `${e.target.value.trim()}` })
            }
            type="password"
          />
          <button className="login__button">Войти</button>
          {state.error && (
            <div
              className="login__error"
              style={{ textAlign: "center", color: "red" }}
            >
              Неверный логин или пароль
            </div>
          )}

          {state.empty && (
            <div
              className="login__error"
              style={{ textAlign: "center", color: "red" }}
            >
              Не все поля заполнены
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPage;
