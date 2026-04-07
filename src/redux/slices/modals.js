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
		}
	}
});

export const {
	setOpenedModal
} = modalSlice.actions;

export default modalSlice.reducer;