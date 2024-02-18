import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTarget } from "../../store/slices/check-box";
import { useNavigate } from "react-router-dom";
import EventsItem from "./events-item";
import Checkbox from "./checkbox";
import { getEvents } from "../../store/slices/events";
import Loader from "./loader";

import config from "../../auxuliary.json";

const EventsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [checked, setChecked] = useState({
    all: true,
    opened: false,
    closed: false,
  });

  const { isAdmin } = useSelector((state) => state.user);
  const target = useSelector((state) => state.checkbox.target);

  const { events, sendingStatus } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(changeTarget(""));
    dispatch(getEvents());
  }, [dispatch]);

  let newData =
    target === ""
      ? events
      : events.filter((item) => {
          return item.isFinished !== target;
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
          {newData.length !== 0 ? (
            newData.map((item, index) => {
              return (
                <EventsItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  date={item.dateOfCreate}
                  status={item.isFinished}
                />
              );
            })
          ) : (
            <>
              {!sendingStatus && (
                <div className="events__empty">События отсутствуют</div>
              )}
            </>
          )}
          {sendingStatus && <Loader />}
        </div>
      </div>
    </>
  );
};

export default EventsList;
