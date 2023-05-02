import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../../app/hooks";
import {
  getActiveGlobalSheet,
  getSizeGlobalSheet,
} from "../../../../core/store/konva-editor/konva-editorSlice";
import { ArrowDownload } from "@styled-icons/fluentui-system-filled/ArrowDownload";
import jsPDF from "jspdf";

const WrapperOptions = styled.div``;
const ContainerButton = styled.button`
  position: absolute;
  bottom: 15px;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
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

  return (
    <WrapperOptions>
      <ContainerButton onClick={downloadActivePanel}>
        Descargar
        <ArrowDownload />
      </ContainerButton>
    </WrapperOptions>
  );
};

export default AlternativeOptions;
