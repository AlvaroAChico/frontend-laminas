import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import Cookies from "js-cookie";

export enum ETemporalActions {
  TEMPORAL_ACTION_KEY = "TEMPORAL_ACTION_KEY",
  NO_ACTION = "NO_ACTION",
  OPEN_COUPON = "OPEN_COUPON",
  OPEN_PAYMENT = "OPEN_PAYMENT",
  OPEN_LOGIN = "OPEN_LOGIN",
  OPEN_REGISTER = "OPEN_REGISTER",
}

export interface LaminasState {
  temporalAction: ETemporalActions;
  redirect: string;
}

const initialState: LaminasState = {
  temporalAction: ETemporalActions.NO_ACTION,
  redirect: "",
};

export const temporalSlice = createSlice({
  name: "temporal",
  initialState,
  reducers: {
    updateTemporalAction: (state, action: PayloadAction<ETemporalActions>) => {
      Cookies.set(ETemporalActions.TEMPORAL_ACTION_KEY, action.payload);
      localStorage.setItem(
        ETemporalActions.TEMPORAL_ACTION_KEY,
        action.payload
      );
      state.temporalAction = action.payload;
    },
  },
});

export const { updateTemporalAction } = temporalSlice.actions;

export const getTemporalAction = (state: RootState) =>
  state.temporal.temporalAction;

export default temporalSlice.reducer;
