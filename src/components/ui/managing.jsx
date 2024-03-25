import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  userToEdit,
  getAllAccs,
  deleteUser,
} from "../../store/slices/accounts";
import ConfirmAction from "../modals/confirm-action";

const Managing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accounts } = useSelector((state) => state.accounts);
  const { decryptedUInfo } = useSelector((state) => state.user);
  const [confirm, setOpenConfirm] = useState(false);
  // id deleting user for props in ConfirmAction
  const [id, setId] = useState(null);

  useEffect(() => {
    dispatch(getAllAccs(decryptedUInfo));
  }, []);

  const editUserData = (e, user) => {
    if (e.target.className === "managing__delete") return;
    navigate(`/edit-user/${user._id}`);
    dispatch(userToEdit(user, decryptedUInfo));
  };

  const deleteAccount = (id) => {
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
              {accounts.length ? (
                accounts.map((item, index) => {
                  return item.login !== "admin" && accounts.length ? (
                    <tr
                      className="managing__item"
                      key={index}
                      onClick={(e) => editUserData(e, item)}
                    >
                      <td>{item.login}</td>
                      <td className="managing__edit">Редактировать</td>
                      <td
                        className="managing__delete"
                        onClick={() => deleteAccount(item._id)}
                      >
                        Удалить
                      </td>
                    </tr>
                  ) : null;
                })
              ) : (
                <tr>
                  <td colSpan={2}>Пусто</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Managing;
