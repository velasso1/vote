import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header__menu">
        <NavLink className="header__menu-item" to="/">
          меню
        </NavLink>

        <NavLink className="header__menu-item" to="/login">
          войти
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
