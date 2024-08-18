import React from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setMinusProductToBasket, setPlusProductToBasket, setRemoveProductFromBasket } from "../../redux/slices/basket";

function BasketCard({ id, parentId, imageUrl, title, contain, category, price, stock, count }) {
  const dispatch = useDispatch();

  const removeCardFromBasket = React.useCallback(() => {
    dispatch(setRemoveProductFromBasket(parentId));
  }, [parentId]);

  const minusProductCount = React.useCallback(() => {
    dispatch(setMinusProductToBasket(parentId));
  }, [parentId]);

  const plusProductCount = React.useCallback(() => {
    dispatch(setPlusProductToBasket(parentId));
  }, [parentId]);

  const linkToProduct = `/category/${category}/${parentId}`;

  return (
    <article className="basket-card">
      <div className="basket-card__block">
        {price.stock && <div className="basket-card__label">Акция</div>}
        <Link className="basket-card__img" title={title} to={linkToProduct}>
          <img src={`./img/sections/products/${category}/${imageUrl}`} loading="lazy" alt={title} />
        </Link>
        <div className="basket-card__row">
          <Link className="basket-card__title" title={title} to={linkToProduct}>
            {title}
          </Link>
          {contain && <p className="basket-card__text">{contain}</p>}
        </div>
      </div>
      <div className="basket-card__column">
        <div className="basket-card__actions basket-card-actions">
          <button className={classNames("basket-card-actions__button", count === 1 && "_disabled")} onClick={minusProductCount} type="button">
            <svg width="12" height="3" viewBox="0 0 12 3" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="basket-card-actions__count">{count}</span>
          <button className={classNames("basket-card-actions__button", count === 9 && "_disabled")} onClick={plusProductCount} type="button">
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 1.5V11.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1 6.5H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="basket-card__price">
          <span className={classNames("basket-card__price-text", price.stock && "basket-card__price-text_stock")}>{price.value}₴</span>
          {price.stock && <div className="basket-card__price-text">{price.stock}₴</div>}
        </div>
        <button onClick={removeCardFromBasket} className="basket-card__remove" type="button">
          <i className="basket-card__remove-icon">
            <svg width="16" height="17" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4.5H17" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 8.5V14.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11 8.5V14.5" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M2 4.5L3 16.5C3 17.0304 3.21071 17.5391 3.58579 17.9142C3.96086 18.2893 4.46957 18.5 5 18.5H13C13.5304 18.5 14.0391 18.2893 14.4142 17.9142C14.7893 17.5391 15 17.0304 15 16.5L16 4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 4.5V1.5C6 1.23478 6.10536 0.98043 6.29289 0.792893C6.48043 0.605357 6.73478 0.5 7 0.5H11C11.2652 0.5 11.5196 0.605357 11.7071 0.792893C11.8946 0.98043 12 1.23478 12 1.5V4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </i>
          <span className="basket-card__remove-text">Удалить</span>
        </button>
      </div>
    </article>
  );
}

export default React.memo(BasketCard);
