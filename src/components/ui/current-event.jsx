import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AcceptedVote from "../modals/accepted-vote";
import config from "../../auxuliary.json";

const CurrentEvent = () => {
  const [openModal, setOpenModal] = useState(false);
  const [voted, setVoted] = useState({
    voted: false,
    accept: false,
    denied: false,
  });
  const { isAdmin } = useSelector((state) => state.user);
  const eventData = useSelector((state) => state.events.events);
  // const location = useLocation();
  // const dispatch = useDispatch();
  const params = useParams();

  const data = eventData.filter((item) => {
    return item.id === params.id;
  });

  const voteFor = (target) => {
    // if (target.tagName !== "BUTTON") return;
    console.log(target);

    setOpenModal(true);
    setTimeout(() => setOpenModal(false), 2500);
  };

  return (
    <>
      {openModal && <AcceptedVote />}
      <div className="current-event">
        <div className="current-event__name">{data[0].name}</div>
        <div className="current-event__description">{data[0].description}</div>
        {/* <div className="current-event__date">{data[0].dateOfCreate}</div> */}
        {data[0].status === "true" ? (
          <div className="current-event__buttons" onClick={(e) => voteFor(e)}>
            {voted.voted === true ? (
              <h2 className="current-event__closed">Вы проголосовали</h2>
            ) : (
              <>
                <button className="current-event__button support">
                  Проголосовать ЗА
                </button>

                <button className="current-event__button denied">
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
                <td>{data[0].accepted}</td>
              </tr>
              <tr>
                <td>Количество ПРОТИВ</td>
                <td>{data[0].denied}</td>
              </tr>
              <tr>
                <td>Количество проголосовавших</td>
                <td>{data[0].numberOfVotes}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default CurrentEvent;
