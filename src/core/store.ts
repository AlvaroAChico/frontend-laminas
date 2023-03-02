import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./store/counter/counterSlice";
import editorReducer from "./store/editor/editorSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    editor: editorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
