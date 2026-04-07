import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { setClearBasket } from '../../redux/slices/basket';
import { setOpenedModal } from '../../redux/slices/modals';
import { unlockBody } from '../../utils/bodyLock';

import ModalLayout from '../layouts/ModalLayout';

import { Button } from '../chuncks';

function PurchaseSuccess({
	thisModal
}) {
	const dispatch = useDispatch();
	const { isOpened } = useSelector(({ modals }) => modals);

	React.useEffect(() => {
		if (thisModal === isOpened) {
			dispatch(setClearBasket());
		}
	}, [isOpened, thisModal, dispatch]);

	const onCloseModal = () => {
		dispatch(setOpenedModal(false));

		setTimeout(() => {
			unlockBody();
		}, 300);
	};

	return (
		<ModalLayout
			title="Заказ оформлен"
			className={classNames(
				thisModal === isOpened && "_active"
			)}
		>
			<div className="modal-clear__column">
				<span className="modal-clear__emoji">
					🎉
				</span>
				<p className="modal-clear__text">
					Спасибо за покупку! Ваш заказ успешно оформлен.
				</p>
			</div>
			<div className="modal-clear__footer">
				<Button className="modal-clear__button" onClick={onCloseModal} href="/" tag="Link" orange>
					На главную
				</Button>
			</div>
		</ModalLayout>
	);
}

export default PurchaseSuccess;
