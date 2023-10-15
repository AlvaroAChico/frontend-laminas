import React from "react";
import styled from "styled-components";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  IAuthData,
  IFunctionality,
} from "../../core/store/auth/types/auth-types";
import {
  getStatusAuthenticated,
  updateDataUserAuth,
  updateStatusModalCoupon,
  updateStatusModalLogin,
  updateStatusAuthenticated,
  updateDataToken,
  updateDataFunctionality,
  getIsLoadingApp,
  updateLoadingApp,
} from "../../core/store/app-store/appSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Whatsapp } from "@styled-icons/bootstrap/Whatsapp";
import AvatarImg from "../../assets/img/avatar_coupon.png";
import EditorImg from "../../assets/img/editor_image.png";
import { Tooltip } from "@mui/material";
import { APP_CONSTANS } from "../../constants/app";
import CustomLoader from "../custom-loader/custom-loader";
import {
  ETemporalActions,
  updateTemporalAction,
} from "../../core/store/temporal/temporalSlice";
import ModalSheetDetail from "../modals/modal-sheet-detail";
import ModalCoupon from "../modals/modal-coupon";
import ModalRecover from "../modals/modal-recover";
import ModalChangePassword from "../modals/modal-change-password";
import ModalViewSheetPDF from "../modals/modal-view-sheet-pdf";
import ModalViewTutorial from "../modals/modal-view-tutorial";

const WrapperLayout = styled.div`
  width: 100%;
  height: 100%;
`;

const WhatsAppButton = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  position: fixed;
  bottom: 15px;
  left: 15px;
  background: #25d366;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  z-index: 4;
  border-radius: 50%;
  cursor: pointer;

  > svg {
    width: 35px;
    color: white;
  }
`;

const CouponButton = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 4;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  > img {
    width: 60px;
  }
`;

const ContainerLoading = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999999;
  background: #0000007d;
  display: grid;
  align-content: center;
  justify-content: center;
`;

const EditorButton = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  position: fixed;
  bottom: 100px;
  right: 15px;
  z-index: 4;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  > img {
    width: 65px;
    border-radius: 50%;
  }
`;

const CustomLayout: React.FC = () => {
  const isAuthenticated = useAppSelector(getStatusAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoadingApp = useAppSelector(getIsLoadingApp);

  React.useEffect(() => {
    dispatch(updateLoadingApp(false));
    const dataUser = Cookies.get(APP_CONSTANS.AUTH_USER_DATA);
    if (dataUser != null && dataUser != undefined) {
      const user = JSON.parse(dataUser) as IAuthData;
      dispatch(updateDataToken(user.token));
      const functionalityUser = localStorage.getItem(
        APP_CONSTANS.AUTH_FUNCIONALITIES
      );
      if (functionalityUser != null && functionalityUser != undefined) {
        dispatch(
          updateDataFunctionality(
            (JSON.stringify(functionalityUser) || []) as IFunctionality[]
          )
        );
      }
      dispatch(updateStatusAuthenticated(true));
    }
  }, []);

  const handleOpenCoupon = () => {
    if (isAuthenticated) {
      dispatch(updateStatusModalCoupon(true));
    } else {
      dispatch(updateTemporalAction(ETemporalActions.OPEN_COUPON));
      dispatch(updateStatusModalLogin(true));
    }
  };
  const handleOpenEditor = () => {
    navigate("/editor");
  };

  const handleOpenWhatsapp = () => {
    window.open("https://wa.link/8o4p6t", "_blank");
  };

  return (
    <WrapperLayout>
      {isLoadingApp && (
        <ContainerLoading>
          <CustomLoader />
        </ContainerLoading>
      )}
      <Navbar />
      <Outlet />
      <Footer />
      <Tooltip title="Contáctanos" arrow>
        <WhatsAppButton onClick={handleOpenWhatsapp}>
          <Whatsapp />
        </WhatsAppButton>
      </Tooltip>
      <Tooltip title="Editor" arrow>
        <EditorButton onClick={handleOpenEditor}>
          <img src={EditorImg} />
        </EditorButton>
      </Tooltip>
      <Tooltip title="¿Tienes un cupón?" arrow>
        <CouponButton onClick={handleOpenCoupon}>
          <img src={AvatarImg} />
        </CouponButton>
      </Tooltip>
      {/* Section Modals */}
      <ModalCoupon />
      <ModalRecover />
      {/* <ModalPayment /> */}
      <ModalSheetDetail />
      <ModalChangePassword />
      <ModalViewSheetPDF />
      <ModalViewTutorial />
    </WrapperLayout>
  );
};

export default CustomLayout;
