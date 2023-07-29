import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IAuthData } from '../../store/auth/types/auth-types'

export interface LandingState {
  valueScroll: number;
  isAuthenticated: boolean;
  statusModalLogin: boolean;
  statusModalRegister: boolean;
  statusModalCoupon: boolean;
  statusModalRecover: boolean;
  dataUserAuth: IAuthData;
}

const initialState: LandingState = {
  valueScroll: 0,
  isAuthenticated: false,
  statusModalLogin: false,
  statusModalRegister: false,
  statusModalCoupon: false,
  statusModalRecover: false,
  dataUserAuth: {} as IAuthData
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
  updateStatusAuthenticated,
  updateDataUserAuth
} = appSlice.actions;

export const getValueScroll = (state: RootState) => state.app.valueScroll;
export const getStatusModalLogin = (state: RootState) => state.app.statusModalLogin;
export const getStatusModalRegister = (state: RootState) => state.app.statusModalRegister;
export const getStatusModalCoupon = (state: RootState) => state.app.statusModalCoupon;
export const getStatusModalRecover = (state: RootState) => state.app.statusModalRecover;
export const getStatusAuthenticated = (state: RootState) => state.app.isAuthenticated;
export const getDataUserAuth = (state: RootState) => state.app.dataUserAuth;

export default appSlice.reducer;
