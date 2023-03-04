import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURLLaminas = "https://test.elaminas.com/api";
const baseURLLaminasLocal = "http://127.0.0.1:8000";

export const laminasApi = createApi({
  reducerPath: "laminasApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURLLaminasLocal,
  }),
  endpoints: (build) => ({
    getListLaminas: build.query<any, string>({
      query: (codeLamina) => ({
        url: `/laminas?sort=${codeLamina}&render=paginate`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetListLaminasQuery } = laminasApi;
