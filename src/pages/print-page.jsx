import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentEvent } from "../store/slices/events";
import Loader from "../components/ui/loader";
import { getAllAccs } from "../store/slices/accounts";

const PrintPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCurrentEvent(id));
    dispatch(getAllAccs());
  }, [dispatch, id]);

  const { currentEvent, sendingStatus } = useSelector((state) => state.events);
  const { accounts } = useSelector((state) => state.accounts);
  const date = new Date(currentEvent.dateEvent).toLocaleDateString();

  const peoplesIncludesInCommission = accounts.filter((item) => {
    return currentEvent.membersOfTheCountingCommission.includes(item._id);
  });

  return (
    <div className="print">
      {!sendingStatus ? <></> : <Loader />}
      <div className="print__content">
        <div className="print__title">
          <h1>
            <b>протокол № 1</b>
          </h1>
        </div>
        <div className="print__subtitle">
          <p>
            <b>
              заседания счетной комиссии, избранной <br /> советом по защите
              диссертаций на соискание ученой степени кандидата <br /> наук, на
              соискание ученой степени доктора наук 03.2.006.05
            </b>
          </p>
        </div>
        <div className="print__date">
          <p>
            <b>от {date}</b>
          </p>
        </div>

        <div className="print__compound">
          <p>
            Состав избранной комиссии:{" "}
            {peoplesIncludesInCommission.map((item, index) => {
              return (
                <span key={index}>{`${item.fullName}${
                  index + 1 === peoplesIncludesInCommission.length ? "." : ", "
                }`}</span>
              );
            })}
          </p>
        </div>
        <div className="print__about">
          <p>
            <span>Комиссия</span> избрана для подсчета голосов при тайном
            голосовании по вопросу о присуждении{" "}
            <b>{currentEvent.fullNameOfTheCandidate}</b> ученой степени&nbsp;
            {currentEvent.academicDegree}.
          </p>
          <p>
            <span>Состав</span> диссертационного совета утвержден в количестве
            <b> {currentEvent.numberOfVotes} </b> человек на срок действия
            Номенклатуры научных специальностей, по которым присуждаются ученые
            степени.
          </p>
          <p>
            <span>Присутствовало</span> на заседании ___ членов совета, в том
            числе докторов наук по профилю рассматриваемой диссертации ___.
          </p>
          <p>
            <span>Результаты</span> голосования по вопросу о присуждении ученой
            степени <b>{currentEvent.academicDegree}</b>
          </p>
          <p className="print__nameOfCandidate">
            <b>{currentEvent.fullNameOfTheCandidate}</b>
          </p>
        </div>
        <div className="print__result">
          <p>За: {currentEvent.accepted}</p>
          <p>Против: {currentEvent.denied}</p>
        </div>
        <div className="print__staff">
          <p>Члены счетной комиссии</p>
          <br />
          <p>Председатель счетной комисии</p>
        </div>
      </div>
      <button
        disabled={!currentEvent.isFinished}
        className="print__button"
        onClick={() => window.print()}
      >
        печать
      </button>
    </div>
  );
};

export default PrintPage;
