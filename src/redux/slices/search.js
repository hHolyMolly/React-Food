import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isActive: false,
	itemsDropdown: [],
	searchBy: ''
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setIsSearchOpen(state, action) {
			state.isActive = action.payload;
		},
		setSearchDropdownItems(state, action) {
			state.itemsDropdown = action.payload;
		},
		setSearchBy(state, action) {
			state.searchBy = action.payload;
		}
	}
});

export const { setIsSearchOpen, setSearchDropdownItems, setSearchBy } = searchSlice.actions;

export default searchSlice.reducer;