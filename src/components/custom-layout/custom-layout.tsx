import React from "react";
import styled from "styled-components";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { IAuthData } from "../../core/store/auth/types/auth-types";
import {
  getStatusAuthenticated,
  updateDataUserAuth,
  updateStatusModalCoupon,
  updateStatusModalLogin,
  updateStatusAuthenticated,
} from "../../core/store/app-store/appSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Whatsapp } from "@styled-icons/bootstrap/Whatsapp";
import AvatarImg from "../../assets/img/avatar_coupon.png";
import EditorImg from "../../assets/img/editor_image.png";
import { Tooltip } from "@mui/material";

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

  React.useEffect(() => {
    const authCookie = Cookies.get("auth_user");
    if (authCookie != null && authCookie != undefined) {
      const authUser: IAuthData = JSON.parse(authCookie);
      dispatch(updateDataUserAuth(authUser));
      dispatch(updateStatusAuthenticated(true));
    }
  }, []);

  const handleOpenCoupon = () => {
    if (isAuthenticated) {
      dispatch(updateStatusModalCoupon(true));
    } else {
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
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppButton onClick={handleOpenWhatsapp}>
        <Whatsapp />
      </WhatsAppButton>
      <EditorButton onClick={handleOpenEditor}>
        <img src={EditorImg} />
      </EditorButton>
      <Tooltip title="¿Tienes un cuópón?" arrow>
        <CouponButton onClick={handleOpenCoupon}>
          <img src={AvatarImg} />
        </CouponButton>
      </Tooltip>
    </WrapperLayout>
  );
};

export default CustomLayout;
