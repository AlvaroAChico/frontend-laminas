import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ComponentKonvaItem } from "../../../features/editor-konva/editor-konva";

export interface GlobalCoordText {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ConfigStageZoom {
  scale: number;
  x: number;
  y: number;
}

export interface ITextAreaCurrentStyle {
  currentTextFontSize: number;
  currentTextFontFamily: string;
  currentTextColor: string;
  currentTextAlign: string;
}
export interface EditorState {
  sizeGlobalSheet: number[][];
  activeGlobalSheet: number;
  canvasWidth: number;
  canvasHeight: number;
  activeMenuOption: number;
  listComponentsKonva: ComponentKonvaItem[];
  activeKonvaComponentID: string; // ID del componente activo de KONVA
  groupCoordGlobaltext: GlobalCoordText; //Coordenadas para textarea de editText
  isActiveModalCutImage: boolean; // Solo para imagenes
  activeIdImageEditing: string; // Solo para imagenes
  urlImageActiveEditing: string; // Solo para imagenes
  showModalEditingImage: boolean; // Solo para imagenes
  stageZoom: ConfigStageZoom; // Solo para Stage
  textAreaStyles: ITextAreaCurrentStyle; // Solo para texto
  currentEditingText: ComponentKonvaItem;
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
  groupCoordGlobaltext: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  isActiveModalCutImage: false,
  activeIdImageEditing: "",
  urlImageActiveEditing: "",
  showModalEditingImage: false,
  stageZoom: {
    scale: 1,
    x: 0,
    y: 0,
  },
  textAreaStyles: {} as ITextAreaCurrentStyle,
  currentEditingText: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    text: "",
    customFontSize: 0,
    customFill: "",
    customAlign: "",
    customFamily: "",
  } as ComponentKonvaItem,
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
    // Configuracion comun en todos los objetos
    deleteObjectKonva: (state) => {
      const listObjects = state.listComponentsKonva.filter(
        (component) => component.id != state.activeKonvaComponentID
      );
      state.activeKonvaComponentID = "";
      state.listComponentsKonva = listObjects;
    },
    unselectObjectKonva: (state) => {
      state.activeKonvaComponentID = "";
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
    // Solo para figuras
    updateColorFillFigure: (state, action: PayloadAction<string>) => {
      const updatingItem = state.listComponentsKonva.filter(
        (component) => component.id == state.activeKonvaComponentID
      );
      updatingItem[0].color = action.payload;
    },
    updateStrokeFillFigure: (state, action: PayloadAction<string>) => {
      const updatingItem = state.listComponentsKonva.filter(
        (component) => component.id == state.activeKonvaComponentID
      );
      updatingItem[0].stroke = action.payload;
    },
    updateStrokeSizeFigure: (state, action: PayloadAction<number>) => {
      const updatingItem = state.listComponentsKonva.filter(
        (component) => component.id == state.activeKonvaComponentID
      );
      updatingItem[0].sizeStroke = action.payload;
    },
    // Solo para Texto
    updateGlobalCoordText: (state) => {
      // Update textarea and save the properties of the active component
      const updatingItem = state.listComponentsKonva.filter(
        (component) => component.id == state.activeKonvaComponentID
      );
      state.groupCoordGlobaltext.x = updatingItem[0].x;
      state.groupCoordGlobaltext.y = updatingItem[0].y;
      state.groupCoordGlobaltext.width = updatingItem[0].width;
      state.groupCoordGlobaltext.height = updatingItem[0].height;
      // Updating currentComponentEditing
      state.currentEditingText = updatingItem[0];
    },
    updateOldTextEditing: (state) => {
      state.groupCoordGlobaltext.x = 0;
      state.groupCoordGlobaltext.y = 0;
      state.groupCoordGlobaltext.width = 0;
      state.groupCoordGlobaltext.height = 0;
    },
    // Solo Rich texto
    updateColorRichText: (state, action: PayloadAction<string>) => {
      const updatingItem = state.listComponentsKonva.filter(
        (component) => component.id == state.activeKonvaComponentID
      );
      updatingItem[0].customFill = action.payload;
    },
    updateSizeRichText: (state, action: PayloadAction<number>) => {
      const updatingItem = state.listComponentsKonva.filter(
        (component) => component.id == state.activeKonvaComponentID
      );
      updatingItem[0].customFontSize = action.payload;
    },
    updateFamilyRichText: (state, action: PayloadAction<string>) => {
      const updatingItem = state.listComponentsKonva.filter(
        (component) => component.id == state.activeKonvaComponentID
      );
      updatingItem[0].customFamily = action.payload;
    },
    updateAlignRichText: (state, action: PayloadAction<string>) => {
      const updatingItem = state.listComponentsKonva.filter(
        (component) => component.id == state.activeKonvaComponentID
      );
      updatingItem[0].customAlign = action.payload;
    },
    updateActiveTextProperties: (state) => {
      const updatingItem = state.listComponentsKonva.filter(
        (component) => component.id == state.activeKonvaComponentID
      );
      const newtextStyles = {
        currentTextAlign: updatingItem[0].customAlign,
        currentTextColor: updatingItem[0].customFill,
        currentTextFontSize: updatingItem[0].customFontSize,
        currentTextFontFamily: updatingItem[0].customFamily,
      } as ITextAreaCurrentStyle;
      state.textAreaStyles = newtextStyles;
      const txtarea: HTMLTextAreaElement | any =
        document.getElementById("global-text-editor");
      txtarea!.innerText = updatingItem[0]!.text!;
      txtarea!.value = updatingItem[0]!.text!;
      updatingItem[0].text = "";
      txtarea?.focus();
    },
    // Solo para Imagenes
    updateCutImageText: (state) => {
      const updatingItem = state.listComponentsKonva.filter(
        (component) => component.id == state.activeKonvaComponentID
      );
      state.activeIdImageEditing = state.activeKonvaComponentID;
      state.urlImageActiveEditing = updatingItem[0]!.image!;
    },
    updateVisilibityImageEdit: (state) => {
      state.showModalEditingImage = !state.showModalEditingImage;
    },
    updateNewImageActiveEdit: (state, action: PayloadAction<string>) => {
      const updatingItem = state.listComponentsKonva.filter(
        (component) => component.id == state.activeIdImageEditing
      );
      updatingItem[0].image = action.payload;
    },
    updateStageZoom: (state, action: PayloadAction<ConfigStageZoom>) => {
      state.stageZoom = action.payload;
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
  deleteObjectKonva, // Todos los objetos
  unselectObjectKonva, // Todos los objetos
  updateColorFillFigure, // Solo Figuras
  updateStrokeFillFigure, // Solo Figuras
  updateStrokeSizeFigure, // Solo Figuras
  updateGlobalCoordText, // Solo Texto
  updateColorRichText, // Solo texto
  updateSizeRichText, // Solo texto
  updateFamilyRichText, // Solo texto
  updateAlignRichText, // Solo texto
  updateActiveTextProperties, // Solo texto
  updateOldTextEditing, // Solo texto
  updateCutImageText, // Solo Imagenes
  updateVisilibityImageEdit, // Solo Imagenes
  updateNewImageActiveEdit, // Solo Imagenes
  updateStageZoom, // Solo Stage
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
export const getGlobalCoord = (state: RootState) =>
  state.konvaEditor.groupCoordGlobaltext;
export const getUrlActiveImageEdit = (state: RootState) =>
  state.konvaEditor.urlImageActiveEditing;
export const getVisibilityModalImageEdit = (state: RootState) =>
  state.konvaEditor.showModalEditingImage;
export const getConfigStageZoom = (state: RootState) =>
  state.konvaEditor.stageZoom;
export const getCurrentStylesTextArea = (state: RootState) =>
  state.konvaEditor.textAreaStyles;
export const getOldPropertiesTextEditing = (state: RootState) =>
  state.konvaEditor.currentEditingText;

export default konvaEditorSlice.reducer;
