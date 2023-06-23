import React, { MutableRefObject } from "react";
import styled from "styled-components";
import { customPalette } from "../../../../config/theme/theme";
import { SettingsOutline } from "@styled-icons/evaicons-outline/SettingsOutline";
import { CardImage } from "@styled-icons/bootstrap/CardImage";
import { Text } from "@styled-icons/evaicons-solid/Text";
import { Shapes } from "@styled-icons/ionicons-solid/Shapes";
import { ArrowIosBack } from "@styled-icons/evaicons-solid/ArrowIosBack";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  getActiveGlobalSheet,
  getActiveMenuOption,
  updateActiveGlobalSheet,
  updateActiveMenuOption,
} from "../../../../core/store/konva-editor/konva-editorSlice";
import SubMenuGeneral from "./sub-menu-general/sub-menu-general";
import SubMenuImagen from "./sub-menu-imagen/sub-menu-imagen";
import SubMenuTexto from "./sub-menu-texto/sub-menu-texto";
import SubMenuFiguras from "./sub-menu-figuras/sub-menu-figuras";

const WrapperMenu = styled.div`
  position: absolute;
  top: 12%;
  left: 2%;
  background: ${customPalette.primaryColor};
  border-radius: 15px;
`;

const baseCenterWithIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  > svg {
    width: 100%;
    max-width: 35px;
  }
`;
const ContainerItems = styled.div`
  padding: 8px;
`;
const ItemMenu = styled(baseCenterWithIcon)<{ isActive: boolean }>`
  background: ${(p) => (p.isActive ? "white" : customPalette.primaryColor)};
  color: ${(p) => (p.isActive ? customPalette.secondaryColor : "white")};
  border-radius: 12px;
  padding: 10px;
  position: relative;
`;
const ItemBack = styled(baseCenterWithIcon)`
  background: ${customPalette.secondaryColor};
  color: white;
  padding: 10px;
  border-radius: 0 0 15px 15px;
`;

interface IOwnProps {
  canvaGlobalRef: MutableRefObject<HTMLCanvasElement | undefined>;
  layerGlobalRef: any;
}
const MenuOptions: React.FC<IOwnProps> = ({
  canvaGlobalRef,
  layerGlobalRef,
}) => {
  const dispatch = useAppDispatch();
  const activeMenu = useAppSelector(getActiveMenuOption);

  const handleActiveMenu = (option: number) => () =>
    dispatch(updateActiveMenuOption(option));

  return (
    <WrapperMenu>
      <ContainerItems>
        <ItemMenu isActive={activeMenu == 1} onClick={handleActiveMenu(1)}>
          <SettingsOutline />
          General
          <SubMenuGeneral isVisible={activeMenu == 1} />
        </ItemMenu>
        <ItemMenu isActive={activeMenu == 2} onClick={handleActiveMenu(2)}>
          <CardImage />
          Imagenes
          <SubMenuImagen
            isVisible={activeMenu == 2}
            canvaRef={canvaGlobalRef}
            layerRef={layerGlobalRef}
          />
        </ItemMenu>
        <ItemMenu isActive={activeMenu == 3} onClick={handleActiveMenu(3)}>
          <Text />
          Texto
          <SubMenuTexto
            isVisible={activeMenu == 3}
            canvaRef={canvaGlobalRef}
            layerRef={layerGlobalRef}
          />
        </ItemMenu>
        <ItemMenu isActive={activeMenu == 4} onClick={handleActiveMenu(4)}>
          <Shapes />
          Figuras
          <SubMenuFiguras
            isVisible={activeMenu == 4}
            canvaRef={canvaGlobalRef}
            layerRef={layerGlobalRef}
          />
        </ItemMenu>
      </ContainerItems>
      <ItemBack>
        <ArrowIosBack />
        Regresar
      </ItemBack>
    </WrapperMenu>
  );
};

export default MenuOptions;
