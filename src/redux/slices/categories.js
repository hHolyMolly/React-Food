import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isActive: false,
	filters: null,
	isActiveFilters: false
};

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setOpenedCategory(state, action) {
			state.isActive = action.payload;
		},
		setFiltersCategory(state, action) {
			state.filters = action.payload;
		},
		setOpenedFiltersCategory(state, action) {
			state.isActiveFilters = action.payload;
		}
	}
});

export const {
	setOpenedCategory,
	setFiltersCategory,
	setOpenedFiltersCategory

} = categoriesSlice.actions;

export default categoriesSlice.reducer;