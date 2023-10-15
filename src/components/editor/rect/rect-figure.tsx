import React from "react";
import { Rect, Transformer } from "react-konva";
import { RotateRight } from "@styled-icons/fa-solid/RotateRight";
import RotateIMG from "../../../assets/img/arturito-openai.png";

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

        // const rot = trRef.current!.findOne(".rotater");

        // const iconCanvas = document.createElement("canvas");
        // iconCanvas.width = rot.width();
        // iconCanvas.height = rot.height();

        // const ctx = iconCanvas.getContext("2d");
        // ctx!.fillStyle = "white";
        // ctx!.fillRect(0, 0, iconCanvas.width, iconCanvas.height);
        // ctx!.drawImage(RotateIMG, 0, 0, iconCanvas.width, iconCanvas.height);
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
        onMouseEnter={(e: any) => {
          const container = e.target.getStage().container();
          container.style.cursor = "pointer";
        }}
        onMouseLeave={(e: any) => {
          const container = e.target.getStage().container();
          container.style.cursor = "default";
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
