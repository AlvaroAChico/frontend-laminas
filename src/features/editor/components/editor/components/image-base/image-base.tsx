import React from "react";
import styled from "styled-components";
import { Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { CropperRef } from "react-advanced-cropper/dist/components/croppers/Cropper";
import { useAppDispatch } from "../../../../../../app/hooks";
import {
  showModalEditor,
  updateCurrentImage,
  updateImageCropper,
} from "../../../../../../core/store/editor/editorSlice";

const ContainerImage = styled.div`
  position: absolute;
  width: 100%;
  max-width: 200px;
  height: auto;
`;

const ImageBaseContainer = styled.img`
  width: 100%;
`;

const ContainerOptions = styled.div`
  position: absolute;
  background: red;
  z-index: 9;
  width: auto;
  height: auto;
  border-radius: 20px;
  padding: 5px 10px;
  color: white;
  font-size: 10px;
  cursor: pointer;
`;

export interface ImageBaseProps {
  id: number;
  image: string;
}
const ImageBase: React.FC<ImageBaseProps> = ({ id, image }) => {
  const [statusMenu, setStatusMenu] = React.useState(false);
  const handleStatusMenu = () => setStatusMenu(!statusMenu);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const imageId = document.getElementById(`image${id}`);
    let mousePosition;
    let offset = [0, 0];
    let isDown = false;

    imageId!.addEventListener(
      "mousedown",
      function (e) {
        isDown = true;
        offset = [
          imageId!.offsetLeft - e.clientX,
          imageId!.offsetTop - e.clientY,
        ];
      },
      true
    );

    imageId!.addEventListener(
      "mouseup",
      function () {
        isDown = false;
      },
      true
    );

    imageId!.addEventListener(
      "mousemove",
      function (event) {
        event.preventDefault();
        if (isDown) {
          mousePosition = {
            x: event.clientX,
            y: event.clientY,
          };
          imageId!.style.left = mousePosition.x + offset[0] + "px";
          imageId!.style.top = mousePosition.y + offset[1] + "px";
        }
      },
      true
    );
  });

  const handleEdit = () => () => {
    dispatch(updateCurrentImage(`image${id}_main`));
    dispatch(updateImageCropper(image));
    dispatch(showModalEditor());
  };
  return (
    <ContainerImage id={`image${id}`} onClick={handleStatusMenu}>
      <ImageBaseContainer src={image} id={`image${id}_main`} />
      {statusMenu && (
        <ContainerOptions onClick={handleEdit()}>Editar</ContainerOptions>
      )}
    </ContainerImage>
  );
};

export default ImageBase;
