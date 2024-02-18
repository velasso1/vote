import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewUser } from "../../store/slices/accounts";
import hideIcon from "../../images/hide-pass.svg";
import Success from "../modals/success";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";
import TextField from "../fields/text-field";

import config from "../../auxuliary.json";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    login: "",
    // name: "",
    // surname: "",
    password: "",
  });

  const [state, setState] = useState({
    error: false,
    empty: false,
    sending: false,
  });

  const [hidePassword, setHidePassword] = useState(true);

  const createUser = () => {
    console.log(userData);
    if (userData.login.length === 0 || userData.password.length === 0) {
      setState({ ...state, error: false, empty: true });
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
      navigate("/manage");
    }, 2200);
  };

  return (
    <div className="create-user">
      <h1 className="create-user__title">Создание новой учетной записи</h1>
      <div className="create-event__info">
        {config.textFieldsUser.map((item, index) => {
          return (
            <TextField
              key={index}
              disabled={state.sending}
              state={state}
              userData={userData}
              hide={hidePassword}
              setUserData={setUserData}
              id={item.id}
              text={item.text}
            />
          );
        })}
        <div className="password-box">
          <img
            className="create-user__icon"
            src={hideIcon}
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
            setUserData({ login: "", password: "", name: "", surname: "" });
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
      {state.sending && (
        <>
          <Success /> <Loader />
        </>
      )}
    </div>
  );
};

export default CreateUser;
