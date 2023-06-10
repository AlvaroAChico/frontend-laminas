import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./store/counter/counterSlice";
import { laminasApi, openAiAPI } from "./store/editor/editorAPI";
import editorReducer from "./store/editor/editorSlice";
import konvaEditorReducer from "./store/konva-editor/konva-editorSlice";

export const queryMiddleares = [laminasApi.middleware, openAiAPI.middleware];

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    editor: editorReducer,
    konvaEditor: konvaEditorReducer,
    [laminasApi.reducerPath]: laminasApi.reducer,
    [openAiAPI.reducerPath]: openAiAPI.reducer,
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
