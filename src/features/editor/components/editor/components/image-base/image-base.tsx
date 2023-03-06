/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components";
import "react-advanced-cropper/dist/style.css";
import { useAppDispatch } from "../../../../../../app/hooks";
import {
  deleteImage,
  showModalEditor,
  updateCurrentImage,
  updateImageCropper,
} from "../../../../../../core/store/editor/editorSlice";
import { Resize } from "@styled-icons/ionicons-sharp/Resize";
import { Cut } from "@styled-icons/boxicons-regular/Cut";
import { RoundedCorner } from "@styled-icons/material-outlined/RoundedCorner";
import { ArrowRotateLeft } from "@styled-icons/fa-solid/ArrowRotateLeft";
import { ChevronUp } from "@styled-icons/bootstrap/ChevronUp";
import { ChevronDown } from "@styled-icons/bootstrap/ChevronDown";

const ContainerImage = styled.div`
  position: absolute;
  width: 250px;
  height: auto;

  * {
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type="number"] {
      -moz-appearance: textfield;
    }
  }
`;
const WrapperTransforms = styled.div`
  position: relative;
`;

const WrapperRotate = styled.div<{ rotate: number }>`
  transform: rotate(${(p) => `${p.rotate}deg`});
`;

const ImageBaseContainer = styled.img<{ rounded: number }>`
  width: 100%;
  border-radius: ${(p) => `${p.rounded}px`};
`;

const WrapperOptions = styled.div`
  z-index: 9;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 5px;
  justify-content: center;
  align-items: center;
  bottom: -30px;
  padding-top: 10px;
`;

const ContainerOptions = styled.div`
  background: #fd6e67;
  width: auto;
  height: auto;
  border-radius: 20px;
  padding: 5px 10px;
  color: white;
  font-size: 10px;
  cursor: pointer;
  position: relative;

  > svg {
    width: 15px;
    height: 15px;
    color: white;
  }
`;
const ContainerMenu = styled.div`
  position: absolute;
  top: 25px;
  width: max-content;
  max-width: 130px;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-content: center;
  gap: 4px;
  height: fit-content;
  padding: 8px;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 10px 14px 5px #9f9f9f2e;
`;
const ContainerRedimensionarMenu = styled(ContainerMenu)``;
const ContainerRotarMenu = styled(ContainerMenu)``;
const ContainerRedondearMenu = styled(ContainerMenu)``;

const ContainerInputStyle = styled.input`
  outline: none;
  border: 0;
  padding: 8px;
  border: 0.5px solid #03a9f4;
  border-radius: 8px;
  max-width: 45px;
  width: 100%;
`;

const ButtonUpDownStyles = styled.button`
  border: 0;
  outline: 0;
  padding: 5px;
  border-radius: 8px;

  > svg {
    width: 15px;
  }
`;

const ButtonApplyStyle = styled.button`
  width: 100%;
  background: #9cbf69;
  border: none;
  border-radius: 10px;
  padding: 6px;
  color: white;
  cursor: pointer;
`;
export interface ImageBaseProps {
  id: number;
  image: string;
}

