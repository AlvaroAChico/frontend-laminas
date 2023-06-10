import React, { MutableRefObject } from "react";
import { Rect, Transformer } from "react-konva";
import { useAppSelector } from "../../../app/hooks";
import { getActiveComponentKonvaID } from "../../../core/store/konva-editor/konva-editorSlice";

export interface RectInitialProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}
interface IOwnProps {
  isSelected: boolean;
  shapeProps: RectInitialProps;
  color: string;
  stroke: string;
  sizeStroke: number;
  onSelect: () => void;
  onChange: (arg: any) => void;
}
const RectFigure: React.FC<IOwnProps> = ({
  isSelected,
  shapeProps,
  color,
  stroke,
  sizeStroke,
  onSelect,
  onChange,
}) => {
  const [initialProps, setInitialProps] = React.useState(shapeProps);
  const shapeRef = React.useRef<any>();
  const trRef = React.useRef<any>();

  React.useEffect(() => {
    if (isSelected) {
      if (trRef != null) {
        trRef.current!.nodes([shapeRef.current]);
        trRef.current!.getLayer().batchDraw();
      }
    }
  }, [isSelected]);

  React.useEffect(() => {
    onChange(initialProps);
  }, [initialProps]);

  return (
    <React.Fragment>
      <Rect
        ref={shapeRef}
        draggable={true}
        {...shapeProps}
        onTap={onSelect}
        onClick={onSelect}
        onMouseOver={onSelect}
        fill={color}
        stroke={stroke}
        strokeWidth={sizeStroke}
        onDragEnd={(e) => {
          setInitialProps({
            ...initialProps,
            x: e.target.x(),
            y: e.target.y(),
            width: e.target.width(),
            height: e.target.height(),
          });
          // onChange(initialProps);
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          setInitialProps({
            ...initialProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
          // onChange(initialProps);
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={true}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default RectFigure;
