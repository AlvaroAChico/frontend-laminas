import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ISheetDefaultProps } from "./types/laminas-type";

export interface LaminasState {
  currentPage: number;
  currentSize: string;
  currentSearchWord: string;
  listSheets: ISheetDefaultProps[];
  // Editor
  currentPageEditor: number;
  currentSizeEditor: string;
  currentSearchWordEditor: string;
  listSheetsEditor: ISheetDefaultProps[];
}

const initialState: LaminasState = {
  currentPage: 1,
  currentSize: "10",
  currentSearchWord: "",
  listSheets: [],
  // Editor
  currentPageEditor: 1,
  currentSizeEditor: "1",
  currentSearchWordEditor: "",
  listSheetsEditor: [],
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
    updateCurrentPageEditor: (state) => {
      state.currentPageEditor = state.currentPageEditor + 1;
    },
    updateCurrentSearchWordEditor: (state, action: PayloadAction<string>) => {
      state.currentSearchWordEditor = action.payload;
    },
    clearSheetsEditor: (state) => {
      state.listSheetsEditor = [];
    },
    addSheetEditor: (state, action: PayloadAction<ISheetDefaultProps>) => {
      const newList = state.listSheets;
      newList.push(action.payload);
      state.listSheetsEditor = newList;
    },
    updateAddFavoriteSheet: (state, action: PayloadAction<string>) => {
      const sheet = state.listSheets.filter(
        (sheet) => sheet.uuid == action.payload
      )[0];
      sheet.isFavorite = true;
    },
    updateDeleteFavoriteSheet: (state, action: PayloadAction<string>) => {
      const sheet = state.listSheets.filter(
        (sheet) => sheet.uuid == action.payload
      )[0];
      sheet.isFavorite = false;
    },
  },
});

export const {
  updateCurrentPage,
  updateCurrentSize,
  updateCurrentSearchWord,
  updateAllSheets,
  addMoreSheets,
  updateAddFavoriteSheet,
  updateDeleteFavoriteSheet,
  addSheetEditor,
  clearSheetsEditor,
  updateCurrentPageEditor,
  updateCurrentSearchWordEditor,
} = sheetsSlice.actions;

export const getCurrentPage = (state: RootState) => state.sheets.currentPage;
export const getCurrentSize = (state: RootState) => state.sheets.currentSize;
export const getCurrentSearchWord = (state: RootState) =>
  state.sheets.currentSearchWord;
export const getListSheets = (state: RootState) => state.sheets.listSheets;
// Editor
export const getCurrentPageEditor = (state: RootState) =>
  state.sheets.currentPageEditor;
export const getCurrentSizeEditor = (state: RootState) =>
  state.sheets.currentSizeEditor;
export const getCurrentSearchWordEditor = (state: RootState) =>
  state.sheets.currentSearchWordEditor;
export const getListSheetsEditor = (state: RootState) =>
  state.sheets.listSheetsEditor;

export default sheetsSlice.reducer;
