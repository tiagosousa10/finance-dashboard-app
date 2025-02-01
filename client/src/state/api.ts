import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse } from "./types";
//use redux to manage state of the app
export const api = createApi({
   baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}),
   reducerPath: "main",
   tagTypes: ["Kpis"],
   endpoints: (build) => ({
      getKpis: build.query<Array<GetKpisResponse>,void>({
         query: () => "kpi/kpis/",
         providesTags: ["Kpis"]
      }),
   })
})


export const {useGetKpisQuery} = api; //hooks -> useGetKpisQuery => getKpis
