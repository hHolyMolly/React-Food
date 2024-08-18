import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import instance from '../instance';

import { FilterBlock } from '../components/chuncks';
import { Products } from '../components/sections';

function Category() {
	const { filters } = useSelector(({ categories }) => categories);

	const { category } = useParams();

	const [categoryProducts, setCategoryProducts] = React.useState([]);
	const [loadingCategory, setLoadingCategory] = React.useState(true);

	React.useEffect(() => {
		async function loadFullCard() {

			const filterBy = filters !== null ? `sortBy=${filters.option}&order=${filters.value}` : '';

			if (category !== undefined) {
				try {

					const findProduct = category === "stock" ? '' : `category=${category}`;

					const { data } = await instance({
						url: `Products/?${findProduct}&${filterBy}`,
						method: 'GET'
					});

					if (category === "stock") {
						const findItem = data.filter((item) => item.price.stock);

						setCategoryProducts(findItem);
					} else {
						setCategoryProducts(data);
					}

					setLoadingCategory(false);
				} catch (error) {

				}
			} else {
				setCategoryProducts([]);
			}
		}
		loadFullCard();

		window.scrollTo(0, 0);
	}, [category, filters]);

	const categoryTitle = category === "sushi" && "Роллы" ||
		category === "pizza" && "Пицца" ||
		category === "drink" && "Напитки" ||
		category === "stock" && "Акции";

	return (
		<div className="category">
			<Products
				title={categoryTitle}
				filter={<FilterBlock />}
				items={categoryProducts}
				isSlider={false}
				isLoading={loadingCategory}
			/>
		</div>
	);
}

export default Category;