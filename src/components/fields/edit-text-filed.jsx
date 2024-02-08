// textfield for edit-user component
import React from "react";

const EditTextField = ({
  placeholder,
  className,
  userInfo,
  setUserInfo,
  disable,
  state,
}) => {
  return (
    <input
      type="text"
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
