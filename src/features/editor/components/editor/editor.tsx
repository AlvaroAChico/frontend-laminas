import React, { useRef } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

const ContainerEditorImage = styled.div`
  background: red;
  width: 100%;
  height: 100%;
  transition: 0.5s;
  position: relative;
`;

const CanvaContainer = styled.canvas`
  width: 100%;
  height: 100%;
`;
const ContainerSheet = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  column-gap: 10px;
`;
const SheetItem = styled.div`
  background: purple;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

const Editor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const ctxGlobalCanvas = useAppSelector(getContextCanvas);
  const dispatch = useAppDispatch();
  // ctxGlobalCanvas.shadowColor = "#4b4b4bbf";
  // ctxGlobalCanvas.shadowOffsetX = 1;
  // ctxGlobalCanvas.shadowOffsetY = 1;
  // ctxGlobalCanvas.shadowBlur = 4;

  React.useEffect(() => {
    localStorage.setItem("canva_active", "A4");
    const canvas = canvasRef.current;
    const ctxGlobalCanvas = canvas?.getContext("2d");
    // dispatch(updateCtxCanvas(ctxGlobalCanvas));
    if (ctxGlobalCanvas != null && ctxGlobalCanvas != undefined) {
      ctxGlobalCanvas.fillStyle = "white";
      ctxGlobalCanvas.fillRect(50, 50, 50, 50);
    }
  });

  const updateActiveCanvas = (activeCanva: string) => {
    clearActiveCanva();
    localStorage.setItem("canva_active", activeCanva);
  };

  const handleAddA4Sheet = () => {
    updateActiveCanvas("A4");
    // if (ctxGlobalCanvas != null && ctxGlobalCanvas != undefined) {
    // fillTemplateRect(ctxGlobalCanvas, 50, 50);
    // }
  };
  const handleAddOficioSheet = () => {
    updateActiveCanvas("Oficio");
    // if (ctxGlobalCanvas != null && ctxGlobalCanvas != undefined) {
    // fillTemplateRect(ctxGlobalCanvas, 60, 60);
    // }
  };
  const handleAddA3Sheet = () => {
    updateActiveCanvas("A3");
    // if (ctxGlobalCanvas != null && ctxGlobalCanvas != undefined) {
    // fillTemplateRect(ctxGlobalCanvas, 70, 70);
    // }
  };

  const clearActiveCanva = () => {
    const activeCanva = localStorage.getItem("canva_active");
    // if (ctxGlobalCanvas != null && ctxGlobalCanvas != undefined) {
    //   if (activeCanva == "A4") clearTemplateRect(ctxGlobalCanvas, 50, 50);
    //   if (activeCanva == "Oficio") clearTemplateRect(ctxGlobalCanvas, 60, 60);
    //   if (activeCanva == "A3") clearTemplateRect(ctxGlobalCanvas, 70, 70);
    // }
  };

  const fillTemplateRect = (
    ctxTemplate: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    ctxTemplate.fillStyle = "white";
    ctxTemplate.fillRect(50, 50, width, height);
  };

  const clearTemplateRect = (
    ctxTemplate: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    ctxTemplate.fillStyle = "red";
    ctxTemplate.clearRect(50, 50, width, height);
  };

  return (
    <ContainerEditorImage>
      <CanvaContainer ref={canvasRef} />
      <ContainerSheet>
        <SheetItem onClick={handleAddA4Sheet}>A4</SheetItem>
        <SheetItem onClick={handleAddOficioSheet}>Oficio</SheetItem>
        <SheetItem onClick={handleAddA3Sheet}>A3</SheetItem>
      </ContainerSheet>
    </ContainerEditorImage>
  );
};

export default Editor;
