import React from 'react';
import { useSelector } from 'react-redux';

import ModalLayout from '../layouts/ModalLayout';

function Error({
	thisModal
}) {
	const { isOpened } = useSelector(({ modals }) => modals);

	return (
		<ModalLayout className={thisModal === isOpened ? "_active" : ""}>
			asd
		</ModalLayout>
	);
}

export default Error;