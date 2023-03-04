import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./store/counter/counterSlice";
import { laminasApi } from "./store/editor/editorAPI";
import editorReducer from "./store/editor/editorSlice";

export const queryMiddleares = [laminasApi.middleware];

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    editor: editorReducer,
    [laminasApi.reducerPath]: laminasApi.reducer,
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
