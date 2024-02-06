import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTarget } from "../../store/slices/check-box";
import EventsItem from "./events-item";
import Checkbox from "./checkbox";
import config from "../../auxuliary.json";
import { useNavigate } from "react-router-dom";

const EventsList = () => {
  const [checked, setChecked] = useState({
    all: true,
    opened: false,
    closed: false,
  });

  const navigate = useNavigate();

  const { isAdmin } = useSelector((state) => state.user);

  const target = useSelector((state) => state.checkbox.target);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTarget(""));
  }, []);

  let newData =
    target === ""
      ? config.events
      : config.events.filter((item) => {
          return item.status === `${target}`;
        });

  return (
    <>
      <div className="events">
        <div className="events__filter">
          <span className="events__desc">Показать:</span>
          {config.checkBox.map((item, index) => {
            return (
              <Checkbox
                name={item.name}
                text={item.text}
                key={index}
                checked={checked}
                setChecked={setChecked}
              />
            );
          })}
        </div>
        {isAdmin && (
          <div className="events__admin-menu">
            <button
              className="events__admin-button"
              onClick={(e) => navigate("/create-user")}
            >
              Создать учетную запись
            </button>
            <button
              className="events__admin-button"
              onClick={(e) => navigate("/create-event")}
            >
              Создать событие
            </button>

            <button
              className="events__admin-button"
              onClick={(e) => navigate("/manage")}
            >
              Управление пользователями
            </button>
          </div>
        )}
        <div className="events__list">
          {newData.map((item, index) => {
            return (
              <EventsItem
                key={index}
                id={item.id}
                name={item.name}
                description={item.description}
                date={item.dateOfCreate}
                status={item.status}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default EventsList;
