import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../store/slices/user";

const Header = () => {
  const auth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(removeUser());
  };
  return (
    <header className="header">
      <div className="header__logo">
        <img className="header__logo" src="images/logo.webp" alt="logo" />
      </div>
      <div className="header__name">
        <h1 className="header__title">Тайное голосование</h1>
        <h2 className="header__subtitle">
          Московский университет МВД России им. В.Я. Кикотя
        </h2>
      </div>
      <div className="header__menu">
        {auth ? (
          <>
            <NavLink className="header__menu-item" to="/events">
              меню
            </NavLink>

            <NavLink
              className="header__menu-item"
              to="/"
              onClick={() => signOut()}
            >
              выйти
            </NavLink>
          </>
        ) : (
          <div className="header__stub"></div>
        )}

        {/* <NavLink className="header__menu-item" to="/admin-page">
          админ-панель
        </NavLink> */}
      </div>
    </header>
  );
};

export default Header;
