import React from "react";
import { Circle, Layer, Rect } from "react-konva";
import { useAppSelector } from "../../../../app/hooks";
import {
  getActiveGlobalSheet,
  getCanvasHeight,
  getCanvasWidth,
  getSizeGlobalSheet,
} from "../../../../core/store/konva-editor/konva-editorSlice";

interface IOwnProps {
  refLayer: any;
}
const LayerEditor: React.FC<IOwnProps> = ({ refLayer }) => {
  const sizeGlobalSheet = useAppSelector(getSizeGlobalSheet);
  const activeSheet = useAppSelector(getActiveGlobalSheet);
  const canvasWidth = useAppSelector(getCanvasWidth);
  const canvasHeight = useAppSelector(getCanvasHeight);
  const heightCalc =
    window.innerHeight / sizeGlobalSheet[activeSheet - 1][1] - 0.3;
  const [layerPDFWidth, setLayerPDFWidth] = React.useState(
    sizeGlobalSheet[activeSheet - 1][0] * heightCalc
  );
  const [layerPDFHeight, setLayerPDFHeight] = React.useState(
    sizeGlobalSheet[activeSheet - 1][1] * heightCalc
  );

  React.useEffect(() => {
    const heightCalc =
      window.innerHeight / sizeGlobalSheet[activeSheet - 1][1] - 0.3;
    setLayerPDFWidth(sizeGlobalSheet[activeSheet - 1][0] * heightCalc);
    setLayerPDFHeight(sizeGlobalSheet[activeSheet - 1][1] * heightCalc);
  }, [activeSheet]);

  window.addEventListener("resize", () => {
    const heightCalc =
      window.innerHeight / sizeGlobalSheet[activeSheet - 1][1] - 0.3;
    setLayerPDFWidth(sizeGlobalSheet[activeSheet - 1][0] * heightCalc);
    setLayerPDFHeight(sizeGlobalSheet[activeSheet - 1][1] * heightCalc);
  });

  return (
    <Layer ref={refLayer}>
      <Rect
        x={canvasWidth / 2 - layerPDFWidth / 2}
        y={canvasHeight / 2 - layerPDFHeight / 2}
        width={layerPDFWidth}
        height={layerPDFHeight}
        fill={"white"}
        shadowColor="#797979e6"
        shadowBlur={12}
        draggable={false}
      />
    </Layer>
  );
};

export default LayerEditor;
