import React from "react";

const PrintPage = () => {
  return (
    <div className="print">
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
            <b>от DATE</b>
          </p>
        </div>

        {/* <div className="print__compound">
          <p>Состав избранной комиссии:</p>
        </div> */}
        <div className="print__about">
          <p>
            <span>Комиссия</span> избрана для подсчета голосов при тайном
            голосовании по вопросу о присуждении <b>fullNameOfTheCandidate</b>{" "}
            учетной степени academicDegree.
          </p>
          <p>
            <span>Состав</span> диссертационного совета утвержден в количестве{" "}
            <b>numberOfVotes </b>
            на срок действия Номенклатуры научных специальностей, по которым
            присуждаются ученые степени.
          </p>
          <p>
            <span>Присутствовало</span> на заседании ___ членов совета, в том
            числе докторов наук по профилю рассматриваемой диссертации ___.
          </p>
          <p>
            <span>Результаты</span> голосования по вопросу о присуждении ученой
            степени <b>academicDegree</b>
          </p>
          <p className="print__nameOfCandidate">
            <b>fullNameOfTheCandidate</b>
          </p>
        </div>
        <div className="print__result">
          <p>За: acceptedVotes</p>
          <p>Против: deniedVotes</p>
        </div>
        <div className="print__staff">
          <p>Члены счетной комиссии</p>
          <br />
          <p>Председатель счетной комисии</p>
        </div>
      </div>
      <button className="print__button" onClick={() => window.print()}>
        печать
      </button>
    </div>
  );
};

export default PrintPage;
