import { configureStore } from '@reduxjs/toolkit';

import device from './slices/device';

import modals from './slices/modals';

import menu from './slices/menu';
import categories from './slices/categories';

import products from './slices/products';

import basket from './slices/basket';
import favorite from './slices/favorite';

import search from './slices/search';

const store = configureStore({
	reducer: {
		device,
		modals,
		menu,
		categories,
		products,
		basket,
		favorite,
		search
	}
});

export default store;