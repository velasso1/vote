import React from "react";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../store/slices/events";

const ConfirmAction = ({ id, setConfirm }) => {
  const dispatch = useDispatch();

  const deleteAction = () => {
    dispatch(deleteEvent(id));
    setConfirm(false);
  };

  return (
    <div className="confirm-modal modal">
      <div className="confirm-modal__content">
        <h1 className="confirm-modal__title">
          Вы уверены, что хотите удалить событие?
        </h1>
        <span className="confirm-modal__tagline">
          данное действие будет невозможно отменить
        </span>
        <div className="confirm-modal__buttons">
          <button
            className="confirm-modal__delete-button"
            onClick={() => deleteAction()}
          >
            Да, удалить
          </button>
          <button
            className="confirm-modal__cancel-button"
            onClick={() => setConfirm(false)}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAction;
