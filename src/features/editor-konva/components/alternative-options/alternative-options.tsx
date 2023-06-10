import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  getActiveGlobalSheet,
  getConfigStageZoom,
  getSizeGlobalSheet,
  updateStageZoom,
} from "../../../../core/store/konva-editor/konva-editorSlice";
import { ArrowDownload } from "@styled-icons/fluentui-system-filled/ArrowDownload";
import { ZoomIn } from "@styled-icons/bootstrap/ZoomIn";
import { ZoomOut } from "@styled-icons/bootstrap/ZoomOut";
import jsPDF from "jspdf";

const WrapperOptions = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 15px;
`;
const ContainerButton = styled.button`
  display: flex;
  gap: 5px;
  background-image: linear-gradient(to right, #fc4464, #fc4c3c, #fc4c2c);
  border: 2px solid #fff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 30px;
  box-shadow: 0px 4px 6px 5px #ff7f956b;
  cursor: pointer;

  > svg {
    width: 15px;
  }
`;

interface IOwnProps {
  canvaGlobalRef: any;
  layerGlobalRef: any;
}
const AlternativeOptions: React.FC<IOwnProps> = ({
  canvaGlobalRef,
  layerGlobalRef,
}) => {
  const sizeGlobalSheet = useAppSelector(getSizeGlobalSheet);
  const activeSheet = useAppSelector(getActiveGlobalSheet);
  const valueStageZoom = useAppSelector(getConfigStageZoom);

  const dispatch = useAppDispatch();

  const downloadActivePanel = () => {
    if (canvaGlobalRef != null) {
      const img = document.createElement("img");
      img.src = canvaGlobalRef.current!.toDataURL();

      img.onload = function () {
        const canvaCut = document.createElement("canvas");
        canvaCut.width = layerGlobalRef.current!.children[0].attrs.width;
        canvaCut.height = layerGlobalRef.current!.children[0].attrs.height;
        const ctx = canvaCut.getContext("2d")!;
        console.log("Layer -> ", layerGlobalRef.current!.children[0].attrs);
        ctx!.drawImage(
          img,
          layerGlobalRef.current!.children[0].attrs.x,
          layerGlobalRef.current!.children[0].attrs.y,
          layerGlobalRef.current!.children[0].attrs.width,
          layerGlobalRef.current!.children[0].attrs.height,
          0,
          0,
          layerGlobalRef.current!.children[0].attrs.width,
          layerGlobalRef.current!.children[0].attrs.height
        );
        const newImage = document.createElement("img");
        newImage.src = canvaCut.toDataURL("image/png", 1.0);
        console.log("CanvaCUT", canvaCut.toDataURL("image/png", 1.0));
        document.body.appendChild(newImage);
        // Create PDF download
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: sizeGlobalSheet[activeSheet - 1],
        });
        const imgWidth = sizeGlobalSheet[activeSheet - 1][0];
        const imgHeight = sizeGlobalSheet[activeSheet - 1][1];
        doc.addImage(newImage, "PNG", 0, 0, imgWidth, imgHeight);
        doc.save("elaminas.pdf");
      };
    }
  };

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

  return (
    <WrapperOptions>
      <ContainerButton onClick={downloadActivePanel}>
        <ArrowDownload />
      </ContainerButton>
      <ContainerButton onClick={handleInGlobalZoom}>
        <ZoomIn />
      </ContainerButton>
      <ContainerButton onClick={handleOutGlobalZoom}>
        <ZoomOut />
      </ContainerButton>
    </WrapperOptions>
  );
};

export default AlternativeOptions;
