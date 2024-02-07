import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../store/slices/user";

const EditUser = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  const [userInfo, setUserInfo] = useState({
    login: userData.login,
    password: "",
  });

  const updateInfo = () => {
    dispatch(updateUserData(userInfo));
  };

  return (
    <div className="edit-user">
      <h1 className="edit-user__title">Редактирование учетной записи</h1>
      <div className="edit-user__info">
        <input
          type="text"
          placeholder="Введите логин"
          className="edit-user__login"
          value={userInfo.login}
          onChange={(e) => setUserInfo({ ...userInfo, login: e.target.value })}
        />

        <input
          type="text"
          placeholder="Введите пароль"
          className="edit-user__password"
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />
      </div>
      <div className="edit-user__buttons">
        <button className="edit-user__button" onClick={() => updateInfo()}>
          Сохранить
        </button>
        <button
          className="edit-user__button"
          onClick={() => setUserInfo({ login: "", password: "" })}
        >
          Отмена
        </button>
      </div>
    </div>
  );
};

export default EditUser;
