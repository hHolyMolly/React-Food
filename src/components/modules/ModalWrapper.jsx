import React from 'react';

import { Error, ClearBasket, ClearFavorite } from '../modals';

function ModalWrapper() {
	return (
		<div className="modal-wrapper">
			<Error
				thisModal={"error"}
			/>
			<ClearBasket
				thisModal={"clear-basket"}
			/>
			<ClearFavorite
				thisModal={"clear-favorite"}
			/>
		</div>
	);
}

export default ModalWrapper;