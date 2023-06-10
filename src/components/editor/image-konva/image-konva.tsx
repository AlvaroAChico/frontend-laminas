import React from "react";
import { Image, Transformer } from "react-konva";

export interface ImageInitialProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  image: string;
}

interface IOwnProps {
  isSelected: boolean;
  shapeProps: ImageInitialProps;
  onSelect: () => void;
  onChange: (arg: any) => void;
}

const ImageKonva: React.FC<IOwnProps> = ({
  isSelected,
  shapeProps,
  onSelect,
  onChange,
}) => {
  const [initialProps, setInitialProps] = React.useState(shapeProps);
  const shapeRef = React.useRef<any>();
  const trRef = React.useRef<any>();
  const img = new window.Image();
  img.src = shapeProps.image;

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
      <Image
        ref={shapeRef}
        draggable={true}
        image={img}
        width={initialProps.width}
        height={initialProps.height}
        x={initialProps.x}
        y={initialProps.y}
        fill={initialProps.fill}
        onTap={onSelect}
        onClick={onSelect}
        onMouseOver={onSelect}
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
        radiusX={50}
        radiusY={50}
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

export default ImageKonva;
