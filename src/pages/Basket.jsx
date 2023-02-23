import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { BasketCard, Button } from '../components/chuncks';
import { setOpenedModal } from '../redux/slices/modals';

function Basket() {
	const dispatch = useDispatch();
	const { items, totalCount, totalPrice } = useSelector(({ basket }) => basket);

	const clearBasket = () => dispatch(setOpenedModal('clear-basket'));

	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<section className={classNames(
			"basket",
			items.length < 1 && "_empty"
		)}>
			<div className="_container">
				<div className="basket__body">
					{items.length > 0 ?
						<>
							<div className="basket__top basket-top">
								<h1 className="basket-top__title _title">Корзина</h1>
								<button className="basket-top__clear" onClick={clearBasket} type="button">
									<i className="basket-top__clear-icon">
										<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M1 4.5H17" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M7 8.5V14.5" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M11 8.5V14.5" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M2 4.5L3 16.5C3 17.0304 3.21071 17.5391 3.58579 17.9142C3.96086 18.2893 4.46957 18.5 5 18.5H13C13.5304 18.5 14.0391 18.2893 14.4142 17.9142C14.7893 17.5391 15 17.0304 15 16.5L16 4.5" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M6 4.5V1.5C6 1.23478 6.10536 0.98043 6.29289 0.792893C6.48043 0.605357 6.73478 0.5 7 0.5H11C11.2652 0.5 11.5196 0.605357 11.7071 0.792893C11.8946 0.98043 12 1.23478 12 1.5V4.5" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</i>
									<span className="basket-top__clear-text">
										Очистить корзину
									</span>
								</button>
							</div>
							<div className="basket__content">
								{items.map((item, idx) => (
									<BasketCard
										key={`basket-card_${idx}`}
										{...item}
									/>
								))}
							</div>
							<div className="basket__footer basket-footer">
								<p className="basket-footer__text">
									Всего товаров:
									<strong className="basket-footer__text_strong">{totalCount} шт.</strong>
								</p>
								<div className="basket-footer__row">
									<p className="basket-footer__text">
										Сумма заказа:
										<strong className="basket-footer__text_strong">{totalPrice}₴</strong>
									</p>
									<Button className="basket-footer__button" orange>
										Оформить заказ
									</Button>
								</div>
							</div>
						</> :
						<div className="basket__empty basket-empty">
							<h1 className="basket-empty__title _title">Корзина пустая</h1>
							<p className="basket-empty__text">
								Вы ничего не добавляли в корзину. Но это никогда не поздно исправить
							</p>
							<div className="basket-empty__image">
								<img src="./img/sections/basket/empty.svg" alt="Basket is empty" />
							</div>
							<Button className="basket-empty__button" href="/" tag="Link" orange>
								Вернуться назад
							</Button>
						</div>}
				</div>
			</div>
		</section>
	)
}

export default Basket;