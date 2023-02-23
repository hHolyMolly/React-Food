import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
	totalCount: 0,
	totalPrice: 0
};

function setTotal(state) {
	state.totalCount = state.items.reduce((sum, item) => item.count + sum, 0);

	state.totalPrice = state.items.reduce((sum, item) => (
		item.price.stock ? item.price.stock * item.count + sum : item.price.value * item.count + sum
	), 0);
}

const favoriteSlice = createSlice({
	name: 'favorite',
	initialState,
	reducers: {
		setLoadFavorite(state, action) {
			state.items = action.payload;

			setTotal(state);
		},
		setAddProductToFavorite(state, action) {
			state.items.push({
				...action.payload,
				count: 1
			});

			setTotal(state);
		},
		setMinusProductToFavorite(state, action) {
			const findItem = state.items.find((item) => item.parentId === action.payload);
			if (findItem.count > 1) {
				findItem.count--;
			}
			setTotal(state);
		},
		setPlusProductToFavorite(state, action) {
			const findItem = state.items.find((item) => item.parentId === action.payload);
			if (findItem.count < 9) {
				findItem.count++;
			}
			setTotal(state);
		},
		setRemoveProductFromFavorite(state, action) {
			state.items = state.items.filter((obj) => obj.parentId !== action.payload);

			setTotal(state);
		},
		setClearFavorite(state) {
			state.items = [];

			setTotal(state);
		}
	}
});

export const {
	setLoadFavorite,
	setAddProductToFavorite,
	setMinusProductToFavorite,
	setPlusProductToFavorite,
	setRemoveProductFromFavorite,
	setClearFavorite
} = favoriteSlice.actions;

export default favoriteSlice.reducer;