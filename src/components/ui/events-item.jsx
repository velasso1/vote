import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TrashBin from "./trash-bin";
import ConfirmAction from "../modals/confirm-action";

const EventsItem = ({ id, name, description, date, status }) => {
  const navigate = useNavigate();

  const [confirm, setConfirm] = useState(false);

  const openEvent = (tagName) => {
    if (tagName === "svg" || tagName === "path") {
      setConfirm(true);
      return;
    }

    navigate(`current-event/${id}`);
  };

  const { isAdmin } = useSelector((state) => state.user);

  return (
    <>
      {confirm && <ConfirmAction id={id} setConfirm={setConfirm} />}
      <div
        className="events__item"
        onClick={(e) => openEvent(e.target.tagName)}
      >
        <div className="events__name">{name}</div>
        <div className="events__description">{description}</div>
        <div className="events__date">{date}</div>
        <div
          className="events__status"
          style={{ color: status === "true" ? "green" : "red" }}
        >
          Голосование {status === "true" ? "открыто" : "закрыто"}
          {isAdmin && <TrashBin />}
        </div>
      </div>
    </>
  );
};

export default EventsItem;
