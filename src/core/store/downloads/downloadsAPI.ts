/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { settingsAPP } from "../../../config/environments/settings";
import { IAuthData } from "../auth/types/auth-types";
import { APP_CONSTANS } from "../../../constants/app";

const baseURLDownloads = settingsAPP.api.downloads;

export interface IDownloadResponse {
  currentPage: number;
  data: IDownloadsDefaultProps[];
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

export interface IDownloadsDefaultProps {
  id: string;
  size: string;
  enviroment: string;
  formatFile: string;
  setting: string;
  sheetId: string;
  userId: string;
  planId: string;
  createdAt: string;
  sheet: IDownloadData;
}
export interface IDownloadData {
  id: string;
  code: string;
  name: string;
  description: string;
  uuid: string;
  isMostSeen: boolean;
  isRecommended: boolean;
  isHorizontal: boolean;
  summary: string;
  status: string;
  isActive: boolean;
  numberOfViews: number;
  createdAt: string;
  tira: string;
  isFavorite: boolean;
  retira: string;
}

export const downloadsAPI = createApi({
  reducerPath: "downloadsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURLDownloads,
    prepareHeaders: (headers) => {
      const dataUser = Cookies.get(APP_CONSTANS.AUTH_USER_DATA);
      if (dataUser != null && dataUser != undefined) {
        const user = JSON.parse(dataUser) as IAuthData;
        headers.set("authorization", `Bearer ${user.token}`);
      }
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "*/*");

      return headers;
    },
  }),
  endpoints: (build) => ({
    getListAllDownloads: build.mutation<IDownloadResponse, any>({
      query: () => ({
        url: "/downloads?render=paginate&page=1&size=10",
        method: "GET",
      }),
      transformResponse: (response: IDownloadResponse) => response,
    }),
  }),
});

export const { useGetListAllDownloadsMutation } = downloadsAPI;
