import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AcceptedVote from "../modals/accepted-vote";
import { makeChoice, checkVoiting } from "../../store/slices/user";
import { getCurrentEvent } from "../../store/slices/events";
import Loader from "../ui/loader";
import { current } from "@reduxjs/toolkit";

const CurrentEvent = () => {
  const dispatch = useDispatch();

  const { isAdmin, userId } = useSelector((state) => state.user);
  const { currentEvent, sendingStatus } = useSelector((state) => state.events);

  const [openModal, setOpenModal] = useState(false);
  const [voted, setVoted] = useState({
    voted: false,
    canVote: false,
  });
  const { id } = useParams();

  useEffect(() => {
    dispatch(checkVoiting(id, userId));
  }, [dispatch, id, userId]);

  useEffect(() => {
    dispatch(getCurrentEvent(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentEvent.votingUsers) {
      console.log(currentEvent);
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

        {!currentEvent.isFinished && voted.canVote ? (
          <div
            className="current-event__buttons"
            onClick={(e) => voteFor(e.target)}
          >
            <button className="current-event__button support" name="sup">
              Проголосовать ЗА
            </button>

            <button className="current-event__button denied" name="den">
              Проголосовать ПРОТИВ
            </button>
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
          {sendingStatus && <Loader />}
        </div>
      )}
    </>
  );
};

export default CurrentEvent;
