import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IAuthData, IFunctionality } from "../../store/auth/types/auth-types";
import { ISheetDefaultProps } from "../sheets/types/laminas-type";

export interface LandingState {
  valueScroll: number;
  isLoadingApp: boolean;
  isAuthenticated: boolean;
  statusModalLogin: boolean;
  statusModalRegister: boolean;
  statusModalCoupon: boolean;
  statusModalRecover: boolean;
  statusModalSheetDetail: boolean;
  statusModalPayment: boolean;
  statusModalChangePassword: boolean;
  statusModalValueBlobPDF: boolean;
  statusModalViewTutorial: boolean;
  statusIframePayment: boolean;
  dataUserAuth: IAuthData;
  tokenUserAuth: string;
  functionalitiesAuth: IFunctionality[];
  infoCurrentSheetDetail: ISheetDefaultProps;
  currentSheetEdit: string;
  currentSheetEditUUID: string;
  statusStepPayment: number;
  valuePlanPay: number;
  valueBlobSheetPDF: any;
  currentTutorialURI: string;
  currentImageAvatar: string;
  userHavePlan: boolean;
}

const initialState: LandingState = {
  valueScroll: 0,
  isLoadingApp: false,
  isAuthenticated: false,
  statusModalLogin: false,
  statusModalRegister: false,
  statusModalCoupon: false,
  statusModalRecover: false,
  statusModalSheetDetail: false,
  statusModalPayment: false,
  statusModalChangePassword: false,
  statusModalValueBlobPDF: false,
  statusModalViewTutorial: false,
  statusIframePayment: false,
  dataUserAuth: {} as IAuthData,
  tokenUserAuth: "",
  functionalitiesAuth: [],
  infoCurrentSheetDetail: {} as ISheetDefaultProps,
  currentSheetEdit: "",
  statusStepPayment: 0,
  valuePlanPay: 0,
  valueBlobSheetPDF: null,
  currentSheetEditUUID: "",
  currentTutorialURI: "",
  currentImageAvatar: "",
  userHavePlan: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateValueScroll: (state, action: PayloadAction<number>) => {
      state.valueScroll = action.payload;
    },
    updateLoadingApp: (state, action: PayloadAction<boolean>) => {
      state.isLoadingApp = action.payload;
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
    updateStatusModalTutorial: (state, action: PayloadAction<boolean>) => {
      state.statusModalViewTutorial = action.payload;
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
    updateStatusModalValueBlobPDF: (state, action: PayloadAction<boolean>) => {
      state.statusModalValueBlobPDF = action.payload;
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
    updateCurrentSheetEdit: (state, action: PayloadAction<string>) => {
      state.currentSheetEdit = action.payload;
    },
    updateCurrentSheetEditUUID: (state, action: PayloadAction<string>) => {
      state.currentSheetEditUUID = action.payload;
    },
    updateStatusStepPayment: (state, action: PayloadAction<number>) => {
      state.statusStepPayment = action.payload;
    },
    updateValuePlanPay: (state, action: PayloadAction<number>) => {
      state.valuePlanPay = action.payload;
    },
    updateValueBlobSheetPDF: (state, action: PayloadAction<any>) => {
      state.valueBlobSheetPDF = action.payload;
    },
    updateCurrentTutorialURI: (state, action: PayloadAction<string>) => {
      state.currentTutorialURI = action.payload;
    },
    updateCurrentImageAvatar: (state, action: PayloadAction<string>) => {
      state.currentImageAvatar = action.payload;
    },
    updateCurrentPlan: (state, action: PayloadAction<boolean>) => {
      state.userHavePlan = action.payload;
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
  updateStatusModalTutorial,
  updateDataFunctionality,
  updateDataToken,
  updateStatusIframePayment,
  updateLoadingApp,
  updateCurrentSheetEdit,
  updateStatusStepPayment,
  updateValuePlanPay,
  updateValueBlobSheetPDF,
  updateStatusModalValueBlobPDF,
  updateCurrentSheetEditUUID,
  updateCurrentTutorialURI,
  updateCurrentImageAvatar,
  updateCurrentPlan,
} = appSlice.actions;

export const getValueScroll = (state: RootState) => state.app.valueScroll;
export const getIsLoadingApp = (state: RootState) => state.app.isLoadingApp;
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
export const getStatusModalTutorial = (state: RootState) =>
  state.app.statusModalViewTutorial;
export const getStatusValueBlobSheetPDF = (state: RootState) =>
  state.app.statusModalValueBlobPDF;
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
export const getCurrentSheetEdit = (state: RootState) =>
  state.app.currentSheetEdit;
export const getCurrentSheetEditUUID = (state: RootState) =>
  state.app.currentSheetEditUUID;
export const getStatusStepPayment = (state: RootState) =>
  state.app.statusStepPayment;
export const getValuePlanPay = (state: RootState) => state.app.valuePlanPay;
export const getValueBlobSheetPDF = (state: RootState) =>
  state.app.valueBlobSheetPDF;
export const getCurrentTutorialURI = (state: RootState) =>
  state.app.currentTutorialURI;
export const getCurrentImageAvatar = (state: RootState) =>
  state.app.currentImageAvatar;
export const getUserHavePlan = (state: RootState) => state.app.userHavePlan;

export default appSlice.reducer;
