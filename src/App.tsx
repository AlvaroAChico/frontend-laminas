import React from "react";
import { useAppDispatch } from "./app/hooks";
import {
  updateCanvasHeight,
  updateCanvasWidth,
} from "./core/store/konva-editor/konva-editorSlice";
import { breakpoints } from "./constants/breakpoints";
import { Outlet } from "react-router-dom";
import { updateValueScroll } from "./core/store/app-store/appSlice";
import ModalLogin from "./components/modals/modal-login";
import ModalRegister from "./components/modals/modal-register";
import ModalCoupon from "./components/modals/modal-coupon";
import ModalRecover from "./components/modals/modal-recover";
import ModalSheetDetail from "./components/modals/modal-sheet-detail";
import ModalPayment from "./components/modals/modal-payment";

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
      {/* Section Modals */}
      <ModalLogin />
      <ModalRegister />
      <ModalCoupon />
      <ModalRecover />
      <ModalSheetDetail />
      <ModalPayment />
    </React.Fragment>
  );
};

export default App;
