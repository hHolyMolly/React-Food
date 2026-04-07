import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { setClearBasket } from '../../redux/slices/basket';
import { setOpenedModal } from '../../redux/slices/modals';
import { unlockBody } from '../../utils/bodyLock';

import ModalLayout from '../layouts/ModalLayout';

import { Button } from '../chuncks';

function ClearBasket({
	thisModal
}) {
	const dispatch = useDispatch();
	const { isOpened } = useSelector(({ modals }) => modals);

	const onClearBasket = () => {
		dispatch(setClearBasket());
		onCloseModal();
	};

	const onCloseModal = () => {
		dispatch(setOpenedModal(false));

		setTimeout(() => {
			unlockBody();
		}, 300);
	};

	return (
		<ModalLayout
			title="Удалить товары"
			className={classNames(
				thisModal === isOpened && "_active"
			)}
		>
			<div className="modal-clear__column">
				<span className="modal-clear__emoji">
					🙁
				</span>
				<p className="modal-clear__text">
					Вы действительно хотите очистить корзину?
				</p>
			</div>
			<div className="modal-clear__footer">
				<Button className="modal-clear__button" onClick={onCloseModal} orange>
					Нет
				</Button>
				<Button className="modal-clear__button" onClick={onClearBasket} orange>
					Да
				</Button>
			</div>
		</ModalLayout>
	);
}

export default ClearBasket;