import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTarget } from "../../store/slices/check-box";
import EventsItem from "./events-item";
import Checkbox from "./checkbox";
import config from "../../auxuliary.json";

const EventsList = () => {
  const [checked, setChecked] = useState({
    all: true,
    opened: false,
    closed: false,
  });

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
          Показать:
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
        <div className="events__list">
          {newData.map((item, index) => {
            return (
              <EventsItem
                key={index}
                id={index}
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
