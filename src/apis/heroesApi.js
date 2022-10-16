import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const heroesAPI = createApi({
	reducerPath: "heroesAPI",
	baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001/"}),
	tagTypes: ["heroes"],
	endpoints: builder => ({
		getHeroes: builder.query({
			query: () => ({
				url: "/heroes"
			}),
			providesTags: ["heroes"]
		}),

		deleteHero: builder.mutation({
			query: heroId => ({
				url: `heroes/${heroId}`,
				method: "DELETE"
			}),
			invalidatesTags: ["heroes"]
		}),
		postHero: builder.mutation({
			query: heroObj => ({
				url: "heroes",
				method: "POST",
				body: heroObj   // ! automatically converted to JSON
			}),
			invalidatesTags: ["heroes"]
		})
	})
})

export const {useGetHeroesQuery, usePostHeroMutation, useDeleteHeroMutation} = heroesAPI;