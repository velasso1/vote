import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, updateEvent } from "../../store/slices/events";
import { useNavigate } from "react-router-dom";
import { getAllAccs } from "../../store/slices/accounts";
import Loader from "./loader";
import Tooltip from "../modals/tooltip";
import TextField from "../fields/text-field";
import config from "../../auxuliary.json";

const CreateEvent = ({ eventData, path, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllAccs());
  }, [dispatch]);

  const { accounts } = useSelector((state) => state.accounts);
  const { sendingStatus } = useSelector((state) => state.events);
  const { decryptedUInfo } = useSelector((state) => state.decryptedUInfo);

  const [state, setState] = useState({
    error: false,
    empty: false,
  });

  const [eventInfo, setEventInfo] = useState({
    // check eventData for update event information. For create event value === ''
    name: eventData?.name || "",
    description: eventData?.description || "",
    dateCreated: new Date().getTime(),
    dateEvent: eventData?.dateEvent || "",
    numberOfVotes: eventData?.numberOfVotes || "",
    isFinished: eventData?.isFinished || false,
    accepted: eventData?.accepted || 0,
    denied: eventData?.denied || 0,
    votingUsers: eventData?.votingUsers || [],
    membersOfTheCountingCommission:
      eventData?.membersOfTheCountingCommission || [],
    fullNameOfTheCandidate: eventData?.fullNameOfTheCandidate || "",
    academicDegree: eventData?.academicDegree || "",
  });

  const [votedPeoples, setVotedPeoples] = useState(
    accounts.filter((item) => eventInfo.votingUsers.includes(item._id))
  );

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

    if (+eventInfo.numberOfVotes <= 0) {
      setState({ error: true, empty: false });
      return;
    }

    if (
      +votedPeoples.length > 0 &&
      +eventInfo.numberOfVotes !== +votedPeoples.length
    ) {
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

  const deletePeople = (user, target, id) => {
    if (target.tagName === "INPUT") {
      return;
    }
    setEventInfo({
      ...eventInfo,
      votingUsers: eventInfo.votingUsers.filter((item) => item !== user._id),
      membersOfTheCountingCommission:
        eventInfo.membersOfTheCountingCommission.filter((item) => item !== id),
    });
    setVotedPeoples(votedPeoples.filter((item) => item._id !== user._id));
  };

  const addMemberToCommission = (id) => {
    !eventInfo.membersOfTheCountingCommission.includes(id)
      ? setEventInfo({
          ...eventInfo,
          membersOfTheCountingCommission: [
            ...eventInfo.membersOfTheCountingCommission,
            id,
          ],
        })
      : setEventInfo({
          ...eventInfo,
          membersOfTheCountingCommission:
            eventInfo.membersOfTheCountingCommission.filter(
              (item) => item !== id
            ),
        });
  };

  const sendData = () => {
    path === "update"
      ? dispatch(updateEvent(eventInfo, id, decryptedUInfo))
      : dispatch(createEvent(eventInfo, decryptedUInfo));
    setEventInfo({
      ...eventInfo,
      name: "",
      description: "",
      dateCreated: new Date().getTime(),
      dateEvent: "",
      numberOfVotes: "",
      isFinished: false,
      accepted: 0,
      denied: 0,
      votedPeoples: [],
      membersOfTheCountingCommission: [],
      fullNameOfTheCandidate: "",
      academicDegree: "",
    });
    setVotedPeoples([]);
    setState({ error: false, empty: false });
    setTimeout(() => {
      navigate("/events");
    }, 150);
  };

  return (
    <div className="create-event">
      {sendingStatus && <Loader />}
      <div className="create-event__title-box">
        <Tooltip
          text={"ФИО кандидата должно быть в дательном падеже (Кому?)"}
        />
        <h1 className="create-event__title">
          {path === "update" ? "Редактирование" : "Создание нового"} события
        </h1>
      </div>

      {state.empty && (
        <span className="create-event__clue">
          *Все поля должны быть заполнены
        </span>
      )}
      <div className="create-event__info">
        {config.fieldsForCreateEvent.map((item, index) => {
          return (
            <TextField
              key={index}
              disabled={sendingStatus}
              text={item.text}
              state={state}
              userData={eventInfo}
              setUserData={setEventInfo}
              id={item.id}
              elem={"create"}
            />
          );
        })}

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

        {state.error && (
          <span className="create-event__clue">
            *Введенное количество должно совпадать с количеством выбранных людей{" "}
            <br /> или быть больше 0
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
        <div className="create-event__right">
          <span className="create-event__subtitle">Все люди</span>
          <ul className="create-event__all">
            {newAccounts.map((item, index) => {
              return item.login !== "admin" ? (
                <li
                  className="create-event__item"
                  key={index}
                  onClick={(e) => choosePeople(item, e.target)}
                >
                  {item.login}
                </li>
              ) : null;
            })}
          </ul>
        </div>

        <div className="create-event__left">
          <span className="create-event__subtitle">Выбранные люди</span>
          <span className="create-event__subtitle-members">
            Отметьте людей, которые входят в счетную комисиию
          </span>
          <ul className="create-event__selected">
            {votedPeoples.length !== 0 ? (
              votedPeoples.map((item, index) => {
                return item.login !== "admin" ? (
                  <li
                    className="create-event__item"
                    key={index}
                    onClick={(e) => deletePeople(item, e.target, item._id)}
                  >
                    {item.login}
                    <input
                      type="checkbox"
                      checked={eventInfo.membersOfTheCountingCommission.includes(
                        item._id
                      )}
                      className="create-event__members-of-commission"
                      onChange={(e) =>
                        addMemberToCommission(item._id, e.target)
                      }
                    />
                  </li>
                ) : null;
              })
            ) : (
              <li className="create-event__item">Никто не выбран</li>
            )}
          </ul>
        </div>
      </div>

      <div className="create-event__buttons">
        <button
          disabled={sendingStatus}
          className="create-event__button"
          onClick={() => validate()}
        >
          {path === "update" ? "Сохранить" : "Создать"} событие
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;
