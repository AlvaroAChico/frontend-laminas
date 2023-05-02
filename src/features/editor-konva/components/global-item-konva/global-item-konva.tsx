import React, { MutableRefObject } from "react";
import CircleFigure, {
  CircleInitialProps,
} from "../../../../components/editor/circle/circle-figure";
import RectFigure, {
  RectInitialProps,
} from "../../../../components/editor/rect/rect-figure";
import TriangleFigure from "../../../../components/editor/triangle/triangle-figure";
import { ComponentKonvaItem } from "../../editor-konva";

export enum KonvaTypeItem {
  CIRCLE = "CIRCLE",
  RECT = "RECT",
  TRIANGLE = "TRIANGLE",
  IMAGE = "IMAGE",
  TEXT = "TEXT",
}

export interface GlobalItemKonvaProps {
  id: string;
  url?: string;
  image?: string;
  type: KonvaTypeItem;
  initialX: number;
  initialY: number;
  initialWidth: number;
  initialHeight: number;
  isSelected: boolean;
  initialFill: string;
  onSelect: () => void;
  onChange: (newAttrs: ComponentKonvaItem) => void;
  canvaRef: MutableRefObject<HTMLCanvasElement | undefined>;
}

const GlobalItemKonva: React.FC<GlobalItemKonvaProps> = ({
  type,
  isSelected,
  initialX,
  initialY,
  initialWidth,
  initialHeight,
  initialFill,
  onSelect,
  onChange,
}) => {
  if (type == KonvaTypeItem.CIRCLE) {
    return (
      <>
        <CircleFigure
          isSelected={isSelected}
          shapeProps={
            {
              x: initialX,
              y: initialY,
              width: initialWidth,
              height: initialHeight,
              fill: initialFill,
            } as CircleInitialProps
          }
          onSelect={onSelect}
          onChange={onChange}
        />
      </>
    );
  }
  if (type == KonvaTypeItem.RECT) {
    return (
      <>
        <RectFigure
          isSelected={false}
          shapeProps={
            {
              x: initialX,
              y: initialY,
              width: initialWidth,
              height: initialHeight,
              fill: initialFill,
            } as RectInitialProps
          }
          onSelect={onSelect}
          onChange={onChange}
        />
      </>
    );
  }
  if (type == KonvaTypeItem.TRIANGLE) {
    return (
      <>
        <TriangleFigure />
      </>
    );
  }

  return null;
};

export default GlobalItemKonva;
