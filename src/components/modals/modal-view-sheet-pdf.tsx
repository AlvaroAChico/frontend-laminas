/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Modal,
  Fade,
  Box,
  Backdrop,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  getValueBlobSheetPDF,
  getStatusValueBlobSheetPDF,
  updateStatusModalValueBlobPDF,
  updateLoadingApp,
} from "../../core/store/app-store/appSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { customPalette } from "../../config/theme/theme";
import styled from "styled-components";
import { Toaster } from "react-hot-toast";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";

const BoxStyle = styled(Box)`
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 64%;
  left: 50%;
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

const GridPDF = styled(Grid)`
  background: white;
  padding: 20px;
  border-radius: 20px;

  > embed {
    height: fit-content;
    min-height: 600px;
    padding: 0 0 30px 0;
    width: 100%;
  }
`;

const CloseOutlineStyle = styled(CloseOutline)`
  border-radius: 20px;
  position: absolute;
  cursor: pointer;
  background: red;
  color: white;
  width: 28px;
  right: 8px;
  top: 8px;
`;

const ModalViewSheetPDF: React.FC = () => {
  const [statusSnackbar, setStatusSnackbar] = React.useState(false);
  const valueBlobPDF = useAppSelector(getValueBlobSheetPDF);
  const isStatus = useAppSelector(getStatusValueBlobSheetPDF);
  const dispatch = useAppDispatch();

  dispatch(updateLoadingApp(false));

  return (
    <>
      <Toaster />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isStatus}
        onClose={() => dispatch(updateStatusModalValueBlobPDF(false))}
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
            <CloseOutlineStyle
              onClick={() => dispatch(updateStatusModalValueBlobPDF(false))}
            />
            <GridPDF item xs={12} justifyContent="center" alignItems="center">
              <embed
                type="application/pdf"
                width="400px"
                height="500px"
                src={`${valueBlobPDF}#view=FitH`}
              ></embed>
            </GridPDF>
          </BoxStyle>
        </Fade>
      </Modal>
      <Snackbar
        open={statusSnackbar}
        autoHideDuration={6000}
        onClose={() => setStatusSnackbar(false)}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={() => setStatusSnackbar(false)}
          elevation={6}
        >
          Hubo un error con la descarga del PDF, comunicate con el administrador
        </Alert>
      </Snackbar>
    </>
  );
};

export default ModalViewSheetPDF;
