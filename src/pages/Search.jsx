import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import instance from '../instance';

import { setSearchBy } from '../redux/slices/search';

import { Button } from '../components/chuncks';
import { Products } from '../components/sections/';

function Search() {
	const dispatch = useDispatch();
	const { searchBy } = useSelector(({ search }) => search);

	const [searchProducts, setSearchProducts] = React.useState([]);
	const [loadingSearch, setLoadingSearch] = React.useState(true);

	React.useEffect(() => {
		const query = window.location.hash;

		const replace = query.replace('#/search/?q=', '');
		dispatch(setSearchBy(decodeURI(replace)));

		window.scrollTo(0, 0);
	}, []);

	React.useEffect(() => {
		async function loadSearchProducts() {
			try {
				setLoadingSearch(true);

				const { data } = await instance({
					url: `Products/?search=${searchBy}`,
					method: 'GET',
				});
				setSearchProducts(data);

				setTimeout(() => {
					setLoadingSearch(false);
				}, 300);
			} catch (error) {
				setLoadingSearch(true);
			}
		}
		loadSearchProducts();

		window.scrollTo(0, 0);
	}, [searchBy]);

	return (
		<>
			{!loadingSearch ?
				searchProducts && searchProducts.length > 0 ?
					<Products
						title={`Поиск по запросу: "${searchBy}"`}
						items={searchProducts}
						isLoading={false}
						itemsLoading={15}
					/> :
					<div className="search-empty">
						<span className="search-empty__emoji">
							🙁
						</span>
						<p className="search-empty__text">
							По вашему запросу ничего не найдено. Уточните свой запрос
						</p>
						<Button className="basket-empty__button" href="/" tag="Link" orange>
							Вернуться назад
						</Button>
					</div> :
				<Products
					title={'Загрузка...'}
					items={searchProducts}
					isLoading={true}
					itemsLoading={15}
				/>
			}
		</>
	)
}

export default Search;