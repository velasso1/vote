import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userToEdit } from "../../store/slices/user";
import { deleteUser } from "../../store/slices/user";
import ConfirmAction from "../modals/confirm-action";

import config from "../../auxuliary.json";

const Managing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirm, setOpenConfirm] = useState(false);
  // id deleting user for props in ConfirmAction
  const [id, setId] = useState(null);

  const editUserData = (user) => {
    navigate(`/edit-user/${user.id}`);
    dispatch(userToEdit(user));
  };

  const deleteUserData = ({ id }) => {
    setId(id);
    setOpenConfirm(true);
  };

  return (
    <>
      {confirm && (
        <ConfirmAction
          id={id}
          setConfirm={setOpenConfirm}
          deleteAction={deleteUser}
        />
      )}
      <div className="managing">
        <h1 className="managing__title">Управление пользователями</h1>
        <div className="managing__">
          <table className="managing__list">
            <tbody>
              <tr>
                <th>Учетные записи</th>
                <th colSpan={2}>Действие</th>
              </tr>
              {config.peoples.map((item, index) => {
                return (
                  <tr className="managing__item" key={index}>
                    <td>{item.login}</td>
                    <td
                      className="managing__edit"
                      onClick={() => editUserData(item)}
                    >
                      Редактировать
                    </td>
                    <td
                      className="managing__delete"
                      onClick={() => deleteUserData(item)}
                    >
                      Удалить
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Managing;
