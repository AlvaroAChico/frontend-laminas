import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  getConfigStageZoom,
  updateStageZoom,
} from "../../../../core/store/konva-editor/konva-editorSlice";
import { ZoomIn } from "@styled-icons/bootstrap/ZoomIn";
import { ZoomOut } from "@styled-icons/bootstrap/ZoomOut";
import { ZoomOutMap } from "@styled-icons/material-rounded/ZoomOutMap";

const WrapperOptions = styled.div`
  position: absolute;
  bottom: 15px;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #c4c4c4;
  width: fit-content;
  margin: auto;
  border-radius: 20px;
`;
const ContainerButton = styled.button`
  display: flex;
  gap: 5px;
  padding: 10px 15px;
  outline: none;
  border: 0;
  background: transparent;
  cursor: pointer;
  border-radius: 20px;

  :hover {
    background: #919191;
  }
  > svg {
    width: 14px;
  }
`;

interface IOwnProps {
  canvaGlobalRef: any;
  layerGlobalRef: any;
}
const ZoomOptions: React.FC<IOwnProps> = ({
  canvaGlobalRef,
  layerGlobalRef,
}) => {
  const valueStageZoom = useAppSelector(getConfigStageZoom);

  const dispatch = useAppDispatch();

  const handleInGlobalZoom = () => {
    dispatch(
      updateStageZoom({
        scale: valueStageZoom.scale * 1.02,
        x: valueStageZoom.x,
        y: valueStageZoom.y,
      })
    );
  };
  const handleOutGlobalZoom = () => {
    dispatch(
      updateStageZoom({
        scale: valueStageZoom.scale / 1.02,
        x: valueStageZoom.x,
        y: valueStageZoom.y,
      })
    );
  };
  const handleResetGlobalZoom = () => {
    dispatch(
      updateStageZoom({
        scale: 1,
        x: 0,
        y: 0,
      })
    );
  };

  return (
    <WrapperOptions>
      <ContainerButton onClick={handleOutGlobalZoom}>
        <ZoomOut />
      </ContainerButton>
      <ContainerButton onClick={handleResetGlobalZoom}>
        <ZoomOutMap />
      </ContainerButton>
      <ContainerButton onClick={handleInGlobalZoom}>
        <ZoomIn />
      </ContainerButton>
    </WrapperOptions>
  );
};

export default ZoomOptions;
