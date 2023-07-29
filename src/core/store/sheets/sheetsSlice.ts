import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface LaminasState {
  listLaminas: boolean;
}

const initialState: LaminasState = {
  listLaminas: false,
};

export const sheetsSlice = createSlice({
  name: "sheets",
  initialState,
  reducers: {
    showListLaminas: (state) => {
      state.listLaminas = true;
    },
  },
});

export const { showListLaminas } = sheetsSlice.actions;

export const getStatusModalEditor = (state: RootState) =>
  state.editor.statusModalEditor;

export default sheetsSlice.reducer;
