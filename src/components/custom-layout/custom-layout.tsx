import React from "react";
import styled from "styled-components";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { IAuthData } from '../../core/store/auth/types/auth-types';
import {
  getStatusAuthenticated,
  updateDataUserAuth,
  updateStatusModalCoupon,
  updateStatusModalLogin,
  updateStatusAuthenticated
} from '../../core/store/app-store/appSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Whatsapp } from '@styled-icons/bootstrap/Whatsapp'
import AvatarImg from '../../assets/img/avatar_coupon.png';

const WrapperLayout = styled.div`
  width: 100%;
  height: 100%;
`;

const WhatsAppButton = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  position: fixed;
  bottom: 15px;
  left: 15px;
  background: #25D366;
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
  `
  
  const CouponButton = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
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
`

const CustomLayout: React.FC = () => {
  const isAuthenticated = useAppSelector(getStatusAuthenticated)
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const authCookie = Cookies.get("auth_user")
    if(authCookie != null && authCookie != undefined){
      const authUser: IAuthData = JSON.parse(authCookie)
      dispatch(updateDataUserAuth(authUser));
      dispatch(updateStatusAuthenticated(true));
    }
  }, [])

  const handleOpenCoupon = () => {
    if(isAuthenticated){
      dispatch(updateStatusModalCoupon(true))
    }else{
      dispatch(updateStatusModalLogin(true))

    }
  }

  return (
    <WrapperLayout>
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppButton onClick={() => console.log}>
        <Whatsapp />
      </WhatsAppButton>
      <CouponButton onClick={handleOpenCoupon}>
        <img src={AvatarImg} />
      </CouponButton>
    </WrapperLayout>
  );
};

export default CustomLayout;
