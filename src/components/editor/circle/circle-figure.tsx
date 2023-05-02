import React from "react";
import { Circle, Transformer } from "react-konva";

export interface CircleInitialProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}

interface IOwnProps {
  isSelected: boolean;
  shapeProps: CircleInitialProps;
  onSelect: () => void;
  onChange: (arg: any) => void;
}

const CircleFigure: React.FC<IOwnProps> = ({
  isSelected,
  shapeProps,
  onSelect,
  onChange,
}) => {
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

  return (
    <React.Fragment>
      <Circle
        ref={shapeRef}
        draggable={true}
        {...shapeProps}
        onTap={onSelect}
        onClick={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
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

export default CircleFigure;
