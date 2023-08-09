import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ISheetDefaultProps } from "./types/laminas-type";

export interface LaminasState {
  currentPage: number;
  currentSize: string;
  currentSearchWord: string;
  listSheets: ISheetDefaultProps[];
}

const initialState: LaminasState = {
  currentPage: 1,
  currentSize: "10",
  currentSearchWord: "",
  listSheets: [],
};

export const sheetsSlice = createSlice({
  name: "sheets",
  initialState,
  reducers: {
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    updateCurrentSize: (state, action: PayloadAction<string>) => {
      state.currentSize = action.payload;
    },
    updateCurrentSearchWord: (state, action: PayloadAction<string>) => {
      state.currentSearchWord = action.payload;
    },
    updateAllSheets: (state, action: PayloadAction<ISheetDefaultProps[]>) => {
      state.listSheets = action.payload;
    },
    addMoreSheets: (state, action: PayloadAction<ISheetDefaultProps[]>) => {
      const newList = state.listSheets;
      (action.payload || []).map((sheet) => {
        newList.push(sheet);
      });
      state.listSheets = newList;
    },
  },
});

export const {
  updateCurrentPage,
  updateCurrentSize,
  updateCurrentSearchWord,
  updateAllSheets,
  addMoreSheets,
} = sheetsSlice.actions;

export const getCurrentPage = (state: RootState) => state.sheets.currentPage;
export const getCurrentSize = (state: RootState) => state.sheets.currentSize;
export const getCurrentSearchWord = (state: RootState) =>
  state.sheets.currentSearchWord;
export const getListSheets = (state: RootState) => state.sheets.listSheets;

export default sheetsSlice.reducer;
