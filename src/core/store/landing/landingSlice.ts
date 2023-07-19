import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface LandingState {
  valueScroll: number;
}

const initialState: LandingState = {
  valueScroll: 0,
};

export const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    updateValueScroll: (state, action: PayloadAction<number>) => {
      state.valueScroll = action.payload;
    },
  },
});

export const { updateValueScroll } = landingSlice.actions;

export const getValueScroll = (state: RootState) => state.landing.valueScroll;

export default landingSlice.reducer;
