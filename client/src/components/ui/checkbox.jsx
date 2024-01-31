import React from "react";
import { useDispatch } from "react-redux";
import { changeTarget } from "../../store/slices/check-box";

const Checkbox = ({ name, text, checked, setChecked }) => {
  const dispatch = useDispatch();
  const setCheckbox = (targetName) => {
    switch (true) {
      case targetName === "all":
        setChecked({ all: true, opened: false, closed: false });
        dispatch(changeTarget(""));
        return;

      case targetName === "opened":
        setChecked({ all: false, opened: true, closed: false });
        dispatch(changeTarget(true));
        return;

      case targetName === "closed":
        setChecked({ all: false, opened: false, closed: true });
        setTimeout(() => {
          dispatch(changeTarget(false));
        }, 100);
        return;

      default:
        return;
    }
  };

  return (
    <>
      <label htmlFor={name}>{text}</label>
      <input
        className="events__checkbox"
        type="checkbox"
        name={name}
        checked={checked[`${name}`]}
        onChange={(e) => setCheckbox(e.target.name)}
      />{" "}
    </>
  );
};

export default Checkbox;
