import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageBaseProps } from "../../../features/editor/components/editor/components/image-base/image-base";
import { TextBaseProps } from "../../../features/editor/components/editor/components/text-base/text-base";
import { RootState } from "../../store";
import { LaminaDefaultProps } from "./editorAPI";

export interface EditorState {
  listImage: ImageBaseProps[];
  listText: TextBaseProps[];
  statusModalEditor: boolean;
  statusDownloadPDF: boolean;
  statusMobileMenu: boolean;
  imageCropper: string;
  currentImageId: string;
  listImageMenu: LaminaDefaultProps[];
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
    updateAllDataLaminas: (
      state,
      action: PayloadAction<LaminaDefaultProps[]>
    ) => {
      state.listImageMenu = action.payload;
    },
  },
});

export const {
  addImageBase,
  addTextBase,
  showModalEditor,
  closeModalEditor,
  showDownloadPDF,
  closeDownloadPDF,
  updateImageCropper,
  updateCurrentImage,
  deleteImage,
  changeStatusMobileMenu,
  updateAllDataLaminas,
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

export default editorSlice.reducer;
