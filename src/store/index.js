import { configureStore } from '@reduxjs/toolkit';
import heroesReducer from '../slices/heroesSlice';
import filtersReducer from '../slices/filtersSlice';

const customMiddleware = (store) => (dispatch) => (action) => {
	if (typeof action === "function") {
		return dispatch(action())	
	} else if (typeof action === "string") {
		return dispatch({type: action})
	} else {
		return dispatch(action)
	}
}

const store = configureStore({
	reducer: {heroesRed: heroesReducer, filtersRed: filtersReducer},
	devTools: process.env.NODE_ENV !== "production",
	middleware: getDefaultMiddleware => [...getDefaultMiddleware(), customMiddleware] // redux-thunk is already included to getDefaultMiddleware function
})

export default store;