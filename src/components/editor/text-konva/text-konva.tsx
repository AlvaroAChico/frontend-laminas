import React from "react";
import { Text, Transformer } from "react-konva";
import { useAppDispatch } from "../../../app/hooks";
import {
  deleteObjectKonva,
  updateActiveTextProperties,
  updateGlobalCoordText,
} from "../../../core/store/konva-editor/konva-editorSlice";

export interface TextInitialProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  text: string;
  fontSize: number;
  align: string;
}

interface IOwnProps {
  isSelected: boolean;
  shapeProps: TextInitialProps;
  customFill: string;
  customFontSize: number;
  customAlign: string;
  customFamily: string;
  onSelect: () => void;
  onChange: (arg: any) => void;
}

const TextKonva: React.FC<IOwnProps> = ({
  isSelected,
  shapeProps,
  customFill,
  customFontSize,
  customAlign,
  customFamily,
  onSelect,
  onChange,
}) => {
  const [initialProps, setInitialProps] = React.useState(shapeProps);
  const dispatch = useAppDispatch();
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
      <Text
        ref={shapeRef}
        draggable={true}
        width={initialProps.width}
        height={initialProps.height}
        x={initialProps.x}
        y={initialProps.y}
        text={initialProps.text}
        fill={customFill} // Editable
        fontSize={customFontSize} // Editable
        align={customAlign} // Editable
        fontFamily={customFamily} // Editable
        onTap={onSelect}
        onClick={onSelect}
        onMouseDown={onSelect}
        fontStyle="bold"
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
        onDblClick={() => {
          // const txtarea: HTMLTextAreaElement | any = document.getElementById("global-text-editor");
          // txtarea!.innerText
          dispatch(updateGlobalCoordText());
          dispatch(updateActiveTextProperties());
          dispatch(deleteObjectKonva());
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

export default TextKonva;
