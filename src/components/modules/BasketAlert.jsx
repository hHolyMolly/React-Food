import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setAlertBasket } from "../../redux/slices/basket";

function BasketAlert() {
  const dispatch = useDispatch();
  const { alert } = useSelector(({ basket }) => basket);

  React.useEffect(() => {
    if (alert) {
      setTimeout(() => {
        dispatch(setAlertBasket(false));
      }, 2000);
    }
  }, [alert]);

  return (
    <Link className={classNames("basket-alert", alert && "_active")} to="/basket">
      <i className="basket-alert__icon">
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
      <p className="basket-alert__text">Товар добавлен в корзину</p>
    </Link>
  );
}

export default React.memo(BasketAlert);
