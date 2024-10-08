import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import { setAddProductToBasket, setAlertBasket } from "../../redux/slices/basket";
import { setAddProductToFavorite, setRemoveProductFromFavorite } from "../../redux/slices/favorite";

import { Button } from "./";

function ProductCard({ id, images, title, contain, category, price, stock }) {
  const dispatch = useDispatch();
  const { isMobile } = useSelector(({ device }) => device);

  const { items: basketItems } = useSelector(({ basket }) => basket);
  const { items: favoriteItems } = useSelector(({ favorite }) => favorite);

  const addedToFavorite = () => {
    const itemFavorite = {
      id,
      parentId: id,
      images: images,
      title,
      contain,
      category,
      price,
      stock,
    };

    !findItemFavorite ? dispatch(setAddProductToFavorite(itemFavorite)) : dispatch(setRemoveProductFromFavorite(itemFavorite.parentId));
  };

  const addedToBasket = () => {
    const itemBasket = {
      id,
      parentId: id,
      imageUrl: images[0].imageUrl,
      title,
      contain,
      category,
      price,
      stock,
    };

    if (!findItemBasket) {
      dispatch(setAddProductToBasket(itemBasket));
      dispatch(setAlertBasket(true));
    }
  };

  const findItemBasket = basketItems.find((obj) => obj.parentId === id);
  const findItemFavorite = favoriteItems.find((obj) => obj.parentId === id);

  const ButtonBasket = () => {
    if (!findItemBasket) {
      return (
        <Button className="product-card-footer__basket" onClick={addedToBasket} orange>
          <span className="product-card-footer__basket-text">Купить</span>
          <i className="product-card-footer__basket-icon">
            <svg width="22" height="22" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.33337 20.5833C4.33337 21.158 4.56165 21.7091 4.96798 22.1154C5.3743 22.5217 5.9254 22.75 6.50004 22.75C7.07468 22.75 7.62578 22.5217 8.03211 22.1154C8.43843 21.7091 8.66671 21.158 8.66671 20.5833C8.66671 20.0087 8.43843 19.4576 8.03211 19.0513C7.62578 18.6449 7.07468 18.4167 6.50004 18.4167C5.9254 18.4167 5.3743 18.6449 4.96798 19.0513C4.56165 19.4576 4.33337 20.0087 4.33337 20.5833Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.25 20.5833C16.25 21.158 16.4783 21.7091 16.8846 22.1154C17.2909 22.5217 17.842 22.75 18.4167 22.75C18.9913 22.75 19.5424 22.5217 19.9487 22.1154C20.3551 21.7091 20.5833 21.158 20.5833 20.5833C20.5833 20.0087 20.3551 19.4576 19.9487 19.0513C19.5424 18.6449 18.9913 18.4167 18.4167 18.4167C17.842 18.4167 17.2909 18.6449 16.8846 19.0513C16.4783 19.4576 16.25 20.0087 16.25 20.5833Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M18.4167 18.4167H6.50004V3.25H4.33337" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.5 5.41667L21.6667 6.50001L20.5833 14.0833H6.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </i>
        </Button>
      );
    } else {
      return (
        <Button className="product-card-footer__basket _disabled" href="/basket" tag="Link" orange>
          <span className="product-card-footer__basket-text">В корзине</span>
          <i className="product-card-footer__basket-icon">
            <svg width="22" height="22" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.33337 20.5833C4.33337 21.158 4.56165 21.7091 4.96798 22.1154C5.3743 22.5217 5.9254 22.75 6.50004 22.75C7.07468 22.75 7.62578 22.5217 8.03211 22.1154C8.43843 21.7091 8.66671 21.158 8.66671 20.5833C8.66671 20.0087 8.43843 19.4576 8.03211 19.0513C7.62578 18.6449 7.07468 18.4167 6.50004 18.4167C5.9254 18.4167 5.3743 18.6449 4.96798 19.0513C4.56165 19.4576 4.33337 20.0087 4.33337 20.5833Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.25 20.5833C16.25 21.158 16.4783 21.7091 16.8846 22.1154C17.2909 22.5217 17.842 22.75 18.4167 22.75C18.9913 22.75 19.5424 22.5217 19.9487 22.1154C20.3551 21.7091 20.5833 21.158 20.5833 20.5833C20.5833 20.0087 20.3551 19.4576 19.9487 19.0513C19.5424 18.6449 18.9913 18.4167 18.4167 18.4167C17.842 18.4167 17.2909 18.6449 16.8846 19.0513C16.4783 19.4576 16.25 20.0087 16.25 20.5833Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M18.4167 18.4167H6.50004V3.25H4.33337" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.5 5.41667L21.6667 6.50001L20.5833 14.0833H6.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </i>
        </Button>
      );
    }
  };

  const linkToProduct = `/category/${category}/${id}`;

  return (
    <article className="product-card">
      {price.stock && <strong className="product-card__label">Акция</strong>}
      <button className={classNames("product-card__favorite", findItemFavorite && "_active")} onClick={addedToFavorite} type="button">
        <svg width="25" height="25" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21.125 13.6197L13 21.6667L4.87504 13.6197C4.33912 13.0982 3.91699 12.4713 3.63522 11.7787C3.35345 11.086 3.21815 10.3425 3.23784 9.595C3.25753 8.84749 3.43178 8.11214 3.74963 7.43527C4.06747 6.75841 4.52202 6.15469 5.08465 5.66212C5.64728 5.16956 6.30581 4.79882 7.01875 4.57326C7.7317 4.34771 8.48363 4.27221 9.22719 4.35153C9.97075 4.43085 10.6898 4.66326 11.3392 5.03414C11.9885 5.40502 12.554 5.90633 13 6.50649C13.448 5.91068 14.0142 5.41376 14.6631 5.04681C15.3119 4.67987 16.0296 4.45081 16.7711 4.37397C17.5125 4.29713 18.2619 4.37417 18.9722 4.60025C19.6825 4.82634 20.3386 5.19661 20.8992 5.68789C21.4599 6.17917 21.9131 6.78088 22.2305 7.45538C22.5479 8.12987 22.7227 8.86262 22.7439 9.60776C22.7651 10.3529 22.6322 11.0944 22.3537 11.7858C22.0751 12.4773 21.6569 13.1038 21.125 13.6262"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isMobile ? (
        <Link className="product-card__slide-link _ibg" title={title} to={linkToProduct}>
          <img src={`./img/sections/products/${category}/${images[0].imageUrl}`} loading="lazy" alt={title} />
        </Link>
      ) : (
        <Swiper modules={[Navigation]} spaceBetween={15} navigation={images.length > 1 ? true : false} speed={300} allowTouchMove={false} loop={true}>
          {images.map((slider, idx) => (
            <SwiperSlide key={`image-slider_${title}-${idx}`}>
              <Link className="product-card__slide-link _ibg" title={title} to={linkToProduct}>
                <img src={`./img/sections/products/${category}/${slider.imageUrl}`} loading="lazy" alt={title} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="product-card__content">
        <Link className="product-card__title" title={title} to={linkToProduct}>
          {title}
        </Link>
        {contain && <p className="product-card__text">{contain}</p>}
        <div className="product-card__footer product-card-footer">
          <div className="product-card-footer__row">
            <span className="product-card-footer__text">Стоимость:</span>
            <strong className={classNames("product-card-footer__price", price.stock && "product-card-footer__price_stock")}>{price.value}₴</strong>
            {price.stock && <strong className="product-card-footer__price product-card-footer__price_absolute">{price.stock}₴</strong>}
          </div>
          <ButtonBasket />
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
