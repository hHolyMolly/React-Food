import React from 'react';
import { useDispatch } from 'react-redux';

import instance from '../instance';

import { MainSlider, Products } from '../components/sections/';
import { Button } from '../components/chuncks';
import { setOpenedCategory } from '../redux/slices/categories';

function Home() {
	const dispatch = useDispatch();

	const [isSlider, setIsSlider] = React.useState(false);
	const [isCategory, setIsCategory] = React.useState(false);

	const [popularPizza, setPopularPizza] = React.useState([]);
	const [loadingPizza, setLoadingPizza] = React.useState(true);

	const [popularSushi, setPopularSushi] = React.useState([]);
	const [loadingSushi, setLoadingSushi] = React.useState(true);

	const [popularDrink, setPopularDrink] = React.useState([]);
	const [loadingDrink, setLoadingDrink] = React.useState(true);

	const categoryOpen = () => dispatch(setOpenedCategory(true));

	const setResize = () => {
		window.innerWidth > 1199.98 ? setIsSlider(false) : setIsSlider(true);
		window.innerWidth > 991.98 ? setIsCategory(false) : setIsCategory(true);
	};

	React.useEffect(() => {
		window.addEventListener("resize", setResize);
		setResize();

		const sortBy = 'sortBy=rating&order=desc&page=1&limit=5';

		async function loadPopular() {
			try {
				const { data } = await instance({
					url: `Products/?${sortBy}&category=pizza`,
					method: 'GET'
				});
				setPopularPizza(data);
				setLoadingPizza(false);
			} catch (error) {
				setLoadingPizza(true);
			}

			try {
				const { data } = await instance({
					url: `Products/?${sortBy}&category=sushi`,
					method: 'GET'
				});
				setPopularSushi(data);
				setLoadingSushi(false);
			} catch (error) {
				setLoadingSushi(true);
			}

			try {
				const { data } = await instance({
					url: `Products/?${sortBy}&category=drink`,
					method: 'GET'
				});
				setPopularDrink(data);
				setLoadingDrink(false);
			} catch (error) {
				setLoadingDrink(true);
			}
		}
		loadPopular();

		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<MainSlider />
			{isCategory &&
				<div className="category-main">
					<div className="_container">
						<div className="category-main__body">
							<Button className="header-category__button category-button category-button" onClick={categoryOpen} orange>
								<i className="category-button__icon header-category__icon">
									<svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M1 1H9V9H1V1Z" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M13 1H21V9H13V1Z" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M1 13H9V21H1V13Z" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M13 17C13 18.0609 13.4214 19.0783 14.1716 19.8284C14.9217 20.5786 15.9391 21 17 21C18.0609 21 19.0783 20.5786 19.8284 19.8284C20.5786 19.0783 21 18.0609 21 17C21 15.9391 20.5786 14.9217 19.8284 14.1716C19.0783 13.4214 18.0609 13 17 13C15.9391 13 14.9217 13.4214 14.1716 14.1716C13.4214 14.9217 13 15.9391 13 17Z" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</i>
								<span className="category-button__text header-category__text">Категории</span>
							</Button>
						</div>
					</div>
				</div>}
			<Products
				title="Популярные пиццы"
				items={popularPizza}
				isSlider={isSlider}
				isLoading={loadingPizza}
			/>
			<Products
				title="Популярные роллы"
				items={popularSushi}
				isSlider={isSlider}
				isLoading={loadingSushi}
			/>
			<Products
				title="Популярные напитки"
				items={popularDrink}
				isSlider={isSlider}
				isLoading={loadingDrink}
			/>
		</>
	);
}

export default Home;
