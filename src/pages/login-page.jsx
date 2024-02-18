import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/slices/user";
import { setUser } from "../store/slices/user";
import { useNavigate } from "react-router-dom";
import { checkExpiresToken } from "../store/slices/user";
import Loader from "../components/ui/loader";

const LoginPage = () => {
  const [userData, setUserData] = useState({
    login: "",
    password: "",
  });
  const [state, setState] = useState({
    empty: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isAuth, statusLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkExpiresToken());

    if (isAuth) navigate("/events");
  }, [isAuth, dispatch, navigate]);

  const enter = (e) => {
    e.preventDefault();
    setState({ empty: false });

    if (!userData.login || !userData.password) {
      setState({ empty: true });
      return;
    }

    dispatch(signIn(userData));
    dispatch(
      setUser({ login: `${userData.login}`, password: `${userData.password}` })
    );
  };

  return (
    <>
      <div className="login">
        {statusLoading && <Loader />}
        <form onSubmit={(e) => enter(e)} className="login__form">
          <input
            disabled={statusLoading}
            className="login__input"
            placeholder="Введите логин"
            value={userData.login}
            onChange={(e) =>
              setUserData({ ...userData, login: `${e.target.value.trim()}` })
            }
          />
          <input
            disabled={statusLoading}
            className="login__input"
            placeholder="Введите пароль"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: `${e.target.value.trim()}` })
            }
            type="password"
          />
          <button disabled={statusLoading} className="login__button">
            Войти
          </button>
          {error && (
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
