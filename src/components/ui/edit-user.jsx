import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../store/slices/accounts";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import EditTextField from "../fields/edit-text-filed";
import Success from "../modals/success";
import config from "../../auxuliary.json";

const EditUser = () => {
  const dispatch = useDispatch();
  const { dataForUpdate, sendingStatus } = useSelector(
    (state) => state.accounts
  );
  const navigate = useNavigate();
  const params = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [state, setState] = useState({
    error: false,
    empty: false,
  });

  const [userInfo, setUserInfo] = useState({
    login: dataForUpdate.login,
    password: "",
  });

  const updateInfo = () => {
    if (userInfo.password.length < 8 || userInfo.login.length < 2) {
      setState({ ...state, error: true });
      return;
    }
    dispatch(updateUserData(userInfo, params.id));
    setOpenModal(true);

    setTimeout(() => {
      navigate("/manage");
      setOpenModal(false);
    }, 2200);
  };

  return (
    <div className="edit-user">
      {sendingStatus && <Success />}
      <h1 className="edit-user__title">Редактирование учетной записи</h1>
      <div className="edit-user__info">
        {config.editUserFields.map((item, index) => {
          return (
            <EditTextField
              key={index}
              placeholder={item.placeholder}
              className={item.className}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              disable={openModal}
              state={state}
            />
          );
        })}
      </div>

      <div className="edit-user__buttons">
        {state.error && (
          <span className="create-event__clue">
            *Длина пароля должна быть не менее 8 символов
          </span>
        )}
        <button
          disabled={sendingStatus}
          className="edit-user__button"
          onClick={() => updateInfo()}
        >
          Сохранить
        </button>
      </div>

      {openModal && <Success />}
    </div>
  );
};

export default EditUser;
