import styled, { keyframes } from "styled-components";
import { customPalette } from "../../../../../config/theme/theme";
import { InfoOutline } from "@styled-icons/evaicons-outline/InfoOutline";

export const WrapperMenuImagen = styled.div<{
  isVisible: boolean;
  isMobileActive?: boolean;
}>`
  width: fit-content;
  min-width: 300px;
  max-width: 600px;
  border-radius: 15px;
  left: 120%;
  top: 0;
  padding: 10px;
  z-index: 1;
  cursor: auto;

  ${(p) =>
    p.isMobileActive
      ? ""
      : `position: absolute; background: ${customPalette.grayLightColor};
    box-shadow: 0px 4px 15px 6px rgba(98, 98, 98, 0.25);`};
  ${(p) => (p.isVisible ? "" : `display: none; width: 0; height: 0;`)};
`;

export const HeaderText = styled.div`
  position: relative;
  margin-bottom: 15px;

  > h3 {
    color: ${customPalette.secondaryColor};
    margin-bottom: 10px;
  }

  > p {
    margin: 0;
    color: ${customPalette.grayDarkColor};
    font-size: 13px;
  }
`;
export const IconInfo = styled(InfoOutline)`
  position: absolute;
  width: 15px;
  top: 0;
  right: 12px;
  color: black;
`;

export const ContainerSteps = styled.div<{ stepActive: number }>`
    color: #bdbdbd;
    border: 1px solid #f5f9ff;
    background: #f5f9ff;
    width: fit-content;
    text-align: center;
    display: flex; column-gap: 10px;
    justify-content: left;
    align-items: center;
    margin-bottom: 15px;
    cursor: pointer;
  
    div:nth-child(${(p) => p.stepActive}) {
      padding 4px 8px;
      border-radius: 10px;
      color: #fff;
      border: 1px solid ${customPalette.secondaryColor};
      background: ${customPalette.secondaryColor};
    }
  `;
export const BodyCardLamina = styled.div``;
export const BodyCardImage = styled.div``;
export const UploadImageContainer = styled.div<{ isDragActive: boolean }>`
    border-style: dotted;
    border-width: 1px;
    border-color: ${customPalette.secondaryColor};
    background-color: transparent;
    font-family: verdana, arial;
    font-size: 10pt;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    row-gap: 8px;
    flex-direction: column;
    padding 30px 15px;
    position: relative;
  
    :after{
      ${(p) => (p.isDragActive ? "content: ''" : "")};
      position: absolute;
      background: #c2f78694;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
  `;
export const UploadButtonImage = styled.div`
  color: #fff;
  border: 1px solid ${customPalette.secondaryColor};
  background: ${customPalette.secondaryColor};
  outline: none;
  cursor: pointer;
  width: fit-content;
  padding: 4px 8px;
  border-radius: 10px;

  > input {
    display: none;
  }
`;
export const InfoTitleUpload = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5e5e5e;
  column-gap: 10px;
  max-width: 150px;

  svg {
    width: 100%;
    max-width: 30px;
    color: #b7b7b7;
  }
`;
export const SearchButton = styled.input`
  border: 0.5px solid #aeaeae;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 10px;
  margin-bottom: 8px;
  outline: none;
  width: 100%;
`;
export const WrapperListLaminas = styled.div`
  display: flex;
  row-gap: 5px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const WrapperItemsResults = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;
  height: 100%;
  max-height: 250px;
  overflow-x: hidden;
`;

export const ButtonMoreResults = styled.div`
  width: 100%;
  border-radius: 12px;
  color: white;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  background: ${customPalette.secondaryColor};
`;
export const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  `;
export const LoaderWrapper = styled.div`
  border: 6px solid #f3f3f3; /* Light grey */
  border-top: 6px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 0.8s linear infinite;
`;
