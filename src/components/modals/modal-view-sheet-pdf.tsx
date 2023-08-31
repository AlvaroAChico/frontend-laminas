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

const BoxStyle = styled(Box)`
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  width: fit-content;
  min-width: 300px;
  height: 100%;
  outline: none;
  background: white;
  border-radius: 20px;
  overflow: hidden;

  > div:nth-child(1) {
    background: ${customPalette.secondaryColor};
    width: 3px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 20px;
    height: 100%;
  }
`;

const ModalViewSheetPDF: React.FC = () => {
  const [statusSnackbar, setStatusSnackbar] = React.useState(false);
  const valueBlobPDF = useAppSelector(getValueBlobSheetPDF);
  const isStatus = useAppSelector(getStatusValueBlobSheetPDF);
  const dispatch = useAppDispatch();

  // React.useEffect(() => {
  //   dispatch(updateLoadingApp(false));
  // }, []);
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
        }}
      >
        <Fade in={isStatus}>
          <BoxStyle>
            <Grid item xs={12} justifyContent="center" alignItems="center">
              <embed
                type="application/pdf"
                width="400px"
                height="500px"
                src={`${valueBlobPDF}#view=FitH`}
              ></embed>
            </Grid>
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
