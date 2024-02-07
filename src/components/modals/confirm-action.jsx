import React from "react";
import { useDispatch } from "react-redux";
// import { deleteEvent } from "../../store/slices/events";

const ConfirmAction = ({ id, setConfirm, deleteAction }) => {
  const dispatch = useDispatch();

  const deleting = () => {
    dispatch(deleteAction(id));
    setConfirm(false);
  };

  return (
    <div className="confirm-modal modal">
      <div className="confirm-modal__content">
        <h1 className="confirm-modal__title">
          Вы уверены, что хотите удалить запись?
        </h1>
        <span className="confirm-modal__tagline">
          данное действие будет невозможно отменить
        </span>
        <div className="confirm-modal__buttons">
          <button
            className="confirm-modal__delete-button"
            onClick={() => deleting()}
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
