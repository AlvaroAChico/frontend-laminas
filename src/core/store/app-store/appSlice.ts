import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IAuthData } from "../../store/auth/types/auth-types";
import { ISheetDefaultProps } from "../sheets/types/laminas-type";

export interface LandingState {
  valueScroll: number;
  isAuthenticated: boolean;
  statusModalLogin: boolean;
  statusModalRegister: boolean;
  statusModalCoupon: boolean;
  statusModalRecover: boolean;
  statusModalSheetDetail: boolean;
  dataUserAuth: IAuthData;
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
  dataUserAuth: {} as IAuthData,
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
    updateCurrentSheetDetail: (
      state,
      action: PayloadAction<ISheetDefaultProps>
    ) => {
      state.infoCurrentSheetDetail = action.payload;
    },
    updateDataUserAuth: (state, action: PayloadAction<IAuthData>) => {
      state.dataUserAuth = action.payload;
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
export const getStatusAuthenticated = (state: RootState) =>
  state.app.isAuthenticated;
export const getDataUserAuth = (state: RootState) => state.app.dataUserAuth;
export const getCurrentSheetDetail = (state: RootState) =>
  state.app.infoCurrentSheetDetail;

export default appSlice.reducer;
