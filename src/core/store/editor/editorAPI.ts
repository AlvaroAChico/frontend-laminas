import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURLLaminas = "https://test.elaminas.com/api";
// const baseURLLaminasLocal = "http://127.0.0.1:8000";

export interface LaminaResponse {
  currentPage: number;
  data: LaminaDefaultProps[];
  firstPageUrl: string;
  from: number;
  lastPage: number;
  lastPageUrl: string;
  nextPageUrl: string;
  path: string;
  perPage: number;
  prevPageUrl: string;
  to: number;
  total: number;
}
export interface LaminaDefaultProps {
  tbllmnacdgo: number;
  tbllmnacoda: string;
  tbllmnanomb: string;
  tbllmnaimgo: string;
}
// headers: {
//   Authorization: "Bearer 4|0i0rBahxncLmZ5yUDjtLxtVCcOqdtuMyE9iJVRHx",
//   AccessControlAllowOrigin: "*",
//   Accetp: "text/html",
// },
export const laminasApi = createApi({
  reducerPath: "laminasApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURLLaminas,
    prepareHeaders: (headers) => {
      const token = "9|wNGdQYaz4BPxXKQ9C9puidkDgAFtpienXELn24E2";
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "text/html,image/apng,application/pdf");
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getListLaminas: build.query<LaminaResponse, any>({
      query: () => ({
        url: `/laminas?sort=tbllmnacdgo&render=paginate`,
        method: "GET",
      }),
      transformResponse: (response: LaminaResponse) => response,
    }),
    postLaminasByWord: build.mutation<LaminaResponse, string>({
      query: (searchWord) => ({
        url: `/laminas?sort=tbllmnacdgo&render=paginate&filter[tbllmnanomb]=${searchWord}`,
        method: "GET",
      }),
      transformResponse: (response: LaminaResponse) => response,
    }),
  }),
});

export const { useGetListLaminasQuery, usePostLaminasByWordMutation } =
  laminasApi;
