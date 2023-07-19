import React from "react";
import Cookies from "js-cookie";
import { useAppDispatch } from "./app/hooks";
import {
  updateCanvasHeight,
  updateCanvasWidth,
} from "./core/store/konva-editor/konva-editorSlice";
import { breakpoints } from "./constants/breakpoints";
import { Outlet } from "react-router-dom";
import { updateValueScroll } from "./core/store/landing/landingSlice";

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

  window.addEventListener("scroll", (e: any) => {
    dispatch(updateValueScroll(window.scrollY));
  });

  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default App;