const ImageBase: React.FC<ImageBaseProps> = ({ id, image }) => {
  const [statusMenu, setStatusMenu] = React.useState(false);
  //Width and Height
  const [originalWidth, setOriginalWidth] = React.useState(0);
  const [originalHeight, setOriginalHeight] = React.useState(0);
  // Rotate
  const [rotate, setRotate] = React.useState(0);
  // Rounded
  const [rounded, setRounded] = React.useState(0);
  // Methods
  const handleShowStatusMenu = () => setStatusMenu(true);
  const handleHiddenStatusMenu = () => setStatusMenu(false);
  const dispatch = useAppDispatch();
  // Manejador de estados de Opciones de edicion de imagen
  const [statusRounded, setStatusRounded] = React.useState(false);
  const [statusResize, setStatusResize] = React.useState(false);
  const [statusRotate, setStatusRotate] = React.useState(false);

  const handleChangeStatusRounded = () => setStatusRounded(true);
  const handleHiddenStatusRounded = () => setStatusRounded(false);
  const handleChangeStatusRotate = () => setStatusRotate(true);
  const handleHiddenStatusRotate = () => setStatusRotate(false);
  const handleChangeStatusResize = () => setStatusResize(true);
  const handleHiddenStatusResize = () => setStatusResize(false);
  const handleSelectedAction = (action: number) => {
    handleHiddenStatusRounded();
    handleHiddenStatusRotate();
    handleHiddenStatusResize();
    if (action == 1) handleChangeStatusResize();
    if (action == 2) handleChangeStatusRotate();
    if (action == 3) handleChangeStatusRounded();
  };
  const imageId = document.getElementById(`image${id}`);
  let mousePosition;
  let offset = [0, 0];
  let isDown = false;
  const handleMouseDown = (event: any) => {
    isDown = true;
    offset = [
      imageId!.offsetLeft - event.clientX,
      imageId!.offsetTop - event.clientY,
    ];
  };
  const handleMouseUp = () => {
    isDown = false;
  };
  const handleMouseMove = (event: any) => {
    event.preventDefault();
    if (isDown) {
      mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      imageId!.style.left = mousePosition.x + offset[0] + "px";
      imageId!.style.top = mousePosition.y + offset[1] + "px";
    }
  };

  const handleEdit = () => () => {
    dispatch(updateCurrentImage(`image${id}_main`));
    dispatch(updateImageCropper(image));
    dispatch(showModalEditor());
  };

  const handleResize = () => {
    const elementImage: HTMLInputElement | any = document.getElementById(
      `image${id}_main`
    );
    if (originalWidth > 40 && originalHeight > 40) {
      elementImage!.style.height = `${originalHeight}px`;
      elementImage!.style.width = `${originalWidth}px`;
    } else {
      console.log("El valor no puede ser menor a 40");
    }
  };
  const handleRotate = () => {
    const elementImage: HTMLInputElement | any = document.getElementById(
      `image${id}_main`
    );
    if (rotate > 0) {
      elementImage!.style.transform = `rotate(${rotate}deg)`;
    } else {
      console.log("El valor no puede ser menor a 40");
    }
  };
  const handleRounded = () => {
    const elementImage: HTMLInputElement | any = document.getElementById(
      `image${id}_main`
    );
    if (rounded > 0) {
      elementImage!.style.borderRadius = `${rounded}px`;
    } else {
      console.log("El valor no puede ser menor a 40");
    }
  };
  const handleChangeWidth = (value: any) => {
    const newValue = value != "" || parseInt(value) > 0 ? parseInt(value) : 0;
    setOriginalWidth(newValue);
  };
  const handleChangeHeight = (value: any) => {
    const newValue = value != "" || parseInt(value) > 0 ? parseInt(value) : 0;
    setOriginalHeight(newValue);
  };
  const handleChangeRotate = (value: any) => {
    const newValue = value != "" || parseInt(value) > 0 ? parseInt(value) : 0;
    setRotate(newValue);
  };
  const handleChangeRounded = (value: any) => {
    const newValue = value != "" || parseInt(value) > 0 ? parseInt(value) : 0;
    setRounded(newValue);
  };
  const handleDeleteImage = () => {
    dispatch(deleteImage(id));
  };

  return (
    <ContainerImage
      id={`image${id}`}
      onMouseOver={handleShowStatusMenu}
      onMouseOut={handleHiddenStatusMenu}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <WrapperTransforms>
        <WrapperRotate rotate={rotate}>
          <ImageBaseContainer
            src={image}
            id={`image${id}_main`}
            rounded={rounded}
          />
        </WrapperRotate>
        {statusMenu && (
          <WrapperOptions onMouseOver={handleShowStatusMenu}>
            <ContainerOptions onClick={handleEdit()}>
              <Cut />
            </ContainerOptions>
            <ContainerOptions
              onClick={() => handleSelectedAction(1)}
              onMouseOver={handleShowStatusMenu}
            >
              <Resize />
              {statusResize && (
                <ContainerRedimensionarMenu
                  onMouseOver={() => {
                    handleShowStatusMenu();
                    handleChangeStatusResize();
                  }}
                  onMouseOut={handleHiddenStatusResize}
                >
                  <ContainerInputStyle
                    type="number"
                    value={originalWidth}
                    onChange={(e) => handleChangeWidth(e.target.value)}
                  />
                  <ContainerInputStyle
                    type="number"
                    value={originalHeight}
                    onChange={(e) => handleChangeHeight(e.target.value)}
                  />
                  <ButtonApplyStyle onClick={handleResize}>
                    Aplicar
                  </ButtonApplyStyle>
                </ContainerRedimensionarMenu>
              )}
            </ContainerOptions>
            <ContainerOptions onClick={() => handleSelectedAction(2)}>
              <ArrowRotateLeft />
              {statusRotate && (
                <ContainerRotarMenu
                  onMouseOver={() => {
                    handleShowStatusMenu();
                    handleChangeStatusRotate();
                  }}
                  onMouseOut={handleHiddenStatusRotate}
                >
                  <ContainerInputStyle
                    type="number"
                    value={rotate}
                    onChange={(e) => handleChangeRotate(e.target.value)}
                  />
                  <ButtonUpDownStyles
                    onClick={() => {
                      setRotate(rotate + 1);
                    }}
                  >
                    <ChevronUp />
                  </ButtonUpDownStyles>
                  <ButtonUpDownStyles
                    onClick={() => {
                      if (rotate > 0) {
                        setRotate(rotate - 1);
                      }
                    }}
                  >
                    <ChevronDown />
                  </ButtonUpDownStyles>
                  {/* <ButtonApplyStyle onClick={handleRotate}>
                  Aplicar
                </ButtonApplyStyle> */}
                </ContainerRotarMenu>
              )}
            </ContainerOptions>
            <ContainerOptions onClick={() => handleSelectedAction(3)}>
              <RoundedCorner />
              {statusRounded && (
                <ContainerRedondearMenu
                  onMouseOver={() => {
                    handleShowStatusMenu();
                    handleChangeStatusRounded();
                  }}
                  onMouseOut={handleHiddenStatusRounded}
                >
                  <ContainerInputStyle
                    type="number"
                    value={rounded}
                    onChange={(e) => handleChangeRounded(e.target.value)}
                  />
                  <ButtonUpDownStyles
                    onClick={() => {
                      setRounded(rounded + 1);
                    }}
                  >
                    <ChevronUp />
                  </ButtonUpDownStyles>
                  <ButtonUpDownStyles
                    onClick={() => {
                      if (rounded > 0) {
                        setRounded(rounded - 1);
                      }
                    }}
                  >
                    <ChevronDown />
                  </ButtonUpDownStyles>
                  {/* <ButtonApplyStyle onClick={handleRounded}>
                  Aplicar
                </ButtonApplyStyle> */}
                </ContainerRedondearMenu>
              )}
            </ContainerOptions>
            <ContainerOptions onClick={handleDeleteImage}>X</ContainerOptions>
          </WrapperOptions>
        )}
      </WrapperTransforms>
    </ContainerImage>
  );
};

export default ImageBase;
