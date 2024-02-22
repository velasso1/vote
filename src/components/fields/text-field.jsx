import React from "react";

const TextField = ({ disabled, id, state, userData, setUserData, text }) => {
  return (
    <>
      <label htmlFor={id}>{text}</label>
      <input
        type="text"
        placeholder={text}
        id={id}
        disabled={disabled}
        className={`create-user__${id}`}
        value={userData[`${id}`]}
        onChange={(e) => {
          setUserData({ ...userData, [id]: e.target.value.trim() });
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
