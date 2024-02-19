import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent } from "../../store/slices/events";
import { setIdForDelete } from "../../store/slices/events";
import TrashBin from "./trash-bin";
import ConfirmAction from "../modals/confirm-action";

const EventsItem = ({ id, name, description, date, status }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);

  const openEvent = (tagName) => {
    if (tagName === "svg" || tagName === "path") {
      setConfirm(true);
      dispatch(setIdForDelete(id));
      return;
    }

    navigate(`current-event/${id}`);
  };

  const { isAdmin } = useSelector((state) => state.user);

  return (
    <>
      {confirm && (
        <ConfirmAction
          id={id}
          setConfirm={setConfirm}
          deleteAction={deleteEvent}
        />
      )}
      <div
        className="events__item"
        onClick={(e) => openEvent(e.target.tagName)}
      >
        <div className="events__name">{name}</div>
        <div className="events__description">{description}</div>
        <div className="events__date">{date}</div>
        <div
          className="events__status"
          style={{ color: status ? "red" : "green" }}
        >
          Голосование {status ? "закрыто" : "открыто"}
          {isAdmin && <TrashBin />}
        </div>
      </div>
    </>
  );
};

export default EventsItem;
