import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
	totalCount: 0,
	totalPrice: 0,
	alert: false
};

function setTotal(state) {
	state.totalCount = state.items.reduce((sum, item) => item.count + sum, 0);

	state.totalPrice = state.items.reduce((sum, item) => (
		item.price.stock ? item.price.stock * item.count + sum : item.price.value * item.count + sum
	), 0);
}

const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		setLoadBasket(state, action) {
			state.items = action.payload;

			setTotal(state);
		},
		setAddProductToBasket(state, action) {
			state.items.push({
				...action.payload,
				count: 1
			});

			setTotal(state);
		},
		setMinusProductToBasket(state, action) {
			const findItem = state.items.find((item) => item.parentId === action.payload);
			if (findItem.count > 1) {
				findItem.count--;
			}
			setTotal(state);
		},
		setPlusProductToBasket(state, action) {
			const findItem = state.items.find((item) => item.parentId === action.payload);
			if (findItem.count < 9) {
				findItem.count++;
			}
			setTotal(state);
		},
		setRemoveProductFromBasket(state, action) {
			state.items = state.items.filter((obj) => obj.parentId !== action.payload);

			setTotal(state);
		},
		setClearBasket(state) {
			state.items = [];

			setTotal(state);
		},
		setAlertBasket(state, action) {
			state.alert = action.payload;
		}
	}
});

export const {
	setLoadBasket,
	setAddProductToBasket,
	setMinusProductToBasket,
	setPlusProductToBasket,
	setRemoveProductFromBasket,
	setClearBasket,
	setAlertBasket
} = basketSlice.actions;

export default basketSlice.reducer;