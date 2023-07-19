import React from "react";
import styled from "styled-components";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import { Outlet } from "react-router-dom";

const WrapperLayout = styled.div`
  width: 100%;
  height: 100%;
`;

const CustomLayout: React.FC = () => {
  return (
    <WrapperLayout>
      <Navbar />
      <Outlet />
      <Footer />
    </WrapperLayout>
  );
};

export default CustomLayout;
