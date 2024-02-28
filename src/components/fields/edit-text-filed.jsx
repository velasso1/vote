// textfield for edit-user component
import React from "react";

const EditTextField = ({
  placeholder,
  className,
  userInfo,
  setUserInfo,
  disable,
  state,
  type,
}) => {
  return (
    <input
      type={type === "pass" ? "password" : "text"}
      disabled={disable}
      placeholder={placeholder}
      className={`edit-user__${className}`}
      value={userInfo[`${className}`]}
      onChange={(e) =>
        setUserInfo({ ...userInfo, [className]: e.target.value })
      }
      style={{
        borderColor:
          state.empty && userInfo[`${className}`.length ? "red" : "black"],
      }}
    />
  );
};

export default EditTextField;
