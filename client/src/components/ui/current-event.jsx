import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import config from "../../auxuliary.json";

const CurrentEvent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  const data = config.events.filter((item) => {
    return item.id === params.id;
  });

  return (
    <div className="current-event">
      <div className="current-event__name">{data[0].name}</div>
      <div className="current-event__description">{data[0].description}</div>
      {/* <div className="current-event__date">{data[0].dateOfCreate}</div> */}
      {data[0].status === "true" ? (
        <div className="current-event__buttons">
          <button className="current-event__button support">
            Проголосовать ЗА
          </button>
          <button className="current-event__button denied">
            Проголосовать ПРОТИВ
          </button>
        </div>
      ) : (
        <h2>Вы не можете принять участие в голосовании</h2>
      )}
    </div>
  );
};

export default CurrentEvent;
