import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AcceptedVote from "../modals/accepted-vote";
import { makeChoice } from "../../store/slices/user";
import { getCurrentEvent } from "../../store/slices/events";
import { checkVoiting } from "../../store/slices/user";

const CurrentEvent = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [voted, setVoted] = useState({
    voted: false,
    accept: false,
    denied: false,
  });
  const params = useParams();

  const { isAdmin, userId } = useSelector((state) => state.user);
  const { currentEvent } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getCurrentEvent(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    dispatch(checkVoiting(params.id, localStorage.getItem("uid")));
  }, [dispatch, params.id, userId]);

  const voteFor = (target) => {
    if (target.tagName !== "BUTTON") return;

    setVoted({ ...voted, voted: true });
    setOpenModal(true);
    setTimeout(() => setOpenModal(false), 2500);

    if (target.name === "sup") {
      dispatch(
        makeChoice({
          idEvent: params.id,
          userId: userId,
          accepted: true,
          denied: false,
        })
      );
      return;
    }

    dispatch(
      makeChoice({
        idEvent: params.id,
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
        <div className="current-event__date">{currentEvent.dateOfCreate}</div>
        {currentEvent.isFinished === "true" ? (
          <div
            className="current-event__buttons"
            onClick={(e) => voteFor(e.target)}
          >
            {voted.voted === true ? (
              <h2 className="current-event__closed">Вы проголосовали</h2>
            ) : (
              <>
                <button className="current-event__button support" name="sup">
                  Проголосовать ЗА
                </button>

                <button className="current-event__button denied" name="den">
                  Проголосовать ПРОТИВ
                </button>
              </>
            )}
          </div>
        ) : (
          <h2 className="current-event__closed">
            Вы не можете принять участие в голосовании
          </h2>
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
        </div>
      )}
    </>
  );
};

export default CurrentEvent;
