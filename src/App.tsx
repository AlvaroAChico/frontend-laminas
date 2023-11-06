import React from "react";
import { useAppDispatch } from "./app/hooks";
import {
  updateCanvasHeight,
  updateCanvasWidth,
} from "./core/store/konva-editor/konva-editorSlice";
import { breakpoints } from "./constants/breakpoints";
import { Outlet } from "react-router-dom";
import { updateValueScroll } from "./core/store/app-store/appSlice";
import ModalPayment from "./components/modals/modal-payment";
import ModalLogin from "./components/modals/modal-login";
import ModalRegister from "./components/modals/modal-register";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  window.addEventListener("keydown", (e: any) => {
    const listBlackListKeyCode = [123];
    if (listBlackListKeyCode.includes(e.keyCode)) {
      e.preventDefault();
      return false;
    }
  });

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
      {/* Modals */}
      <ModalPayment />
      <ModalLogin />
      <ModalRegister />
    </React.Fragment>
  );
};

export default App;
