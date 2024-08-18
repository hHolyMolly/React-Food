import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isActive: false
};

const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		setHandleMenu(state, action) {
			state.isActive = action.payload;
		}
	}
});

export const {
	setHandleMenu,
} = menuSlice.actions;

export default menuSlice.reducer;