/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal, Fade, Box, Backdrop, Grid } from "@mui/material";
import {
  updateLoadingApp,
  getStatusModalTutorial,
  updateStatusModalTutorial,
  getCurrentTutorialURI,
} from "../../core/store/app-store/appSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import styled from "styled-components";
import { Toaster } from "react-hot-toast";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import ReactPlayer from "react-player";

const BoxStyle = styled(Box)`
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  transform: translate(-50%, -50%);
  position: absolute;
  right: -50%;
  bottom: -50%;
  top: 50%;
  left: 50%;
  margin: auto;
  width: fit-content;
  min-width: 300px;
  max-width: 600px;
  height: fit-content;
  width: 100%;
  max-height: 95vh;
  outline: none;
  background: white;
  border-radius: 20px;
  overflow: hidden;
`;

const GridTutorial = styled(Grid)`
  background: white;
  padding: 20px;
  border-radius: 20px;
  box-sizing: border-box;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  position: relative;

  > div div iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;

const CustomReactPlayer = styled(ReactPlayer)`
  border-radius: 20px;
  width: inherit;
`;

const CloseWrapper = styled.div`
  position: absolute;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  padding: 3px;
  right: 8px;
  top: 8px;

  > svg {
    width: 100%;
    max-width: 22px;
    height: 100%;
    max-height: 22px;
  }
`;

const ModalViewTutorial: React.FC = () => {
  const isStatus = useAppSelector(getStatusModalTutorial);
  const currentTutorial = useAppSelector(getCurrentTutorialURI);
  const dispatch = useAppDispatch();

  dispatch(updateLoadingApp(false));

  return (
    <>
      <Toaster />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isStatus}
        onClose={() => dispatch(updateStatusModalTutorial(false))}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{
          width: "90%",
          height: "fit-content",
          minWidth: "300px",
          minHeight: "500px",
          maxWidth: "800px",
        }}
      >
        <Fade in={isStatus}>
          <BoxStyle>
            <GridTutorial
              item
              xs={12}
              justifyContent="center"
              alignItems="center"
            >
              <CustomReactPlayer url={currentTutorial} />
              <CloseWrapper>
                <CloseOutline
                  onClick={() => dispatch(updateStatusModalTutorial(false))}
                />
              </CloseWrapper>
            </GridTutorial>
          </BoxStyle>
        </Fade>
      </Modal>
    </>
  );
};

export default ModalViewTutorial;
