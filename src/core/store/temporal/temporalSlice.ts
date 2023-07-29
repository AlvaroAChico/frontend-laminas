import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

enum ETemporalActions {
  NO_ACTION = "NO_ACTION",
  OPEN_COUPON = "OPEN_COUPON"
}

export interface LaminasState {
  temporalAction: ETemporalActions;
  redirect: string
}

const initialState: LaminasState = {
  temporalAction: ETemporalActions.NO_ACTION,
  redirect: ""
};

export const temporalSlice = createSlice({
  name: "temporal",
  initialState,
  reducers: {
    showListLaminas: (state, action: PayloadAction<ETemporalActions>) => {
      state.temporalAction = action.payload;
    },
  },
});

export const { showListLaminas } = temporalSlice.actions;

export const getTemporanAction = (state: RootState) =>
  state.temporal.temporalAction;

export default temporalSlice.reducer;
