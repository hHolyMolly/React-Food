import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { timeToWork, phone } from "../../../global";

import { setOpenedCategory } from "../../../redux/slices/categories";

import { Button } from "../../chuncks";

function MenuContent({ setCloseMenu }) {
  const dispatch = useDispatch();
  const totalBasketCount = useSelector((state) => state.basket.totalCount);
  const totalFavoriteCount = useSelector((state) => state.favorite.totalCount);

  const isOpenedCategory = React.useCallback(() => {
    setCloseMenu();

    dispatch(setOpenedCategory(true));
  }, [setCloseMenu]);

  const onCloseMenu = React.useCallback(() => {
    setCloseMenu();
  }, [setCloseMenu]);

  return (
    <div className="menu__content menu-content">
      <p className="menu-content__work">{timeToWork}</p>
      <Button className="header-category__button category-button menu-content__category" onClick={isOpenedCategory} orange>
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
      <Link className="menu-content__item" onClick={onCloseMenu} to="/basket">
        <i className="menu-content__item-icon">
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
        <p className="menu-content__item-text">Корзина</p>
        {totalBasketCount > 0 && <span className="menu-content__item-value">{totalBasketCount > 9 ? "9" : totalBasketCount}</span>}
      </Link>
      <Link className="menu-content__item" onClick={onCloseMenu} to="/favorite">
        <i className="menu-content__item-icon">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21.125 13.6197L13 21.6667L4.87504 13.6197C4.33912 13.0982 3.91699 12.4713 3.63522 11.7787C3.35345 11.086 3.21815 10.3425 3.23784 9.595C3.25753 8.84749 3.43178 8.11214 3.74963 7.43527C4.06747 6.75841 4.52202 6.15469 5.08465 5.66212C5.64728 5.16956 6.30581 4.79882 7.01875 4.57326C7.7317 4.34771 8.48363 4.27221 9.22719 4.35153C9.97075 4.43085 10.6898 4.66326 11.3392 5.03414C11.9885 5.40502 12.554 5.90633 13 6.50649C13.448 5.91068 14.0142 5.41376 14.6631 5.04681C15.3119 4.67987 16.0296 4.45081 16.7711 4.37397C17.5125 4.29713 18.2619 4.37417 18.9722 4.60025C19.6825 4.82634 20.3386 5.19661 20.8992 5.68789C21.4599 6.17917 21.9131 6.78088 22.2305 7.45538C22.5479 8.12987 22.7227 8.86262 22.7439 9.60776C22.7651 10.3529 22.6322 11.0944 22.3537 11.7858C22.0751 12.4773 21.6569 13.1038 21.125 13.6262"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </i>
        <p className="menu-content__item-text">Список желаний</p>
        {totalFavoriteCount > 0 && <span className="menu-content__item-value">{totalFavoriteCount > 9 ? "9" : totalFavoriteCount}</span>}
      </Link>
      <a className="menu-content__item" href={`tel:+${phone}`}>
        <i className="menu-content__item-icon">
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 2H7L9 7L6.5 8.5C7.57096 10.6715 9.32847 12.429 11.5 13.5L13 11L18 13V17C18 17.5304 17.7893 18.0391 17.4142 18.4142C17.0391 18.7893 16.5304 19 16 19C12.0993 18.763 8.42015 17.1065 5.65683 14.3432C2.8935 11.5798 1.23705 7.90074 1 4C1 3.46957 1.21071 2.96086 1.58579 2.58579C1.96086 2.21071 2.46957 2 3 2Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M13 5C13.5304 5 14.0391 5.21071 14.4142 5.58579C14.7893 5.96086 15 6.46957 15 7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 1C14.5913 1 16.1174 1.63214 17.2426 2.75736C18.3679 3.88258 19 5.4087 19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </i>
        <p className="menu-content__item-text">+{phone}</p>
      </a>
    </div>
  );
}

export default React.memo(MenuContent);
