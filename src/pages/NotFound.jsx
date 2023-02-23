import React from 'react';

import { Button } from '../components/chuncks';

function NotFound() {

	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<div className="error">
				<div className="_container">
					<div className="error__body">
						<div className="basket__empty basket-empty">
							<span className="basket-empty__emoji">
								🙁
							</span>
							<h1 className="basket-empty__title _title">Страница не найдена</h1>
							<p className="basket-empty__text" style={{ maxWidth: "400px" }}>
								Неправильно набран адрес или такой страницы на сайте больше не существует.
							</p>
							<Button className="basket-empty__button" href="/" tag="Link" orange>
								Перейти на главную страницу
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default NotFound;