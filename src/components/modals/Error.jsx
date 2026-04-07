import React from 'react';
import { useSelector } from 'react-redux';

import ModalLayout from '../layouts/ModalLayout';

function Error({
	thisModal
}) {
	const { isOpened } = useSelector(({ modals }) => modals);

	return (
		<ModalLayout title="Ошибка" className={thisModal === isOpened ? "_active" : ""}>
			<div className="modal-clear__column">
				<span className="modal-clear__emoji">😔</span>
				<p className="modal-clear__text">
					Произошла ошибка. Пожалуйста, попробуйте позже.
				</p>
			</div>
		</ModalLayout>
	);
}

export default Error;