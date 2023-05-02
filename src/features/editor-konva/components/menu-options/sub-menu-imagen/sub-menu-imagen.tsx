import React from "react";
import { InfoOutline } from "@styled-icons/evaicons-outline/InfoOutline";
import styled from "styled-components";
import { customPalette } from "../../../../../config/theme/theme";

const WrapperMenuImagen = styled.div<{ isVisible: boolean }>`
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
const SubMenuImagen: React.FC<IOwnProps> = ({ isVisible }) => {
  return (
    <WrapperMenuImagen id="menuImagenes" isVisible={isVisible}>
      <HeaderText>
        <h3>Panel Imagenes</h3>
        <p>Selecciona el tamaño de la descarga del documento</p>
        <IconInfo />
      </HeaderText>
    </WrapperMenuImagen>
  );
};

export default SubMenuImagen;
