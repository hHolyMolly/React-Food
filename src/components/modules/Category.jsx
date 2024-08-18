import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { setFiltersCategory, setOpenedCategory } from '../../redux/slices/categories';

const categoryArr = [
	{ imageUrl: "01.svg", title: "Роллы", url: "category/sushi" },
	{ imageUrl: "02.svg", title: "Пицца", url: "category/pizza" },
	{ imageUrl: "03.svg", title: "Напитки", url: "category/drink" },
	{ imageUrl: "04.svg", title: "Акции", url: "category/stock" }
];

function Category() {
	const dispatch = useDispatch();
	const { isActive } = useSelector(({ categories }) => categories);

	const onCloseDropdown = () => {
		dispatch(setOpenedCategory(false));

		document.body.style.paddingRight = "0px";

		document.body.style.overflow = "auto";
	};

	const selectCategory = () => {
		onCloseDropdown();
		dispatch(setFiltersCategory(null));
	};

	React.useEffect(() => {
		if (!isActive) return;

		const closeOnKey = (e) => {
			if (e.code === 'Escape') onCloseDropdown();
		};

		document.body.addEventListener("keydown", closeOnKey);

		return () => {
			document.body.removeEventListener("keydown", closeOnKey);
		};
	}, [isActive]);

	return (
		<div
			className={classNames(
				"category-dropdown",
				isActive && "_active"
			)}
		>
			<div className="category-dropdown__header category-dropdown-header">
				<h2 className="category-dropdown-header__title">Категории</h2>
				<button className="category-dropdown-header__close _close" onClick={onCloseDropdown} type="close"></button>
			</div>
			<ul className="category-dropdown__content category-dropdown-content">
				{categoryArr.map((category, idx) => (
					<li
						className="category-dropdown-content__item"
						onClick={selectCategory}
						key={`${category.title}_${idx}`}
					>
						<Link className="category-dropdown-content__link" to={`${category.url}`}>
							<i className="category-dropdown-content__icon">
								<img src={`./img/category/${category.imageUrl}`} alt={category.title} />
							</i>
							<span className="category-dropdown-content__text">
								{category.title}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Category;