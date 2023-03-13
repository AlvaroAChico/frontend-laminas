import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import productionJSON from "../../../config/environments/production.json";

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
interface ISearchByWorPerPage {
  word: string;
  page?: number;
}
interface IResponseDownload {
  status: string;
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
      const token = productionJSON.app.mocks
        ? "15|QLnP7JXKu1yCu5Y0PeHO6TcFvE81X3twkBvkQMNK  "
        : Cookies.get("jwt_token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "text/html,image/apng,application/pdf");
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getStatusUserDownloads: build.query<LaminaResponse, any>({
      query: () => ({
        url: `/auth/descargas`,
        method: "GET",
      }),
      transformResponse: (response: LaminaResponse) => response,
    }),
    getListLaminas: build.query<LaminaResponse, any>({
      query: () => ({
        url: `/laminas?sort=tbllmnacdgo&render=paginate`,
        method: "GET",
      }),
      transformResponse: (response: LaminaResponse) => response,
    }),
    postLaminasByWord: build.mutation<LaminaResponse, ISearchByWorPerPage>({
      query: ({ word, page }) => ({
        url: `/laminas?sort=tbllmnacdgo&render=paginate&filter[tbllmnanomb]=${word}${
          page ? `&page=${page}` : ""
        }`,
        method: "GET",
      }),
      transformResponse: (response: LaminaResponse) => response,
    }),
    postLaminasByUUID: build.mutation<LaminaResponse, string>({
      query: (uuid) => ({
        url: `/laminas?sort=tbllmnacdgo&render=paginate&filter[tbllmnauuid]=${uuid}`,
        method: "GET",
      }),
      transformResponse: (response: LaminaResponse) => response,
    }),
    postLaminasPerPage: build.mutation<LaminaResponse, number>({
      query: (page) => ({
        url: `/laminas?sort=tbllmnacdgo&render=paginate&page=${page}`,
        method: "GET",
      }),
      transformResponse: (response: LaminaResponse) => response,
    }),
    postUpdateDownloadBySheet: build.mutation<IResponseDownload, string>({
      query: (sheet) => ({
        url: `/auth/actualizar-descargas/${sheet}`,
        method: "GET",
      }),
      transformResponse: (response: IResponseDownload) => response,
    }),
  }),
});

export const {
  useGetStatusUserDownloadsQuery,
  useGetListLaminasQuery,
  usePostLaminasByWordMutation,
  usePostLaminasByUUIDMutation,
  usePostLaminasPerPageMutation,
  usePostUpdateDownloadBySheetMutation,
} = laminasApi;
