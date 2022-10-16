import { configureStore } from '@reduxjs/toolkit';
import { heroesAPI } from '../apis/heroesApi';
import { filtersAPI } from '../apis/filtersApi';
import filtersReducer from "../slices/filtersSlice";

const store = configureStore({
	reducer: {
		[heroesAPI.reducerPath]: heroesAPI.reducer,
		[filtersAPI.reducerPath]: filtersAPI.reducer,
		filtersSlice: filtersReducer
	},
	devTools: process.env.NODE_ENV !== "production",
	middleware: getDefaultMiddleware => (
		[...getDefaultMiddleware(), 
			heroesAPI.middleware,
			filtersAPI.middleware]
	)
})

export default store;