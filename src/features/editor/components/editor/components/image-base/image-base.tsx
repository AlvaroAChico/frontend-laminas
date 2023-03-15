/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components";
import Moveable from "react-moveable";
import { Frame } from "scenejs";
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import {
  deleteImage,
  getActiveImage,
  getGeneralStatusControl,
  showModalEditor,
  updateCurrentImage,
  updateImageActive,
  updateImageCropper,
} from "../../../../../../core/store/editor/editorSlice";
import { Cut } from "@styled-icons/boxicons-regular/Cut";

import { Square } from "@styled-icons/bootstrap/Square";
import { SquareRounded } from "@styled-icons/boxicons-solid/SquareRounded";

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
  cursor: pointer;
`;

const ContainerOptions = styled.div`
  position: absolute;
  bottom: -28px;
  left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 5px;
`;

const ItemOption = styled.div`
  background: #fc4c2f;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 4px;

  > svg {
    width: 15px;
    height: 15px;
    color: white;
  }

  :hover > span {
    visibility: visible;
    opacity: 1;
  }
`;
const ImageMain = styled.img<{ border: number }>`
  border-radius: ${(p) => `${p.border}px`};
`;
const ContainerTooltiptext = styled.span`
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 110%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;

  :after {
    content: "";
    position: absolute;
    top: -40%;
    left: 50%;
    margin-left: -5px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #555 transparent;
  }
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
  const [borderValue, setBorderValue] = React.useState(0);
  const imageId = document.getElementById(`image${id}_main`);
  const [widthValue, setWidthValue] = React.useState(250);
  const [heightValue, setHeightValue] = React.useState(imageId?.clientHeight);
  const dispatch: any = useAppDispatch();
  const statusGeneralControl = useAppSelector(getGeneralStatusControl);
  const imageActiveControls = useAppSelector(getActiveImage);
  const handleDeleteImage = () => dispatch(deleteImage(id));

  const handleChangeActive = () => {
    dispatch(updateImageActive(id));
    setStatusControls(!statusControls);
  };

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

  React.useEffect(() => {
    setStatusControls(imageActiveControls == id);
  }, [imageActiveControls]);

  const setTransform = (target: any) => {
    target.style.cssText = frame.toCSS();
  };

  const handleCutOption = () => {
    dispatch(updateCurrentImage(`image_mainID${id}`));
    dispatch(updateImageCropper(image));
    dispatch(showModalEditor());
  };

  const handleSquareOption = () => {
    setTimeout(() => {
      setStatusControls(true);
      setBorderValue(borderValue > 0 ? borderValue - 1 : 0);
    }, 10);
  };
  const handleRoundedOption = () => {
    setTimeout(() => {
      setStatusControls(true);
      setBorderValue(borderValue + 1);
    }, 10);
  };

  return (
    <>
      <ContainerMain
        id={`image_id${id}`}
        className="container"
        active={statusControls && statusGeneralControl}
        onClick={handleChangeActive}
      >
        <ContainerImage id={`image${id}_main`} className={`target${id}`}>
          {statusControls &&
            statusGeneralControl &&
            imageActiveControls == id && (
              <ContainerDelete onClick={handleDeleteImage}>x</ContainerDelete>
            )}
          <ImageMain
            id={`image_mainID${id}`}
            src={image}
            border={borderValue}
          />
          {statusControls &&
            statusGeneralControl &&
            imageActiveControls == id && (
              <ContainerOptions>
                <ItemOption onClick={handleCutOption}>
                  <Cut />
                  <ContainerTooltiptext>Cortar</ContainerTooltiptext>
                </ItemOption>
                <ItemOption onClick={handleSquareOption}>
                  <Square />
                  <ContainerTooltiptext>
                    Reducir Redondeado
                  </ContainerTooltiptext>
                </ItemOption>
                <ItemOption onClickCapture={handleRoundedOption}>
                  <SquareRounded />
                  <ContainerTooltiptext>
                    Aumentar Redondeado
                  </ContainerTooltiptext>
                </ItemOption>
              </ContainerOptions>
            )}
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
