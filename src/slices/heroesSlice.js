import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle'
}

const fetchHeroes = createAsyncThunk(
	"heroes/fetchHeroes",
	() => {
		const {request} = useHttp();
		return request("http://localhost:3001/heroes")
	}
)

const postHeroToDB = createAsyncThunk(
	"heroes/postHeroToDB",
	(objectToPost) => {
		const {request} = useHttp();
		const body = JSON.stringify(objectToPost)

		return request("http://localhost:3001/heroes", "POST", body)
	}
)

const heroesSlice = createSlice({
	name: "heroes",
	initialState,
	reducers: {
		_delete: (state, action) => {
			state.heroes = state.heroes.filter(item => item.id !== action.payload);
			state.heroesLoadingStatus = "idle";
		}, 
		post: (state, action) => {
			state.heroes = state.heroes.concat(action.payload);
			state.heroesLoadingStatus = "idle";
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchHeroes.pending, state => {
				state.heroesLoadingStatus = "loading";
			})
			.addCase(fetchHeroes.fulfilled, (state, action) => {
				state.heroes = action.payload;
				state.heroesLoadingStatus = "idle";
			})
			.addCase(fetchHeroes.rejected, state => {
				state.heroesLoadingStatus ='error';
			})

			.addDefaultCase(() => {})
	}
})

export const { _delete, post } = heroesSlice.actions
export {fetchHeroes, postHeroToDB}
export default heroesSlice.reducer