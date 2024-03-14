import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AcceptedVote from "../modals/accepted-vote";
import { makeChoice, checkVoiting } from "../../store/slices/user";
import { getCurrentEvent } from "../../store/slices/events";
import Loader from "../ui/loader";
import { getAllAccs } from "../../store/slices/accounts";

// import crypto from "crypto-js";

// const cryptoObject = { one: 1, two: 2 };

// let encrypt = crypto.Rabbit.encrypt(
//   JSON.stringify(cryptoObject),
//   "somepasskey"
// ).toString();
// let decrypt = JSON.parse(
//   crypto.Rabbit.decrypt(encrypt, "somepasskey").toString(crypto.enc.Utf8)
// );

const CurrentEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin, userId, isVoted } = useSelector((state) => state.user);
  const { currentEvent, sendingStatus } = useSelector((state) => state.events);

  const [openModal, setOpenModal] = useState(false);
  const [voted, setVoted] = useState({
    voted: false,
    canVote: false,
    openEvent: false,
  });
  const { id } = useParams();

  useEffect(() => {
    dispatch(checkVoiting(id, userId));
  }, [dispatch, id, userId]);

  useEffect(() => {
    dispatch(getCurrentEvent(id));
    dispatch(getAllAccs());
  }, [dispatch, id]);

  useEffect(() => {
    if (currentEvent.votingUsers) {
      setVoted({
        ...voted,
        canVote:
          currentEvent.votingUsers.length > 0
            ? currentEvent.votingUsers.includes(userId)
            : true,
      });
    }
  }, [currentEvent.votingUsers]);

  const voteFor = (target) => {
    if (target.tagName !== "BUTTON") return;

    setVoted({ ...voted, voted: true });
    setOpenModal(true);
    setTimeout(() => setOpenModal(false), 2500);

    if (target.name === "sup") {
      dispatch(
        makeChoice({
          idEvent: id,
          userId: userId,
          accepted: true,
          denied: false,
        })
      );
      return;
    }

    dispatch(
      makeChoice({
        idEvent: id,
        userId: userId,
        accepted: false,
        denied: true,
      })
    );
  };

  return (
    <>
      {openModal && <AcceptedVote />}
      <div className="current-event">
        <div className="current-event__name">{currentEvent.name}</div>
        <div className="current-event__description">
          {currentEvent.description}
        </div>
        {/* <div className="current-event__date">{currentEvent.dateOfCreate}</div> */}
        {/* if event is not finished and user includes in votingUsers array in this event */}
        {!currentEvent.isFinished && voted.canVote && voted.openEvent ? (
          <div
            className="current-event__buttons"
            onClick={(e) => voteFor(e.target)}
          >
            {/* if user is not voted - render buttons, else render notif */}
            {!isVoted ? (
              <>
                <button className="current-event__button support" name="sup">
                  Проголосовать ЗА
                </button>
                <button className="current-event__button denied" name="den">
                  Проголосовать ПРОТИВ
                </button>
              </>
            ) : (
              <h2 className="current-event__closed">Вы проголосовали</h2>
            )}
          </div>
        ) : (
          <div className="current-event__notif">
            {sendingStatus ? (
              <Loader />
            ) : (
              <h2 className="current-event__closed">
                Вы не можете принять участие в голосовании
              </h2>
            )}
          </div>
        )}
      </div>
      {isAdmin && (
        <div className="stats">
          <h3 className="stats__title">Статистика голосования:</h3>
          <table className="stats__table">
            <tbody>
              <tr>
                <td>Количество ЗА</td>
                <td>{currentEvent.accepted}</td>
              </tr>
              <tr>
                <td>Количество ПРОТИВ</td>
                <td>{currentEvent.denied}</td>
              </tr>
              {/* <tr>
                <td>Количество проголосовавших</td>
                <td>{currentEvent.accepted + currentEvent.denied}</td>
              </tr> */}
              <tr>
                <td>Нужное количество голосов</td>
                <td>{currentEvent.numberOfVotes}</td>
              </tr>
            </tbody>
          </table>
          <h3 className="stats__status">
            Голосование: {currentEvent.isFinished ? "закрыто" : "открыто"}
          </h3>
          {/* <div className="stats__users">
            <ul className="stats__users-list">
              {accounts.map((item, index) => {
                return (
                  <li key={index} className="state__item">
                    {item.login}
                  </li>
                );
              })}
            </ul>
          </div> */}
          <div className="stats__edit-event">
            <button
              className="create-event__button"
              onClick={(e) => navigate(`/edit-event/${currentEvent._id}`)}
            >
              Редактировать
            </button>

            <button
              className="create-event__print-button"
              onClick={(e) => navigate(`/print-result/${currentEvent._id}`)}
            >
              Просмотреть версию для печати
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentEvent;
