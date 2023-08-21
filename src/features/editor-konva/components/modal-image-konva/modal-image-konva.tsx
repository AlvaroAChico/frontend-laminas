import React from "react";
import styled from "styled-components";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { CropperRef, Cropper } from "react-advanced-cropper";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  getUrlActiveImageEdit,
  getVisibilityModalImageEdit,
  updateNewImageActiveEdit,
  updateVisilibityImageEdit,
} from "../../../../core/store/konva-editor/konva-editorSlice";
import "react-advanced-cropper/dist/style.css";
import useLogger from "../../../../utils/hooks/use-logger";

const BackdropModal = styled.div<{ showModal: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  background: #00000047;
  z-index: 8;

  ${(p) => (p.showModal ? "display: block;" : "display:none;")}
`;
const WrapperModalKonva = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 80%;
  height: 80%;
  max-height: fit-content;
  margin: auto;
  background: white;
  z-index: 10;
  box-shadow: 4px 4px 4px 4px solid black;
  padding: 10px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: auto;

  > svg {
    z-index: 10;
    color: white;
    max-width: 20px;
    position: absolute;
    right: 12px;
    top: 12px;
  }
`;

const CropperContainer = styled(Cropper)`
  width: 100%;
`;

const ButtonApplyCropper = styled.button`
  gap: 5px;
  background-image: linear-gradient(to right, #fc4464, #fc4c3c, #fc4c2c);
  border: 2px solid #fff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 30px;
  box-shadow: 0px 4px 6px 5px #ff7f956b;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ModalImageKonva: React.FC = () => {
  const [refCropper, setRefCropper] = React.useState<CropperRef>();
  const currentImageId = useAppSelector(getUrlActiveImageEdit);
  const showModal = useAppSelector(getVisibilityModalImageEdit);
  const dispatch = useAppDispatch();

  const { Logger } = useLogger();

  const handleApplyCropper = () => () => {
    const canva = refCropper?.getCanvas();
    if (canva) {
      //   Logger(`New image -> ${canva.toDataURL()}`);
      dispatch(updateNewImageActiveEdit(canva.toDataURL()));
    }
    dispatch(updateVisilibityImageEdit());
  };

  const onChange = (cropper: CropperRef) => {
    // Logger(cropper.getCoordinates(), cropper.getCanvas());
    setRefCropper(cropper);
  };

  return (
    <BackdropModal showModal={showModal}>
      <WrapperModalKonva>
        <CloseOutline onClick={() => dispatch(updateVisilibityImageEdit())} />
        <CropperContainer
          src={currentImageId}
          onChange={onChange}
          className={"cropper"}
        />
        <ButtonApplyCropper onClick={handleApplyCropper()}>
          Aplicar
        </ButtonApplyCropper>
      </WrapperModalKonva>
    </BackdropModal>
  );
};

export default ModalImageKonva;
