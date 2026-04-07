import React from 'react';

import { Error, ClearBasket, ClearFavorite, PurchaseSuccess } from '../modals';

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
			<PurchaseSuccess
				thisModal={"purchase-success"}
			/>
		</div>
	);
}

export default ModalWrapper;