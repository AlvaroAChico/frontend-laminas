/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { settingsAPP } from "../../../config/environments/settings";
import { IAuthData } from "../auth/types/auth-types";
import { APP_CONSTANS } from "../../../constants/app";

const baseURLCoupon = settingsAPP.api.coupon;

export const couponAPI = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURLCoupon,
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
    postRedimirCoupon: build.mutation<any, string>({
      query: (codeCoupon) => ({
        url: "/coupons/canjear",
        method: "POST",
        body: {
          code: codeCoupon,
        },
      }),
      transformResponse: (response: any) => response,
    }),
  }),
});

export const { usePostRedimirCouponMutation } = couponAPI;
