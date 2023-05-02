import React from "react";
import { NavigateNext } from "@styled-icons/material-outlined/NavigateNext";
import { InfoOutline } from "@styled-icons/evaicons-outline/InfoOutline";
import styled from "styled-components";
import { customPalette } from "../../../../../config/theme/theme";
import { menuSizeSheet } from "../data-menu/data-menu";
import {
  getActiveGlobalSheet,
  updateActiveGlobalSheet,
} from "../../../../../core/store/konva-editor/konva-editorSlice";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";

const WrapperMenuGeneral = styled.div<{ isVisible: boolean }>`
  background: ${customPalette.grayLightColor};
  box-shadow: 0px 4px 15px 6px rgba(98, 98, 98, 0.25);
  position: absolute;
  width: fit-content;
  min-width: 300px;
  max-width: 600px;
  border-radius: 15px;
  left: 120%;
  top: 0;
  padding: 10px;
  z-index: 1;
  cursor: auto;
  ${(p) => (p.isVisible ? "" : `display: none; width: 0; height: 0;`)};
`;

const HeaderText = styled.div`
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
const ItemSheet = styled.div<{ isActive: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: ${(p) => (p.isActive ? customPalette.successColor : "white")};
  border-radius: 15px;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
`;
const ImageSheet = styled.div`
  > div {
    background: ${customPalette.grayLightColor};
    border: 1px solid ${customPalette.grayDarkColor};
    border-radius: 10px;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const InfoSheet = styled.div`
  width: 100%;
  margin-left: 10px;

  > h5 {
    margin: 0;
    color: ${customPalette.grayDarkColor};
    font-weight: 500;
    margin-bottom: 5px;
  }
  > p {
    margin: 0;
    font-size: 12px;
    color: ${customPalette.grayDarkColor};
    font-weight: 200;
    margin-left: 5px;
  }
`;
const WrapperIcon = styled.div`
  > svg {
    width: 100%;
    max-width: 35px;
  }
`;
const IconInfo = styled(InfoOutline)`
  position: absolute;
  width: 15px;
  top: 0;
  right: 12px;
  color: black;
`;

interface IOwnProps {
  isVisible: boolean;
}
const SubMenuGeneral: React.FC<IOwnProps> = ({ isVisible }) => {
  const dispatch = useAppDispatch();
  const sheetActive = useAppSelector(getActiveGlobalSheet);

  const handleUpdateGlobalSheet = (option: number) => () =>
    dispatch(updateActiveGlobalSheet(option));

  return (
    <WrapperMenuGeneral id="menuGeneral" isVisible={isVisible}>
      <HeaderText>
        <h3>Panel General</h3>
        <p>Selecciona el tamaño de la descarga del documento</p>
        <IconInfo />
      </HeaderText>
      {menuSizeSheet.map((sheet) => (
        <ItemSheet
          key={sheet.idActive}
          isActive={sheet.idActive == sheetActive}
          onClick={handleUpdateGlobalSheet(sheet.idActive)}
        >
          <ImageSheet>
            <div>{sheet.name}</div>
          </ImageSheet>
          <InfoSheet>
            <h5>Medidas:</h5>
            <p>Ancho: {sheet.width}mm</p>
            <p>Alto: {sheet.height}mm</p>
          </InfoSheet>
          <WrapperIcon>
            <NavigateNext />
          </WrapperIcon>
        </ItemSheet>
      ))}
    </WrapperMenuGeneral>
  );
};

export default SubMenuGeneral;
