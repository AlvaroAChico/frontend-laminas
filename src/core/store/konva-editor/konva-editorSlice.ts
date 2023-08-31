import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ComponentKonvaItem } from "../../../features/editor-konva/editor-konva";
import { breakpoints } from "../../../constants/breakpoints";

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
  isActivePanelEditor: boolean; // Flag para mostrar o desaparecer menus flotantes
  isApplicationPaused: boolean;
  statusCursorCanva: number;
  statusBSSettings: boolean; // Menu solo para movil
  statusBSImage: boolean; // Menu solo para movil
  statusBSText: boolean; // Menu solo para movil
  statusBSShape: boolean; // Menu solo para movil
}

const initialState: EditorState = {
  sizeGlobalSheet: [
    [210, 297],
    [215, 330],
    [297, 420],
  ],
  canvasWidth: window.innerWidth - 10,
  canvasHeight:
    window.innerWidth < breakpoints.tabletSValue
      ? window.innerHeight - 110
      : window.innerHeight - 50,
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
  isActivePanelEditor: true,
  isApplicationPaused: false,
  statusCursorCanva: 1,
  statusBSSettings: false,
  statusBSImage: false,
  statusBSText: false,
  statusBSShape: false,
};

export const konvaEditorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    updateActiveIDKonva: (state, action: PayloadAction<string>) => {
      state.activeKonvaComponentID = action.payload;
    },
    resetDataKonva: (state) => {
      state.listComponentsKonva = [];
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
    changeActivePanelEditor: (state, action: PayloadAction<boolean>) => {
      state.isActivePanelEditor = action.payload;
    },
    changeStatusApplication: (state, action: PayloadAction<boolean>) => {
      state.isApplicationPaused = action.payload;
    },
    changeStatusCursorCanva: (state, action: PayloadAction<number>) => {
      state.statusCursorCanva = action.payload;
    },
    // Solo para layers
    updateFullUpActiveKonva: (state) => {
      const objectIndex = state.listComponentsKonva.filter(
        (component) => component.id == state.activeKonvaComponentID
      )[0];
      const listObjects = state.listComponentsKonva.filter(
        (component) => component.id != state.activeKonvaComponentID
      );
      listObjects.push(objectIndex);
      state.listComponentsKonva = listObjects;
      state.activeKonvaComponentID = objectIndex.id;
    },
    updateUpActiveKonva: (state) => {
      let currentKonvaComponent: ComponentKonvaItem = {} as ComponentKonvaItem;
      let currentIndexComponent = 0;
      state.listComponentsKonva.map((component, index) => {
        if (component.id == state.activeKonvaComponentID) {
          currentKonvaComponent = component;
          currentIndexComponent = index;
        }
      })[0];
      const listObjects = state.listComponentsKonva.filter(
        (component) => component.id != state.activeKonvaComponentID
      );
      listObjects.splice(currentIndexComponent + 1, 0, currentKonvaComponent);
      state.listComponentsKonva = listObjects;
    },
    updateDownActiveKonva: (state) => {
      let currentKonvaComponent: ComponentKonvaItem = {} as ComponentKonvaItem;
      let currentIndexComponent = 0;
      state.listComponentsKonva.map((component, index) => {
        if (component.id == state.activeKonvaComponentID) {
          currentKonvaComponent = component;
          currentIndexComponent = index;
        }
      })[0];
      const listObjects = state.listComponentsKonva.filter(
        (component) => component.id != state.activeKonvaComponentID
      );
      listObjects.splice(
        currentIndexComponent > 0 ? currentIndexComponent - 1 : 0,
        0,
        currentKonvaComponent
      );
      state.listComponentsKonva = listObjects;
    },
    updateFullDownActiveKonva: (state) => {
      const objectIndex = state.listComponentsKonva.filter(
        (component) => component.id == state.activeKonvaComponentID
      )[0];
      const listObjects = state.listComponentsKonva.filter(
        (component) => component.id != state.activeKonvaComponentID
      );
      listObjects.splice(0, 0, objectIndex);
      state.listComponentsKonva = listObjects;
      state.activeKonvaComponentID = objectIndex.id;
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
      console.table({
        x: updatingItem[0].x,
        y: updatingItem[0].y,
        width: updatingItem[0].width,
        height: updatingItem[0].height,
      });
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
  resetDataKonva,
  updateActiveIDKonva,
  updateComponentKonva,
  updateActiveGlobalSheet,
  updateCanvasWidth,
  updateCanvasHeight,
  updateActiveMenuOption,
  changeStatusCursorCanva, // Solo para Canvas
  changeActivePanelEditor, // Solo para Canvas
  updateFullUpActiveKonva, // Solo para Canvas
  updateUpActiveKonva, // Solo para Canvas
  updateDownActiveKonva, // Solo para Canvas
  updateFullDownActiveKonva, // Solo para Canvas
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
  changeStatusApplication,
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
export const getStatusPanelEditor = (state: RootState) =>
  state.konvaEditor.isActivePanelEditor;
export const getStatusApplication = (state: RootState) =>
  state.konvaEditor.isApplicationPaused;
export const getStatusCursorCanva = (state: RootState) =>
  state.konvaEditor.statusCursorCanva;
export const getCurrentPropertiesKonva = (state: RootState) =>
  state.konvaEditor.listComponentsKonva.filter(
    (item) => item.id == state.konvaEditor.activeKonvaComponentID
  )[0];

export default konvaEditorSlice.reducer;
