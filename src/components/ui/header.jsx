import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkExpiresToken, signOut } from "../../store/slices/user";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(checkExpiresToken());
  }, [location]);

  const signOutFromAcc = () => {
    dispatch(signOut());
  };
  return (
    <header className="header">
      <div className="header__logo">
        <img
          className="header__logo"
          src="images/logo.webp"
          alt="logo"
          onClick={() => navigate("/events")}
        />
      </div>
      <div className="header__name">
        <h1 className="header__title">Тайное голосование</h1>
        <h2 className="header__subtitle">
          Московский университет МВД России им. В.Я. Кикотя
        </h2>
        {isAuth && (
          <div className="header__back">
            <button className="header__back-item" onClick={() => navigate(-1)}>
              &#8592; назад
            </button>
            <button
              className="header__back-item_forward"
              onClick={() => navigate(1)}
            >
              вперед &#8594;
            </button>
          </div>
        )}
      </div>
      <div className="header__menu">
        {isAuth ? (
          <>
            <NavLink className="header__menu-item" to="/events">
              меню
            </NavLink>

            <NavLink
              className="header__menu-item"
              to="/"
              onClick={() => signOutFromAcc()}
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
