import React from "react";

const TextField = ({
  disabled,
  id,
  state,
  userData,
  setUserData,
  text,
  elem,
  type,
}) => {
  return (
    <>
      <label htmlFor={id}>{text}</label>
      <input
        type={type === "pass" ? "password" : "text"}
        placeholder={text}
        id={id}
        disabled={disabled}
        className={
          elem !== "create" ? `create-user__${id}` : `create-event__${id}`
        }
        value={userData[`${id}`]}
        onChange={(e) => {
          setUserData({
            ...userData,
            [id]: e.target.value,
          });
        }}
        style={{
          borderColor:
            state.empty && userData[`${id}`].length === 0 ? "red" : "black",
        }}
      />
    </>
  );
};

export default TextField;
