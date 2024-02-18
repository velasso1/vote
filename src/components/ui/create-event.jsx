import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../store/slices/events";
import { useNavigate } from "react-router-dom";
import { getAllAccs } from "../../store/slices/accounts";
import Loader from "./loader";
import Success from "../modals/success";

const CreateEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllAccs());
  }, [dispatch]);

  const { accounts } = useSelector((state) => state.accounts);
  const { sendingStatus } = useSelector((state) => state.events);

  const [votedPeoples, setVotedPeoples] = useState([]);
  const [state, setState] = useState({
    error: false,
    empty: false,
  });

  const [eventInfo, setEventInfo] = useState({
    name: "",
    description: "",
    dateCreated: new Date().getTime(),
    dateEvent: "",
    numberOfVotes: "",
    votingUsers: [],
  });

  const newAccounts = accounts.filter(
    (item) => !eventInfo.votingUsers.includes(item._id)
  );

  const validate = () => {
    setState({ error: false, empty: false });

    for (let key in eventInfo) {
      if (eventInfo[key] === "") {
        setState({ ...state, empty: true });
        return;
      }
    }

    if (+eventInfo.numberOfVotes !== +votedPeoples.length) {
      setState({ error: true, empty: false });
      return;
    }

    sendData();
  };

  const choosePeople = (item) => {
    // ids for fetch
    setEventInfo({
      ...eventInfo,
      votingUsers: [...eventInfo.votingUsers, item._id],
    });
    // peoples for visualization on display
    setVotedPeoples([...votedPeoples, item]);
  };

  const deletePeople = (user) => {
    setEventInfo({
      ...eventInfo,
      votingUsers: eventInfo.votingUsers.filter((item) => item !== user._id),
    });
    setVotedPeoples(votedPeoples.filter((item) => item._id !== user._id));
  };

  const sendData = () => {
    dispatch(createEvent(eventInfo));
    setEventInfo({
      ...eventInfo,
      name: "",
      description: "",
      dateCreated: new Date().getTime(),
      dateEvent: "",
      numberOfVotes: "",
      votedPeoples: [],
    });
    setVotedPeoples([]);
    setState({ error: false, empty: false });
    setTimeout(() => {
      navigate("/events");
    }, 1500);
  };

  return (
    <div className="create-event">
      {sendingStatus && (
        <>
          <Loader /> <Success />
        </>
      )}
      <h1 className="create-event__title">Создание нового события</h1>
      {state.empty && (
        <span className="create-event__clue">
          *Все поля должны быть заполнены
        </span>
      )}
      <div className="create-event__info">
        <label htmlFor="name">Введите название события</label>
        <input
          disabled={sendingStatus}
          style={{
            borderColor: state.empty && eventInfo.name === "" ? "red" : "black",
          }}
          onChange={(e) => setEventInfo({ ...eventInfo, name: e.target.value })}
          value={eventInfo.name}
          className="create-event__name"
          type="text"
          name="name"
          placeholder="Введите название"
        />

        <label htmlFor="description">Введите описание события</label>
        <textarea
          disabled={sendingStatus}
          style={{
            borderColor:
              state.empty && eventInfo.description === "" ? "red" : "black",
          }}
          onChange={(e) =>
            setEventInfo({ ...eventInfo, description: e.target.value })
          }
          value={eventInfo.description}
          className="create-event__description"
          name="description"
          placeholder="Введите описание"
        />

        <label htmlFor="quantity">Введите количество голосующих</label>
        <input
          disabled={sendingStatus}
          style={{
            borderColor:
              state.empty && eventInfo.numberOfVotes === "" ? "red" : "black",
          }}
          onChange={(e) =>
            setEventInfo({ ...eventInfo, numberOfVotes: +e.target.value })
          }
          value={eventInfo.numberOfVotes}
          className="create-event__quantity"
          type="number"
          min={0}
          name="quantity"
          placeholder="Введите количество"
        />
        {state.error && (
          <span className="create-event__clue">
            *Введенное количество не совпадает с количеством выбранных людей
          </span>
        )}

        {eventInfo.dateCreated === "" && (
          <span className="create-event__clue">Укажите дату голосования</span>
        )}

        <input
          disabled={sendingStatus}
          className="create-event__date"
          type="date"
          onChange={(e) => {
            setEventInfo({
              ...eventInfo,
              dateEvent: Date.parse(`${e.target.value}`),
            });
          }}
        />
      </div>
      <div className="create-event__peoples">
        <div className="create-event__left">
          <span className="create-event__subtitle">Выбранные люди</span>
          <ul className="create-event__selected">
            {votedPeoples.length !== 0 ? (
              votedPeoples.map((item, index) => {
                return item.login !== "admin" ? (
                  <li
                    className="create-event__item"
                    key={index}
                    onClick={() => deletePeople(item)}
                  >
                    {item.login}
                  </li>
                ) : null;
              })
            ) : (
              <li className="create-event__item">Никто не выбран</li>
            )}
          </ul>
        </div>

        <div className="create-event__right">
          <span className="create-event__subtitle">Все люди</span>
          <ul className="create-event__all">
            {newAccounts.map((item, index) => {
              return item.login !== "admin" ? (
                <li
                  className="create-event__item"
                  key={index}
                  onClick={() => choosePeople(item)}
                >
                  {item.login}
                </li>
              ) : null;
            })}
          </ul>
        </div>
      </div>

      <div className="create-event__buttons">
        <button
          disabled={sendingStatus}
          className="create-event__button"
          onClick={() => validate()}
        >
          Создать событие
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;
