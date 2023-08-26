import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderStyle = styled.span`
  width: 25px;
  height: 25px;
  border: 3px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotate} 1s linear infinite;
`;

export enum EStylesLoader {
  BUTTON = "BUTTON",
}
interface IOwnProps {
  style?: EStylesLoader;
}
const CustomLoader: React.FC<IOwnProps> = ({
  style = EStylesLoader.BUTTON,
}) => {
  if (style === EStylesLoader.BUTTON) {
    return <LoaderStyle></LoaderStyle>;
  }

  return null;
};

export default CustomLoader;
