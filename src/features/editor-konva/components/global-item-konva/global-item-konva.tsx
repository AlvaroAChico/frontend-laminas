import React, { MutableRefObject } from "react";
import CircleFigure, {
  CircleInitialProps,
} from "../../../../components/editor/circle/circle-figure";
import RectFigure, {
  RectInitialProps,
} from "../../../../components/editor/rect/rect-figure";
import TriangleFigure, {
  TriangleInitialProps,
} from "../../../../components/editor/triangle/triangle-figure";
import { ComponentKonvaItem } from "../../editor-konva";
import TextKonva, {
  TextInitialProps,
} from "../../../../components/editor/text-konva/text-konva";
import ImageKonva, {
  ImageInitialProps,
} from "../../../../components/editor/image-konva/image-konva";

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
  initialText?: string; // Solo para texto:
  initialAlign?: string; // Solo para texto:
  initialSize?: string; // Solo para texto:
  customFill?: string; // Solo para texto:
  customFontSize?: number; // Solo para texto:
  customAlign?: string; // Solo para texto:
  customFamily?: string; // Solo para texto:
  initialImage?: string; // Solo para imagen:
  color?: string; // Solo para figuras
  stroke?: string; // Solo para figuras
  sizeStroke?: number; // Solo para figuras
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
  initialText,
  initialAlign,
  initialSize,
  initialImage,
  color,
  stroke,
  sizeStroke,
  customFill,
  customFontSize,
  customAlign,
  customFamily,
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
          color={color!}
          stroke={stroke!}
          sizeStroke={sizeStroke!}
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
          isSelected={isSelected}
          shapeProps={
            {
              x: initialX,
              y: initialY,
              width: initialWidth,
              height: initialHeight,
              fill: initialFill,
            } as RectInitialProps
          }
          color={color!}
          stroke={stroke!}
          sizeStroke={sizeStroke!}
          onSelect={onSelect}
          onChange={onChange}
        />
      </>
    );
  }
  if (type == KonvaTypeItem.TRIANGLE) {
    return (
      <>
        <TriangleFigure
          isSelected={isSelected}
          shapeProps={
            {
              x: initialX,
              y: initialY,
              width: initialWidth,
              height: initialHeight,
              fill: initialFill,
              sides: 3,
            } as TriangleInitialProps
          }
          color={color!}
          stroke={stroke!}
          sizeStroke={sizeStroke!}
          onSelect={onSelect}
          onChange={onChange}
        />
      </>
    );
  }
  if (type == KonvaTypeItem.TEXT) {
    return (
      <>
        <TextKonva
          isSelected={isSelected}
          customFill={customFill!}
          customFontSize={customFontSize!}
          customAlign={customAlign!}
          customFamily={customFamily!}
          shapeProps={
            {
              x: initialX,
              y: initialY,
              width: initialWidth,
              height: initialHeight,
              fill: initialFill,
              text: initialText,
              fontSize: initialSize || 14,
              align: initialAlign || "",
            } as TextInitialProps
          }
          onSelect={onSelect}
          onChange={onChange}
        />
      </>
    );
  }
  if (type == KonvaTypeItem.IMAGE) {
    return (
      <>
        <ImageKonva
          isSelected={isSelected}
          shapeProps={
            {
              x: initialX,
              y: initialY,
              width: initialWidth,
              height: initialHeight,
              fill: initialFill,
              image: initialImage,
            } as ImageInitialProps
          }
          onSelect={onSelect}
          onChange={onChange}
        />
      </>
    );
  }

  return null;
};

export default GlobalItemKonva;
