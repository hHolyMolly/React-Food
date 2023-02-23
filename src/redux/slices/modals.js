import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpened: false
};

const modalSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		setOpenedModal(state, action) {
			state.isOpened = action.payload;

			const paddingValue = window.innerWidth - document.querySelector("#root").offsetWidth + "px";

			document.body.style.paddingRight = paddingValue;

			document.body.style.overflow = "hidden";
		}
	}
});

export const {
	setOpenedModal
} = modalSlice.actions;

export default modalSlice.reducer;