import React, { MutableRefObject } from "react";
import { InfoOutline } from "@styled-icons/evaicons-outline/InfoOutline";
import styled from "styled-components";
import { customPalette } from "../../../../../config/theme/theme";
import { Circle } from "@styled-icons/boxicons-solid/Circle";
import { Rectangle } from "@styled-icons/boxicons-solid/Rectangle";
import { Triangle } from "@styled-icons/ionicons-sharp/Triangle";
import RectFigure from "../../../../../components/editor/rect/rect-figure";
import { useAppDispatch } from "../../../../../app/hooks";
import {
  addItemKonva,
  updateActiveIDKonva,
} from "../../../../../core/store/konva-editor/konva-editorSlice";
import { CircleInitialProps } from "../../../../../components/editor/circle/circle-figure";
import { ComponentKonvaItem } from "../../../editor-konva";
import { KonvaTypeItem } from "../../global-item-konva/global-item-konva";

const WrapperMenuFiguras = styled.div<{
  isVisible: boolean;
  isMobileActive: boolean;
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
const BodyCard = styled.div`
  background: white;
  border-radius: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-around;
  padding: 10px;

  > svg {
    width: 100%;
    max-width: 60px;
    cursor: pointer;
    transition: 0.5s;

    :hover {
      transform: scale(1.05);
    }
  }
`;

interface IOwnProps {
  isVisible: boolean;
  canvaRef: MutableRefObject<HTMLCanvasElement | undefined>;
  layerRef: MutableRefObject<any>;
  isMobileActive?: boolean;
}

const SubMenuFiguras: React.FC<IOwnProps> = ({
  isVisible,
  layerRef,
  isMobileActive = false,
}) => {
  const dispatch = useAppDispatch();

  const handleSelectCircle = () => {
    const activeID = Date.now();
    dispatch(
      addItemKonva({
        id: `circle${activeID}`,
        type: KonvaTypeItem.CIRCLE,
        x: layerRef.current.children[0].attrs.x + 50,
        y: layerRef.current.children[0].attrs.y + 50,
        height: 100,
        width: 100,
        fill: "blue",
        color: "#00ff00",
        stroke: "#00ff00",
        sizeStroke: 1,
      } as ComponentKonvaItem)
    );
    dispatch(updateActiveIDKonva(`circle${activeID}`));
  };
  const handleSelectRect = () => {
    const activeID = Date.now();
    dispatch(
      addItemKonva({
        id: `rect${activeID}`,
        type: KonvaTypeItem.RECT,
        x: layerRef.current.children[0].attrs.x,
        y: layerRef.current.children[0].attrs.y,
        height: 100,
        width: 100,
        fill: "blue",
        color: "#00ff00",
        stroke: "#00ff00",
        sizeStroke: 1,
      } as ComponentKonvaItem)
    );
    dispatch(updateActiveIDKonva(`rect${activeID}`));
  };
  const handleSelectTriangle = () => {
    const activeID = Date.now();
    dispatch(
      addItemKonva({
        id: `triangle${activeID}`,
        type: KonvaTypeItem.TRIANGLE,
        x: layerRef.current.children[0].attrs.x + 45,
        y: layerRef.current.children[0].attrs.y + 50,
        height: 100,
        width: 100,
        fill: "blue",
        color: "#00ff00",
        stroke: "#00ff00",
        sizeStroke: 1,
      } as ComponentKonvaItem)
    );
    dispatch(updateActiveIDKonva(`triangle${activeID}`));
  };

  return (
    <WrapperMenuFiguras
      id="menuFiguras"
      isVisible={isVisible}
      isMobileActive={isMobileActive}
    >
      <HeaderText>
        <h3>Panel Figuras</h3>
        <p>
          Recuerda seleccionar la figura para poder visualizar los controles.
          Selecciona la figura para poder agregarla.
        </p>
        <IconInfo />
      </HeaderText>
      <BodyCard>
        <Circle onClick={handleSelectCircle} />
        <Rectangle onClick={handleSelectRect} />
        <Triangle onClick={handleSelectTriangle} />
      </BodyCard>
    </WrapperMenuFiguras>
  );
};

export default SubMenuFiguras;
