import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logoObj } from "../../global";
import { setOpenedCategory } from "../../redux/slices/categories";

import { Button } from "../chuncks";
import { Menu, Category, Search, BasketAlert } from "./";

function Header() {
  const dispatch = useDispatch();

  const searchActive = useSelector((state) => state.search.isActive);
  const categoryActive = useSelector((state) => state.categories.isActive);
  const totalBasketCount = useSelector((state) => state.basket.totalCount);
  const totalFavoriteCount = useSelector((state) => state.favorite.totalCount);

  const categoryRef = React.useRef();

  const [isTablet, setIsTablet] = React.useState(false);
  const [isPhone, setIsPhone] = React.useState(false);
  const [fullSearch, setFullSearch] = React.useState(false);

  const handleCategory = React.useCallback(() => {
    return !categoryActive ? dispatch(setOpenedCategory(true)) : dispatch(setOpenedCategory(false));
  }, [categoryActive]);

  React.useEffect(() => {
    const isDevice = () => {
      window.innerWidth > 991.98 ? setIsTablet(false) : setIsTablet(true);
      window.innerWidth > 479.98 ? setIsPhone(false) : setIsPhone(true);

      window.innerWidth > 767.98 ? setFullSearch(false) : setFullSearch(true);
    };

    window.addEventListener("resize", isDevice);
    isDevice();
  }, []);

  React.useEffect(() => {
    if (!categoryActive) return;

    const outsideCategory = (e) => {
      if (!isTablet && !categoryRef.current.contains(e.target) && !e.target.closest(".menu-content__category")) {
        dispatch(setOpenedCategory(false));
      }
    };

    document.body.addEventListener("click", outsideCategory);

    return () => {
      document.body.removeEventListener("click", outsideCategory);
    };
  }, [categoryActive]);

  const removeItem = searchActive && fullSearch;

  return (
    <>
      <header className="header">
        <div className="_container">
          <div className="header__body">
            {!removeItem && (
              <>
                <Menu />
                <Link className="header__logo header-logo" to="/">
                  <img className="header-logo__icon" width={48} height={48} src={logoObj.imageUrl} alt="Logo" />
                  {!isTablet && (
                    <div className="header-logo__row">
                      <strong className="header-logo__title">{logoObj.title}</strong>
                      <p className="header-logo__text">{logoObj.text}</p>
                    </div>
                  )}
                </Link>
              </>
            )}
            {!isTablet && (
              <div className="header__category header-category" ref={categoryRef}>
                <Button className="header-category__button category-button" onClick={handleCategory} orange>
                  <i className="category-button__icon header-category__icon">
                    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1H9V9H1V1Z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13 1H21V9H13V1Z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M1 13H9V21H1V13Z" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M13 17C13 18.0609 13.4214 19.0783 14.1716 19.8284C14.9217 20.5786 15.9391 21 17 21C18.0609 21 19.0783 20.5786 19.8284 19.8284C20.5786 19.0783 21 18.0609 21 17C21 15.9391 20.5786 14.9217 19.8284 14.1716C19.0783 13.4214 18.0609 13 17 13C15.9391 13 14.9217 13.4214 14.1716 14.1716C13.4214 14.9217 13 15.9391 13 17Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </i>
                  <span className="category-button__text header-category__text">Категории</span>
                </Button>
                <Category />
              </div>
            )}
            <Search isPhone={isPhone} />
            {!removeItem && (
              <ul className="header__actions header-actions">
                {!isPhone && (
                  <li className="header-actions__item">
                    <Link className="header-actions__link" to="/favorite">
                      <i className="header-actions__icon">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M21.125 13.6197L13 21.6667L4.87504 13.6197C4.33912 13.0982 3.91699 12.4713 3.63522 11.7787C3.35345 11.086 3.21815 10.3425 3.23784 9.595C3.25753 8.84749 3.43178 8.11214 3.74963 7.43527C4.06747 6.75841 4.52202 6.15469 5.08465 5.66212C5.64728 5.16956 6.30581 4.79882 7.01875 4.57326C7.7317 4.34771 8.48363 4.27221 9.22719 4.35153C9.97075 4.43085 10.6898 4.66326 11.3392 5.03414C11.9885 5.40502 12.554 5.90633 13 6.50649C13.448 5.91068 14.0142 5.41376 14.6631 5.04681C15.3119 4.67987 16.0296 4.45081 16.7711 4.37397C17.5125 4.29713 18.2619 4.37417 18.9722 4.60025C19.6825 4.82634 20.3386 5.19661 20.8992 5.68789C21.4599 6.17917 21.9131 6.78088 22.2305 7.45538C22.5479 8.12987 22.7227 8.86262 22.7439 9.60776C22.7651 10.3529 22.6322 11.0944 22.3537 11.7858C22.0751 12.4773 21.6569 13.1038 21.125 13.6262"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </i>
                      {totalFavoriteCount > 0 && <span className="header-actions__value">{totalFavoriteCount > 9 ? "9" : totalFavoriteCount}</span>}
                    </Link>
                  </li>
                )}
                <li className="header-actions__item">
                  <Link className="header-actions__link" to="/basket">
                    <i className="header-actions__icon">
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M4.33337 20.5833C4.33337 21.158 4.56165 21.7091 4.96798 22.1154C5.3743 22.5217 5.9254 22.75 6.50004 22.75C7.07468 22.75 7.62578 22.5217 8.03211 22.1154C8.43843 21.7091 8.66671 21.158 8.66671 20.5833C8.66671 20.0087 8.43843 19.4576 8.03211 19.0513C7.62578 18.6449 7.07468 18.4167 6.50004 18.4167C5.9254 18.4167 5.3743 18.6449 4.96798 19.0513C4.56165 19.4576 4.33337 20.0087 4.33337 20.5833Z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.25 20.5833C16.25 21.158 16.4783 21.7091 16.8846 22.1154C17.2909 22.5217 17.842 22.75 18.4167 22.75C18.9913 22.75 19.5424 22.5217 19.9487 22.1154C20.3551 21.7091 20.5833 21.158 20.5833 20.5833C20.5833 20.0087 20.3551 19.4576 19.9487 19.0513C19.5424 18.6449 18.9913 18.4167 18.4167 18.4167C17.842 18.4167 17.2909 18.6449 16.8846 19.0513C16.4783 19.4576 16.25 20.0087 16.25 20.5833Z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path d="M18.4167 18.4167H6.50004V3.25H4.33337" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.5 5.41667L21.6667 6.50001L20.5833 14.0833H6.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </i>
                    {totalBasketCount > 0 && <span className="header-actions__value">{totalBasketCount > 9 ? "9" : totalBasketCount}</span>}
                  </Link>
                </li>
              </ul>
            )}
            <BasketAlert />
          </div>
        </div>
      </header>
      {isTablet && <Category />}
      <div className={classNames("header__wrap", searchActive && "_active", categoryActive && "_active")} />
    </>
  );
}

export default React.memo(Header);
