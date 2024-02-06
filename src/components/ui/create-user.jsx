import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNewUser } from "../../store/slices/user";
import hide from "../../images/hide-pass.svg";
import Success from "../modals/success";

const CreateUser = () => {
  const [userData, setUserData] = useState({
    login: "",
    password: "",
  });

  const [state, setState] = useState({
    error: false,
    empty: false,
    sending: false,
  });

  const [hidePassword, setHidePassword] = useState(true);

  const dispatch = useDispatch();

  const createUser = () => {
    if (userData.login.length === 0 || userData.password.length === 0) {
      setState({ error: false, empty: true });
      return;
    }

    if (userData.password.length < 8) {
      setState({ error: true, empty: false });
      return;
    }

    dispatch(createNewUser(userData));
    setState({ ...state, sending: true });
    setTimeout(() => {
      setUserData({ login: "", password: "" });
      setState({ error: false, empty: false, sending: false });
    }, 3000);
  };

  return (
    <div className="create-user" style={{ opacity: 0.9 }}>
      <h1 className="create-user__title">Создание новой учетной записи</h1>
      <div className="create-event__info">
        <label htmlFor="login">Придумайте новый логин</label>
        <input
          disabled={state.sending}
          id="login"
          className="create-user__login"
          type="text"
          placeholder="Придумайте логин"
          value={userData.login}
          onChange={(e) =>
            setUserData({ ...userData, login: e.target.value.trim() })
          }
          style={{
            borderColor:
              state.empty && userData.login.length === 0 ? "red" : "black",
          }}
        />
        <label htmlFor="password">Придумайте новый пароль</label>
        <div className="password-box">
          <input
            disabled={state.sending}
            id="password"
            type={hidePassword ? "password" : "text"}
            className="create-user__password"
            placeholder="Придумайте пароль"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value.trim() })
            }
            style={{
              borderColor:
                state.empty && userData.password.length === 0 ? "red" : "black",
            }}
          />
          <img
            className="create-user__icon"
            src={hide}
            alt="hide pass"
            onClick={() => setHidePassword(!hidePassword)}
          />
        </div>
        {state.error && (
          <span className="create-user__clue">
            *Длина пароля должна быть не менее 8 символов
          </span>
        )}
      </div>
      <div className="create-user__buttons">
        <button
          disabled={state.sending}
          className="create-user__button"
          onClick={(e) => {
            createUser();
          }}
        >
          Создать учетную запись
        </button>
        <button
          disabled={state.sending}
          className="create-user__button"
          onClick={() => {
            setUserData({ login: "", password: "" });
            setState({ ...state, error: false, empty: false });
          }}
        >
          Отмена
        </button>
      </div>
      <div className="create-user__notice">
        {state.error && (
          <span style={{ color: "red" }}>Неверный ввод данных</span>
        )}

        {state.empty && (
          <span style={{ color: "red" }}>Все поля должны быть заполнены</span>
        )}
      </div>
      {state.sending && <Success />}
    </div>
  );
};

export default CreateUser;
