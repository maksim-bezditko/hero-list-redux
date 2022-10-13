import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useHttp } from '../hooks/http.hook';

const initialState = {
	filters: [],
	currentFilter: "all"
}

const fetchFilters = createAsyncThunk(
	"filters/fetchFilters",
	() => {
		const {request} = useHttp();

		return request("http://localhost:3001/filters")
	}
)

const filtersSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		change: (state, action) => {
			state.currentFilter = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchFilters.fulfilled, (state, action) => {
				state.filters = action.payload;
			})
			.addDefaultCase(() => {})
	}
})

export const {change} = filtersSlice.actions;
export {fetchFilters}
export default filtersSlice.reducer;