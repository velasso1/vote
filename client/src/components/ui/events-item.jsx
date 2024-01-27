import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EventsItem = ({ id, name, description, date, status }) => {
  const navigate = useNavigate();
  const openEvent = () => {
    navigate(`current-event/${id}`);
  };

  return (
    <div className="events__item" onClick={(e) => openEvent()}>
      <div className="events__name">{name}</div>
      <div className="events__description">{description}</div>
      <div className="events__date">{date}</div>
      <div
        className="events__status"
        style={{ color: status === "true" ? "green" : "red" }}
      >
        Голосование {status === "true" ? "открыто" : "закрыто"}
      </div>
    </div>
  );
};

export default EventsItem;
