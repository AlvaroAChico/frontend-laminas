/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components";
import Moveable from "react-moveable";
import { Frame } from "scenejs";

const ContainerMain = styled.div<{ active: boolean }>`
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
export interface ImageBaseProps {
  id: number;
  image: string;
}

const ImageBase: React.FC<ImageBaseProps> = ({ id, image }) => {
  const [target, setTarget] = React.useState<any>();
  const [statusControls, setStatusControls] = React.useState(false);
  const frame = new Frame({
    width: "250px",
    height: "200px",
    left: "0px",
    top: "0px",
    transform: {
      rotate: "0deg",
      scaleX: 1,
      scaleY: 1,
      matrix3d: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    },
  });

  React.useEffect(() => {
    setTarget(document.querySelector(`.target${id}`)!);
  }, []);

  const setTransform = (target: any) => {
    target.style.cssText = frame.toCSS();
  };

  const handleMoveImage = () => {
    setStatusControls(!statusControls);
  };

  return (
    <>
      <ContainerMain
        id={`image_id${id}`}
        className="container"
        active={statusControls}
        onDoubleClick={handleMoveImage}
      >
        <ContainerImage className={`target${id}`}>
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
            frame.set("transform", "rotate", `${deg}deg`);
            setTransform(target);
          }}
          onScale={({ target, delta }) => {
            const scaleX = frame.get("transform", "scaleX") * delta[0];
            const scaleY = frame.get("transform", "scaleY") * delta[1];
            frame.set("transform", "scaleX", scaleX);
            frame.set("transform", "scaleY", scaleY);
            setTransform(target);
          }}
          onDrag={({ target, top, left }) => {
            frame.set("left", `${left}px`);
            frame.set("top", `${top}px`);
            setTransform(target);
          }}
          onResize={({ target, width, height }) => {
            frame.set("width", `${width}px`);
            frame.set("height", `${height}px`);
            setTransform(target);
          }}
        />
      </ContainerMain>
    </>
  );
};

export default ImageBase;
