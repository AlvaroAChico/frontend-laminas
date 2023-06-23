import React from "react";
import { RegularPolygon, Transformer } from "react-konva";
import { useAppSelector } from "../../../app/hooks";
import { getActiveComponentKonvaID } from "../../../core/store/konva-editor/konva-editorSlice";

export interface TriangleInitialProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  sides: number;
}
interface IOwnProps {
  isSelected: boolean;
  shapeProps: TriangleInitialProps;
  color: string;
  stroke: string;
  sizeStroke: number;
  onSelect: () => void;
  onChange: (arg: any) => void;
}

const TriangleFigure: React.FC<IOwnProps> = ({
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
  const activeComponent = useAppSelector(getActiveComponentKonvaID);

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
      <RegularPolygon
        ref={shapeRef}
        draggable={true}
        {...shapeProps}
        radius={50}
        onTap={onSelect}
        onClick={onSelect}
        onMouseDown={onSelect}
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

export default TriangleFigure;
