import React from "react";
import Cookies from "js-cookie";
import EditorKonva from "./features/editor-konva/editor-konva";
import { useAppDispatch } from "./app/hooks";
import {
  updateCanvasHeight,
  updateCanvasWidth,
} from "./core/store/konva-editor/konva-editorSlice";
import { breakpoints } from "./constants/breakpoints";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  window.addEventListener("resize", () => {
    dispatch(
      updateCanvasHeight(
        window.innerWidth < breakpoints.tabletSValue
          ? window.innerHeight - 110
          : window.innerHeight - 50
      )
    );
    dispatch(updateCanvasWidth(window.innerWidth));
  });

  // return <EditorElaminas />;
  // return <ElaminasEditor />;
  return <EditorKonva />;
};

export default App;
