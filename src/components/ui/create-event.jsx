import React, { useState } from "react";
import config from "../../auxuliary.json";
const CreateEvent = () => {
  const [eventInfo, setEventInfo] = useState({
    name: "",
    description: "",
    dateCreated: "",
    numberOfVotes: "",
  });

  const [allPeoples, setAllPeoples] = useState([...config.peoples]);
  const [votedPeoples, setVotedPeoples] = useState([]);

  const choosePeople = (id) => {
    setVotedPeoples([...votedPeoples, allPeoples[id]]);
    console.log(votedPeoples);
  };

  return (
    <div className="create-event">
      <h1 className="create-event__title">Создание нового события</h1>
      <div className="create-event__info">
        <label htmlFor="">Введите название события</label>
        <input
          className="create-event__name"
          type="text"
          placeholder="Введите название"
        />

        <label htmlFor="">Введите описание события</label>
        <textarea
          className="create-event__description"
          name="description"
          placeholder="Введите описание"
        />

        <label htmlFor="">Введите количество голосующих</label>
        <input
          className="create-event__quantity"
          type="number"
          min={0}
          placeholder="Введите количество"
        />
      </div>
      <div className="create-event__peoples">
        <div className="create-event__left">
          <span className="create-event__subtitle">Выбранные люди</span>
          <ul className="create-event__selected">
            {votedPeoples.length !== 0 ? (
              votedPeoples.map((item, index) => {
                return (
                  <li className="create-event__item" key={index}>
                    {item.login}
                  </li>
                );
              })
            ) : (
              <li className="create-event__item">Никто не выбран</li>
            )}
          </ul>
        </div>

        <div className="create-event__right">
          <span className="create-event__subtitle">Все люди</span>
          <ul className="create-event__all">
            {allPeoples.map((item, index) => {
              return (
                <li
                  className="create-event__item"
                  key={index}
                  onClick={() => choosePeople(index)}
                >
                  {item.login}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="create-event__buttons">
        <button className="create-event__button">Создать событие</button>
        <button className="create-event__button">Отмена</button>
      </div>
    </div>
  );
};

export default CreateEvent;
