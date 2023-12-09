import { Stage } from "react-konva";
import styled from "styled-components";

export const WrapperPage = styled.div`
  position: relative;
  background-color: #e5e5f7;
  background-image: linear-gradient(#ffffff 1px, transparent 1px),
    linear-gradient(to right, #ffffff 1px, #e9eaed 1px);
  background-size: 20px 20px;
  overflow-y: hidden;
  overflow-x: hidden;

  * {
    box-sizing: border-box;
    font-family: Inter;
    font-weight: 400;
  }
`;

export const MainStage = styled(Stage)<{ cursorStyle: number }>`
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  cursor: ${(p) => (p.cursorStyle == 1 ? "cursor" : "grab")};

  > canvas {
    display: block;
  }
`;
export const GlobalTextArea = styled.textarea<{
  styleWidth: number;
  styleHeight: number;
  currentTextFontSize: number;
  currentTextFontFamily: string;
  currentTextColor: string;
  currentTextAlign: string;
}>`
  background: transparent;
  border: 0;
  outline: none;
  resize: unset;
  height: ${(p) => p.styleHeight + 5}px;
  width: ${(p) => p.styleWidth + 5}px;
  font-size: ${(p) => p.currentTextFontSize}px;
  color: ${(p) => p.currentTextColor};
  font-family: "${(p) => p.currentTextFontFamily}" !important;
  text-align: ${(p) => p.currentTextAlign};
`;
export const BackdropDownload = styled.div`
  position: absolute;
  background: #00000061;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
export const LottieContainer = styled.div`
  margin: auto;
  backdrop-filter: blur(30px);
  height: fit-content;
  width: fit-content;
  background: white;
  border-radius: 20px;
  position: relative;
  padding: 30px 15px 0;

  > p {
    position: absolute;
    text-align: center;
    z-index: 2;
    top: 0;
    font-size: 14px;
  }
  ::after {
    content: "";
    position: absolute;
    background: rgb(252, 74, 65);
    background: linear-gradient(
      90deg,
      rgba(252, 74, 65, 20%) 0%,
      rgba(56, 62, 71, 20%) 100%
    );
    width: 80px;
    height: 80px;
    top: -30px;
    left: -30px;
    border-radius: 50%;
    backdrop-filter: blur(30px);
  }
  ::before {
    content: "";
    position: absolute;
    background: rgb(163, 254, 172);
    background: linear-gradient(
      90deg,
      rgba(163, 254, 172, 20%) 0%,
      rgba(111, 164, 242, 20%) 100%
    );
    width: 80px;
    height: 80px;
    bottom: -30px;
    right: -30px;
    border-radius: 50%;
    backdrop-filter: blur(30px);
  }
`;
export const WrapperKeyPress = styled.div`
  position: relative;
`;
