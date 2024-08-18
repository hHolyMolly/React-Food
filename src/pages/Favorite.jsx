import React from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { setOpenedModal } from '../redux/slices/modals';
import { setAddProductToBasket, setAlertBasket } from '../redux/slices/basket';

import { Products } from '../components/sections';
import { Button } from '../components/chuncks';

function Favorite() {
	const dispatch = useDispatch();
	const { items: favoriteItems, totalCount, totalPrice } = useSelector(({ favorite }) => favorite);
	const { items: basketItems } = useSelector(({ basket }) => basket);

	const clearFavorite = () => dispatch(setOpenedModal('clear-favorite'));

	const addAllProductToBasket = () => {
		favoriteItems.forEach((item) => {

			const findItemBasket = basketItems.find((obj) => obj.parentId === item.id);

			const itemBasket = {
				id: item.id,
				parentId: item.id,
				imageUrl: item.images[0].imageUrl,
				title: item.title,
				contain: item.contain,
				category: item.category,
				price: item.price,
				stock: item.stock
			};

			if (!findItemBasket) {
				dispatch(setAddProductToBasket(itemBasket));
				dispatch(setAlertBasket(true));
			};
		})
	};

	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className={classNames(
			"favorite",
			favoriteItems.length < 1 && "_empty"
		)}>
			<div className="favorite__body">
				{favoriteItems.length > 0 ?
					<>
						<div className="favorite__top favorite-top _container">
							<h1 className="favorite-top__title _title">Список желаний</h1>
							<button className="favorite-top__clear" onClick={clearFavorite} type="button">
								<i className="favorite-top__clear-icon">
									<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M1 4.5H17" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M7 8.5V14.5" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M11 8.5V14.5" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M2 4.5L3 16.5C3 17.0304 3.21071 17.5391 3.58579 17.9142C3.96086 18.2893 4.46957 18.5 5 18.5H13C13.5304 18.5 14.0391 18.2893 14.4142 17.9142C14.7893 17.5391 15 17.0304 15 16.5L16 4.5" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M6 4.5V1.5C6 1.23478 6.10536 0.98043 6.29289 0.792893C6.48043 0.605357 6.73478 0.5 7 0.5H11C11.2652 0.5 11.5196 0.605357 11.7071 0.792893C11.8946 0.98043 12 1.23478 12 1.5V4.5" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</i>
								<span className="favorite-top__clear-text">
									Очистить список желаний
								</span>
							</button>
						</div>
						<Products
							title={false}
							items={favoriteItems}
							isLoading={false}
						/>
						<div className="basket__footer basket-footer _container">
							<p className="basket-footer__text">
								Всего товаров:
								<strong className="basket-footer__text_strong">{totalCount} шт.</strong>
							</p>
							<div className="basket-footer__row">
								<p className="basket-footer__text">
									Общая сумма:
									<strong className="basket-footer__text_strong">{totalPrice}₴</strong>
								</p>
								<Button className="basket-footer__button" onClick={addAllProductToBasket} orange>
									Купить все
								</Button>
							</div>
						</div>
					</> :
					<div className="_container">
						<div className="basket__empty basket-empty">
							<span className="basket-empty__emoji">
								🙁
							</span>
							<h1 className="basket-empty__title _title">Ваш список желаний пуст</h1>
							<p className="basket-empty__text">
								Наполните его товарами
							</p>
							<Button className="basket-empty__button" href="/" tag="Link" orange>
								Вернуться назад
							</Button>
						</div>
					</div>}
			</div>
		</div>
	)
}

export default Favorite;