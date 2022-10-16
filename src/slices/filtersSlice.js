import { createSlice } from '@reduxjs/toolkit';


const filtersSlice = createSlice({
	name: "filtersSlice",
	initialState: {currentFilter: "all"},
	reducers: {
		change: (state, action) => {
			state.currentFilter = action.payload;
		}
	}
})

export const {change} = filtersSlice.actions;
export default filtersSlice.reducer;