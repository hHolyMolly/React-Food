import React from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import MenuContent from "./MenuContent";

import { logoObj } from "../../../global";

import { setHandleMenu } from "../../../redux/slices/menu";

function Menu() {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.menu.isActive);

  const setOpenMenu = React.useCallback(() => {
    dispatch(setHandleMenu(true));

    const paddingValue = window.innerWidth - document.querySelector("#root").offsetWidth + "px";

    document.body.style.paddingRight = paddingValue;

    document.body.style.overflow = "hidden";
  }, []);

  const setCloseMenu = React.useCallback(() => {
    dispatch(setHandleMenu(false));

    document.body.style.paddingRight = "0px";

    document.body.style.overflow = "auto";
  }, []);

  React.useEffect(() => {
    if (!isActive) return;

    const closeOnKey = (e) => {
      if (e.code === "Escape") setCloseMenu();
    };

    document.body.addEventListener("keydown", closeOnKey);

    return () => {
      document.body.removeEventListener("keydown", closeOnKey);
    };
  }, [isActive]);

  return (
    <nav className="menu">
      <button className="menu__burger _burger" onClick={setOpenMenu}>
        <span></span>
      </button>
      <div className={classNames("menu__body", isActive && "_active")}>
        <div className="menu__top menu-top">
          <Link className="header__logo header-logo menu-top__logo" onClick={setCloseMenu} to="/">
            <img className="header-logo__icon" width={48} height={48} src={logoObj.imageUrl} alt="Logo" />
            <div className="header-logo__row">
              <strong className="header-logo__title">{logoObj.title}</strong>
              <p className="header-logo__text">{logoObj.text}</p>
            </div>
          </Link>
          <button className="menu-top__close _close" onClick={setCloseMenu} type="button"></button>
        </div>
        <MenuContent setCloseMenu={setCloseMenu} />
      </div>
      <div className={classNames("menu__wrapper", isActive && "_active")} onClick={setCloseMenu} />
    </nav>
  );
}

export default Menu;
