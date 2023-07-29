import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { laminasApi} from "./store/editor/editorAPI";
import { openAiAPI } from "./store/openAi/openAiAPI";
import { appApi } from "./store/app-store/appAPI";
import { authAPI } from "./store/auth/authAPI";
import { sheetsAPI } from "./store/sheets/sheetsAPI";
import editorReducer from "./store/editor/editorSlice";
import sheetsReducer from "./store/sheets/sheetsSlice";
import temporalReducer from "./store/temporal/temporalSlice";
import konvaEditorReducer from "./store/konva-editor/konva-editorSlice";
import appReducer from "./store/app-store/appSlice";

export const queryMiddleares = [
  appApi.middleware,
  openAiAPI.middleware,
  authAPI.middleware,
  sheetsAPI.middleware,
];

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    konvaEditor: konvaEditorReducer,
    app: appReducer,
    sheets: sheetsReducer,
    temporal: temporalReducer,
    [laminasApi.reducerPath]: laminasApi.reducer,
    [openAiAPI.reducerPath]: openAiAPI.reducer,
    [appApi.reducerPath]: appApi.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [sheetsAPI.reducerPath]: sheetsAPI.reducer,
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
