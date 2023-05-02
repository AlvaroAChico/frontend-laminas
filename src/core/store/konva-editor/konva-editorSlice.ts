import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ComponentKonvaItem } from "../../../features/editor-konva/editor-konva";

export interface EditorState {
  sizeGlobalSheet: number[][];
  activeGlobalSheet: number;
  canvasWidth: number;
  canvasHeight: number;
  activeMenuOption: number;
  listComponentsKonva: ComponentKonvaItem[];
  activeKonvaComponentID: string; // ID del componente activo de KONVA
}

const initialState: EditorState = {
  sizeGlobalSheet: [
    [210, 297],
    [215, 330],
    [297, 420],
  ],
  canvasWidth: window.innerWidth - 10,
  canvasHeight: window.innerHeight - 4,
  activeGlobalSheet: 1,
  activeMenuOption: 0,
  listComponentsKonva: [],
  activeKonvaComponentID: "",
};

export const konvaEditorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    updateActiveIDKonva: (state, action: PayloadAction<string>) => {
      state.activeKonvaComponentID = action.payload;
    },
    updateComponentKonva: (
      state,
      action: PayloadAction<ComponentKonvaItem>
    ) => {
      const updatingItem = state.listComponentsKonva.filter(
        (component) => component.id == action.payload.id
      );
      updatingItem[0].x = action.payload.x;
      updatingItem[0].y = action.payload.y;
      updatingItem[0].width = action.payload.width;
      updatingItem[0].height = action.payload.height;
      updatingItem[0].fill = action.payload.fill;
    },
    addItemKonva: (state, action: PayloadAction<ComponentKonvaItem>) => {
      state.listComponentsKonva.push(action.payload);
    },
    // Configuracion para canvas
    updateActiveGlobalSheet: (state, action: PayloadAction<number>) => {
      state.activeGlobalSheet = action.payload;
    },
    updateCanvasWidth: (state, action: PayloadAction<number>) => {
      state.canvasWidth = action.payload;
    },
    updateCanvasHeight: (state, action: PayloadAction<number>) => {
      state.canvasHeight = action.payload;
    },
    // Estado de menu activo
    updateActiveMenuOption: (state, action: PayloadAction<number>) => {
      state.activeMenuOption = action.payload;
    },
  },
});

export const {
  addItemKonva,
  updateActiveIDKonva,
  updateComponentKonva,
  updateActiveGlobalSheet,
  updateCanvasWidth,
  updateCanvasHeight,
  updateActiveMenuOption,
} = konvaEditorSlice.actions;

export const getSizeGlobalSheet = (state: RootState) =>
  state.konvaEditor.sizeGlobalSheet;
export const getActiveGlobalSheet = (state: RootState) =>
  state.konvaEditor.activeGlobalSheet;
export const getCanvasWidth = (state: RootState) =>
  state.konvaEditor.canvasWidth;
export const getCanvasHeight = (state: RootState) =>
  state.konvaEditor.canvasHeight;
export const getActiveMenuOption = (state: RootState) =>
  state.konvaEditor.activeMenuOption;
export const getListComponentsKonva = (state: RootState) =>
  state.konvaEditor.listComponentsKonva;
export const getActiveComponentKonvaID = (state: RootState) =>
  state.konvaEditor.activeKonvaComponentID;

export default konvaEditorSlice.reducer;
