import React from "react";
import Cookies from "js-cookie";
import EditorElaminas from "./features/editor/editor-elaminas";
import ElaminasEditor from "./features/elaminas-editor/elaminas-editor";
import EditorKonva from "./features/editor-konva/editor-konva";
import { useAppDispatch } from "./app/hooks";
import {
  updateCanvasHeight,
  updateCanvasWidth,
} from "./core/store/konva-editor/konva-editorSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  window.addEventListener("resize", () => {
    dispatch(updateCanvasHeight(window.innerHeight - 50));
    dispatch(updateCanvasWidth(window.innerWidth));
  });

  // return <EditorElaminas />;
  // return <ElaminasEditor />;
  return <EditorKonva />;
};

export default App;
