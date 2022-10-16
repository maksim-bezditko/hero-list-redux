import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const filtersAPI = createApi({
	reducerPath: "filtersAPI",
	baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001/"}),
	tagTypes: ["filters"],
	endpoints: builder => ({
		getFilters: builder.query({
			query: () => ({
				url: "/filters"
			}),

			providesTags: ["filters"]
		})
	})
})

export const {useGetFiltersQuery} = filtersAPI;