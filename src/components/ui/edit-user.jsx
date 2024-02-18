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

  const [state, setState] = useState({
    error: false,
    empty: false,
    sending: false,
  });

  const [userInfo, setUserInfo] = useState({
    login: dataForUpdate.login,
    password: "",
  });

  const updateInfo = () => {
    dispatch(updateUserData(userInfo, params.id));
    setState({ ...state, sending: true });

    setTimeout(() => {
      // setState({ ...state, sending: false });
      navigate("/manage");
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
              disable={state.sending}
              state={state}
            />
          );
        })}
      </div>

      <div className="edit-user__buttons">
        <button
          disabled={state.sending}
          className="edit-user__button"
          onClick={() => updateInfo()}
        >
          Сохранить
        </button>
      </div>

      {state.sending && <Success />}
    </div>
  );
};

export default EditUser;
