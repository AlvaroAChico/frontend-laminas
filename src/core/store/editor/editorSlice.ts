import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Editor } from "@tiptap/react";
import { ImageBaseProps } from "../../../features/editor/components/editor/components/image-base/image-base";
import { TextBaseProps } from "../../../features/editor/components/editor/components/text-base/text-base";
import { RootState } from "../../store";
import { LaminaDefaultProps, LaminaResponse } from "./editorAPI";

export interface EditorState {
  dataCurrentImage?: LaminaResponse;
  listImage: ImageBaseProps[];
  listText: TextBaseProps[];
  statusModalEditor: boolean;
  statusDownloadPDF: boolean;
  statusMobileMenu: boolean;
  imageCropper: string;
  currentImageId: string;
  listImageMenu: LaminaDefaultProps[];
  generalSatusControl: boolean;
  activeImage: number;
  activeText: number;
  activeSheetPanel: number;
}

const initialState: EditorState = {
  listImage: [],
  listText: [],
  statusModalEditor: false,
  statusDownloadPDF: false,
  statusMobileMenu: false,
  imageCropper: "",
  currentImageId: "",
  listImageMenu: [],
  generalSatusControl: true,
  activeImage: 0,
  activeText: 0,
  activeSheetPanel: 1,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    updateCurrentImage: (state, action: PayloadAction<string>) => {
      state.currentImageId = action.payload;
    },
    updateImageCropper: (state, action: PayloadAction<string>) => {
      state.imageCropper = action.payload;
    },
    showModalEditor: (state) => {
      state.statusModalEditor = true;
    },
    closeModalEditor: (state) => {
      state.statusModalEditor = false;
    },
    showDownloadPDF: (state) => {
      state.statusDownloadPDF = true;
    },
    closeDownloadPDF: (state) => {
      state.statusDownloadPDF = false;
    },
    changeStatusMobileMenu: (state) => {
      state.statusMobileMenu = !state.statusMobileMenu;
    },
    addImageBase: (state, action: PayloadAction<ImageBaseProps>) => {
      state.listImage.push(action.payload);
    },
    addTextBase: (state, action: PayloadAction<TextBaseProps>) => {
      state.listText.push(action.payload);
    },
    deleteImage: (state, action: PayloadAction<number>) => {
      const newList = state.listImage.filter(
        (item) => item.id != action.payload
      );
      state.listImage = newList;
    },
    deleteText: (state, action: PayloadAction<number>) => {
      const newList = state.listText.filter(
        (item) => item.id != action.payload
      );
      state.listText = newList;
    },
    updateImageActive: (state, action: PayloadAction<number>) => {
      state.activeImage = action.payload;
    },
    updateTextActive: (state, action: PayloadAction<number>) => {
      state.activeText = action.payload;
    },
    updateAllDataLaminas: (
      state,
      action: PayloadAction<LaminaDefaultProps[]>
    ) => {
      state.listImageMenu = action.payload;
    },
    showStatusControls: (state) => {
      state.generalSatusControl = true;
    },
    hiddenStatusControls: (state) => {
      state.generalSatusControl = false;
    },
    updateActiveSheetPanel: (state, action: PayloadAction<number>) => {
      state.activeSheetPanel = action.payload;
    },
    // Fragmento para editor de texto
    updateTypography: (state, action: PayloadAction<string>) => {
      const newListText = state.listText.map((item) => {
        if (item.id == state.activeText) {
          item.typography = action.payload;
        }
        return item;
      });
      state.listText = newListText;
    },
    updateSizeLetterUP: (state) => {
      const newListText = state.listText.map((item) => {
        if (item.id == state.activeText) {
          item.sizeLetter = item.sizeLetter + 1;
        }
        return item;
      });
      state.listText = newListText;
    },
    updateSizeLetterDOWN: (state) => {
      const newListText = state.listText.map((item) => {
        if (item.id == state.activeText) {
          if (item.sizeLetter > 0) {
            item.sizeLetter = item.sizeLetter - 1;
          }
        }
        return item;
      });
      state.listText = newListText;
    },
    updateInputColor: (state, action: PayloadAction<string>) => {
      const newListText = state.listText.map((item) => {
        if (item.id == state.activeText) {
          item.inputColor = action.payload;
        }
        return item;
      });
      state.listText = newListText;
    },
    updateEditortext: (state, action: PayloadAction<string>) => {
      const newListText = state.listText.map((item) => {
        if (item.id == state.activeText) {
          item.textAlign = action.payload;
        }
        return item;
      });
      state.listText = newListText;
    },
    updateDataCurrentImage: (state, action: PayloadAction<LaminaResponse>) => {
      state.dataCurrentImage = action.payload;
    },
  },
});

export const {
  updateDataCurrentImage,
  updateEditortext,
  updateTypography,
  updateSizeLetterUP,
  updateSizeLetterDOWN,
  updateInputColor,
  addImageBase,
  addTextBase,
  showModalEditor,
  closeModalEditor,
  showDownloadPDF,
  closeDownloadPDF,
  updateImageCropper,
  updateCurrentImage,
  deleteImage,
  deleteText,
  updateImageActive,
  changeStatusMobileMenu,
  updateAllDataLaminas,
  showStatusControls,
  hiddenStatusControls,
  updateTextActive,
  updateActiveSheetPanel,
} = editorSlice.actions;

export const getListImageBase = (state: RootState) => state.editor.listImage;
export const getListTextBase = (state: RootState) => state.editor.listText;
export const getListImageMenu = (state: RootState) =>
  state.editor.listImageMenu;
export const getStatusModalEditor = (state: RootState) =>
  state.editor.statusModalEditor;
export const getStatusDownloadPDF = (state: RootState) =>
  state.editor.statusDownloadPDF;
export const getStatusMobileMenu = (state: RootState) =>
  state.editor.statusMobileMenu;
export const getImageCropper = (state: RootState) => state.editor.imageCropper;
export const getCurrentImage = (state: RootState) =>
  state.editor.currentImageId;
export const getGeneralStatusControl = (state: RootState) =>
  state.editor.generalSatusControl;
export const getActiveImage = (state: RootState) => state.editor.activeImage;
export const getActiveText = (state: RootState) => state.editor.activeText;
export const getActiveEditor = (state: RootState) => state.editor.activeText;
export const getDataCurrentImage = (state: RootState) =>
  state.editor.dataCurrentImage;
export const getActiveSheetPanel = (state: RootState) =>
  state.editor.activeSheetPanel;

export default editorSlice.reducer;
