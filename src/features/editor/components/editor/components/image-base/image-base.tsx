/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components";
import Moveable from "react-moveable";
import { Frame } from "scenejs";
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import {
  deleteImage,
  getGeneralStatusControl,
} from "../../../../../../core/store/editor/editorSlice";

const ContainerMain = styled.div<{ active: boolean }>`
  position: relative;

  .moveable-control-box {
    ${(p) =>
      !p.active ? "visibility: hidden !important" : "visibility: visible;"};
  }
`;

const ContainerImage = styled.div`
  position: absolute;

  > img {
    width: 100%;
    height: 100%;
  }

  .moveable-line {
    display: none;
  }
`;
const ContainerDelete = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 10px;
  top: -25px;
  right: -25px;
  color: white;
  background: #de2b2b;
`;
export interface ImageBaseProps {
  id: number;
  image: string;
}

const ImageBase: React.FC<ImageBaseProps> = ({ id, image }) => {
  const [target, setTarget] = React.useState<any>();
  const [statusControls, setStatusControls] = React.useState(false);
  const [topValue, setTopValue] = React.useState(0);
  const [leftValue, setLeftValue] = React.useState(0);
  const [scaleValueX, setScaleX] = React.useState(1);
  const [scaleValueY, setScaleY] = React.useState(1);
  const [rotateValue, setRotateValue] = React.useState(0);
  const [widthValue, setWidthValue] = React.useState(250);
  const [heightValue, setHeightValue] = React.useState(200);
  const dispatch: any = useAppDispatch();
  const statusGeneralControl = useAppSelector(getGeneralStatusControl);
  const handleChangeActive = () => setStatusControls(!statusControls);
  const handleDeleteImage = () => dispatch(deleteImage(id));
  const handleMoveImage = () => setStatusControls(!statusControls);

  const frame = new Frame({
    width: `${widthValue}px`,
    height: `${heightValue}px`,
    left: `${leftValue}px`,
    top: `${topValue}px`,
    transform: {
      rotate: `${rotateValue}deg`,
      scaleX: scaleValueX,
      scaleY: scaleValueY,
      matrix3d: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    },
  });

  React.useEffect(() => {
    setTarget(document.querySelector(`.target${id}`)!);
  }, []);

  const setTransform = (target: any) => {
    target.style.cssText = frame.toCSS();
  };

  return (
    <>
      <ContainerMain
        id={`image_id${id}`}
        className="container"
        active={statusControls && statusGeneralControl}
        onDoubleClick={handleMoveImage}
        onClick={handleChangeActive}
      >
        <ContainerImage className={`target${id}`}>
          {statusControls && statusGeneralControl && (
            <ContainerDelete onClick={handleDeleteImage}>x</ContainerDelete>
          )}
          <img src={image} />
        </ContainerImage>
        <Moveable
          target={target}
          resizable={true}
          rotatable={true}
          draggable={true}
          pinchable={true}
          edge={false}
          zoom={1}
          origin={false}
          padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
          onRotate={({ target, beforeDelta }) => {
            const deg =
              parseFloat(frame.get("transform", "rotate")) + beforeDelta;
            // frame.set("transform", "rotate", `${deg}deg`);
            setRotateValue(deg);
            setTransform(target);
          }}
          onScale={({ target, delta }) => {
            const scaleX = frame.get("transform", "scaleX") * delta[0];
            const scaleY = frame.get("transform", "scaleY") * delta[1];
            // frame.set("transform", "scaleX", scaleX);
            // frame.set("transform", "scaleY", scaleY);
            setScaleX(scaleX);
            setScaleY(scaleY);
            setTransform(target);
          }}
          onDrag={({ target, top, left }) => {
            // frame.set("left", `${left}px`);
            // frame.set("top", `${top}px`);
            setLeftValue(left);
            setTopValue(top);
            setTransform(target);
          }}
          onResize={({ target, width, height }) => {
            frame.set("width", `${width}px`);
            frame.set("height", `${height}px`);
            setWidthValue(width);
            setHeightValue(height);
            setTransform(target);
          }}
        />
      </ContainerMain>
    </>
  );
};

export default ImageBase;
