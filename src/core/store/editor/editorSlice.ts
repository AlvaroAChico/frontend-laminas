import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageBaseProps } from "../../../features/editor/components/editor/components/image-base/image-base";
import { TextBaseProps } from "../../../features/editor/components/editor/components/text-base/text-base";
import { RootState } from "../../store";

export interface EditorState {
  listImage: ImageBaseProps[];
  listText: TextBaseProps[];
  statusModalEditor: boolean;
  imageCropper: string;
  currentImageId: string;
}

const initialState: EditorState = {
  listImage: [],
  listText: [],
  statusModalEditor: false,
  imageCropper: "",
  currentImageId: "",
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
    addImageBase: (state, action: PayloadAction<ImageBaseProps>) => {
      state.listImage.push(action.payload);
    },
    addTextBase: (state, action: PayloadAction<TextBaseProps>) => {
      state.listText.push(action.payload);
    },
  },
});

export const {
  addImageBase,
  addTextBase,
  showModalEditor,
  closeModalEditor,
  updateImageCropper,
  updateCurrentImage,
} = editorSlice.actions;

export const getListImageBase = (state: RootState) => state.editor.listImage;
export const getListTextBase = (state: RootState) => state.editor.listText;
export const getStatusModalEditor = (state: RootState) =>
  state.editor.statusModalEditor;
export const getImageCropper = (state: RootState) => state.editor.imageCropper;
export const getCurrentImage = (state: RootState) =>
  state.editor.currentImageId;

export default editorSlice.reducer;
