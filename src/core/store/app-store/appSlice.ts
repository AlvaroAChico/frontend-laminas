import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IAuthData, IFunctionality } from "../../store/auth/types/auth-types";
import { ISheetDefaultProps } from "../sheets/types/laminas-type";

export interface LandingState {
  valueScroll: number;
  isAuthenticated: boolean;
  statusModalLogin: boolean;
  statusModalRegister: boolean;
  statusModalCoupon: boolean;
  statusModalRecover: boolean;
  statusModalSheetDetail: boolean;
  statusModalPayment: boolean;
  statusModalChangePassword: boolean;
  statusIframePayment: boolean;
  dataUserAuth: IAuthData;
  tokenUserAuth: string;
  functionalitiesAuth: IFunctionality[];
  infoCurrentSheetDetail: ISheetDefaultProps;
}

const initialState: LandingState = {
  valueScroll: 0,
  isAuthenticated: false,
  statusModalLogin: false,
  statusModalRegister: false,
  statusModalCoupon: false,
  statusModalRecover: false,
  statusModalSheetDetail: false,
  statusModalPayment: false,
  statusModalChangePassword: false,
  statusIframePayment: false,
  dataUserAuth: {} as IAuthData,
  tokenUserAuth: "",
  functionalitiesAuth: [],
  infoCurrentSheetDetail: {} as ISheetDefaultProps,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateValueScroll: (state, action: PayloadAction<number>) => {
      state.valueScroll = action.payload;
    },
    updateStatusAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    updateStatusModalLogin: (state, action: PayloadAction<boolean>) => {
      state.statusModalLogin = action.payload;
    },
    updateStatusModalRegister: (state, action: PayloadAction<boolean>) => {
      state.statusModalRegister = action.payload;
    },
    updateStatusModalCoupon: (state, action: PayloadAction<boolean>) => {
      state.statusModalCoupon = action.payload;
    },
    updateStatusModalRecover: (state, action: PayloadAction<boolean>) => {
      state.statusModalRecover = action.payload;
    },
    updateStatusModalSheetDetail: (state, action: PayloadAction<boolean>) => {
      state.statusModalSheetDetail = action.payload;
    },
    updateStatusModalPayment: (state, action: PayloadAction<boolean>) => {
      state.statusModalPayment = action.payload;
    },
    updateStatusIframePayment: (state, action: PayloadAction<boolean>) => {
      state.statusIframePayment = action.payload;
    },
    updateStatusModalChangePassword: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.statusModalChangePassword = action.payload;
    },
    updateCurrentSheetDetail: (
      state,
      action: PayloadAction<ISheetDefaultProps>
    ) => {
      state.infoCurrentSheetDetail = action.payload;
    },
    updateDataUserAuth: (state, action: PayloadAction<IAuthData>) => {
      state.dataUserAuth = action.payload;
    },
    updateDataToken: (state, action: PayloadAction<string>) => {
      state.tokenUserAuth = action.payload;
    },
    updateDataFunctionality: (
      state,
      action: PayloadAction<IFunctionality[]>
    ) => {
      state.functionalitiesAuth = action.payload;
    },
  },
});

export const {
  updateValueScroll,
  updateStatusModalLogin,
  updateStatusModalRegister,
  updateStatusModalCoupon,
  updateStatusModalRecover,
  updateStatusModalSheetDetail,
  updateStatusAuthenticated,
  updateDataUserAuth,
  updateCurrentSheetDetail,
  updateStatusModalPayment,
  updateStatusModalChangePassword,
  updateDataFunctionality,
  updateDataToken,
  updateStatusIframePayment,
} = appSlice.actions;

export const getValueScroll = (state: RootState) => state.app.valueScroll;
export const getStatusModalLogin = (state: RootState) =>
  state.app.statusModalLogin;
export const getStatusModalRegister = (state: RootState) =>
  state.app.statusModalRegister;
export const getStatusModalCoupon = (state: RootState) =>
  state.app.statusModalCoupon;
export const getStatusModalRecover = (state: RootState) =>
  state.app.statusModalRecover;
export const getStatusModalSheetDetail = (state: RootState) =>
  state.app.statusModalSheetDetail;
export const getStatusModalPayment = (state: RootState) =>
  state.app.statusModalPayment;
export const getStatusModalChangePassword = (state: RootState) =>
  state.app.statusModalChangePassword;
export const getStatusIframePayment = (state: RootState) =>
  state.app.statusIframePayment;
export const getStatusAuthenticated = (state: RootState) =>
  state.app.isAuthenticated;
export const getCurrentSheetDetail = (state: RootState) =>
  state.app.infoCurrentSheetDetail;
export const getDataUserAuth = (state: RootState) => state.app.dataUserAuth;
export const getDataToken = (state: RootState) => state.app.tokenUserAuth;
export const getDataFuncionalities = (state: RootState) =>
  state.app.functionalitiesAuth;

export default appSlice.reducer;
