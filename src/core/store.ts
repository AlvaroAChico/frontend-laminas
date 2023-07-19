import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { laminasApi, openAiAPI } from "./store/editor/editorAPI";
import { landingApi } from "./store/landing/landingAPI";
import editorReducer from "./store/editor/editorSlice";
import konvaEditorReducer from "./store/konva-editor/konva-editorSlice";
import landingReducer from "./store/landing/landingSlice";

export const queryMiddleares = [
  laminasApi.middleware,
  openAiAPI.middleware,
  landingApi.middleware,
];

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    konvaEditor: konvaEditorReducer,
    landing: landingReducer,
    [laminasApi.reducerPath]: laminasApi.reducer,
    [openAiAPI.reducerPath]: openAiAPI.reducer,
    [landingApi.reducerPath]: landingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(queryMiddleares as any),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
