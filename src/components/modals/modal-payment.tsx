import React from "react";
import {
  Modal,
  Fade,
  Box,
  Backdrop,
  Snackbar,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import {
  getStatusModalPayment,
  getStatusStepPayment,
  getValuePlanPay,
  updateStatusModalPayment,
  updateStatusStepPayment,
  updateValuePlanPay,
} from "../../core/store/app-store/appSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { CheckCircle } from "@styled-icons/bootstrap/CheckCircle";
import styled from "styled-components";
import CustomButtom from "../custom-button/custom-button";
import BodyPlan from "../plans/body-plan/body-plan";
import VisaMastercard from "../../assets/img/visa_mastercard.png";
import YapePlin from "../../assets/img/yape_plin.png";
import {
  useGetAccessTokenMutation,
  useGetAuthorizationPaymentMutation,
  useGetSessionTokenMutation,
} from "../../core/store/plans/plansAPI";
import { APP_CONSTANS } from "../../constants/app";
import useLogger from "../../utils/hooks/use-logger";
import { settingsAPP } from "../../config/environments/settings";
import { IAuthorizationError } from "../../core/store/plans/types/plans-types";
import NiubizPaymentIMG from "../../assets/img/niubiz_payment.png";
import PaymentSkeleton from "./skeletons/payment-skeleton";

const BoxStyle = styled(Box)`
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  width: fit-content;
  padding: 20px 25px;
  outline: none;
  background: white;
  border-radius: 20px;
`;

const ContainerSelectedPlan = styled.div`
  padding: 20px;
`;
const ContainerDetailOrder = styled.div`
  padding: 15px;
`;
const ContainerFinishPay = styled.div`
  padding: 15px;
`;

const ContainerFormats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const ItemFormatDownload = styled.div<{ selected: boolean }>`
  border: 1px solid ${(p) => (p.selected ? "#55B65E" : "transparent")};
  box-shadow: 0px 4px 10px 2px rgba(155, 155, 155, 0.25);
  justify-content: space-betwen;
  border-radius: 10px;
  align-items: center;
  row-gap: 10px;
  background: #fff;
  display: flex;
  padding: 5px 8px;
  width: fit-content;
  cursor: pointer;

  > div svg {
    width: ${(p) => (p.selected ? "16px" : "0px")};
    color: ${(p) => (p.selected ? "#55B65E" : "white")};
  }
`;

const BodyDetailPlan = styled.div`
  padding: 20px;
  border-radius: 20px;
  margin: 15px 0px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;

  > table {
    width: 100%;
  }
  > table thead tr {
    background: #fc4a41;
    border-radius: 20px;
    color: white;
  }
  > table thead tr td {
    text-align: center;
    border-bottom: 1px solid #fc4a41;
    padding: 10px;
    border-radius: 20px;
  }
  > table tbody tr td {
    text-align: center;
    border-bottom: 1px solid #b6b6b6;
    padding: 18px;
  }
  > table tbody tr td:nth-child(1) {
    text-align: left;
  }
`;
const WrapperButtonsDetail = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;
const ContainerAddNiubiz = styled.div`
  padding: 20px;
  border-radius: 20px;
  margin: 15px 0px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;

  > img {
    width: 100%;
  }
`;
const ContainerTDTotal = styled.td`
  font-weight: 600;
  text-transform: uppercase;
`;

const ModalPayment: React.FC = () => {
  const [statusSnackbar, setStatusSnackbar] = React.useState(false);
  const [txkNiubiz, setTxkNiubiz] = React.useState("");
  const [paymentError, setPaymentError] = React.useState<IAuthorizationError>();
  const isStatus = useAppSelector(getStatusModalPayment);
  const queryParams = window.location.search;
  const steps = ["Plan", "Detalle", "Finalizar"];
  const dispatch = useAppDispatch();
  const statusStepPay = useAppSelector(getStatusStepPayment);
  const valuePlanPay = useAppSelector(getValuePlanPay);

  const { Logger } = useLogger();

  const handleChangeStep = (step: number) =>
    dispatch(updateStatusStepPayment(step));

  const handleOpenNiubiz = () => {
    localStorage.setItem(
      APP_CONSTANS.SESSION_TOKEN_NIUBIZ,
      resultSessionToken.data!.sessionKey || ""
    );
    localStorage.setItem(
      APP_CONSTANS.PURCHASE_NUMBER_NIUBIZ,
      resultSessionToken.data!.purchaseNumber || ""
    );
    localStorage.setItem(
      APP_CONSTANS.AMOUNT_NIUBIZ,
      `${resultSessionToken.data!.amount}` || ""
    );
    localStorage.setItem(
      APP_CONSTANS.ACTION_PAGE_NIUBIZ,
      `${settingsAPP.api.plans}/niubiz/response`
    );

    const buttonNiubiz = document.getElementById("button-niubiz");
    if (buttonNiubiz) {
      buttonNiubiz.click();
    }
  };

  const [getAccessToken, resultAccessToken] = useGetAccessTokenMutation();
  const [getSessionToken, resultSessionToken] = useGetSessionTokenMutation();
  const [getAuthorizationPayment, resultAuthorization] =
    useGetAuthorizationPaymentMutation();

  const handleNextStepPay = () => {
    if (valuePlanPay != 0) {
      getAccessToken("");
    }
  };

  React.useEffect(() => {
    if (resultAccessToken && resultAccessToken.isSuccess) {
      localStorage.setItem(
        APP_CONSTANS.ACCESS_TOKEN_NIUBIZ,
        resultAccessToken.data.accessToken
      );
      getSessionToken({
        accessToken: resultAccessToken.data.accessToken,
        planId: `${valuePlanPay + 1}`,
      });
    }
  }, [resultAccessToken]);

  React.useEffect(() => {
    if (resultSessionToken && resultSessionToken.isSuccess) {
      localStorage.setItem(
        APP_CONSTANS.PURCHASE_NUMBER_NIUBIZ,
        resultSessionToken.data!.purchaseNumber
      );
      handleChangeStep(1);
    }
  }, [resultSessionToken]);

  React.useEffect(() => {
    const txkConstans = queryParams.split("&")[0].split("=")[0];
    const txk = queryParams.split("&")[0].split("=")[1];
    if (!!txk && txk != null && txk != "" && txkConstans == "txk") {
      window.history.pushState({}, document.title, "/planes");
      setTxkNiubiz(txk);
      dispatch(updateStatusModalPayment(true));
      dispatch(updateStatusStepPayment(2));
      getAuthorizationPayment({
        accessToken:
          localStorage.getItem(APP_CONSTANS.ACCESS_TOKEN_NIUBIZ) || "",
        purchaseNumber:
          localStorage.getItem(APP_CONSTANS.PURCHASE_NUMBER_NIUBIZ) || "",
        transactionToken: txk,
      })
        .unwrap()
        .catch((error) => setPaymentError(error.data as IAuthorizationError));
    }
  }, []);

  React.useEffect(() => {
    if (txkNiubiz) {
      Logger("TrxTk Niubiz", txkNiubiz);
    }
  }, [txkNiubiz]);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isStatus}
        onClose={() => {
          const buttonClearStyles = document.getElementById(
            "button-clear-niubiz"
          );
          if (buttonClearStyles) {
            buttonClearStyles.click();
            dispatch(updateStatusModalPayment(false));
          }
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isStatus}>
          <BoxStyle>
            <Box sx={{ width: "80vw", minHeight: "60vh" }}>
              <Stepper activeStep={statusStepPay} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {statusStepPay == 0 && (
                <ContainerSelectedPlan>
                  <ContainerFormats>
                    <div>
                      <ItemFormatDownload
                        selected={valuePlanPay == 0}
                        onClick={() => dispatch(updateValuePlanPay(0))}
                      >
                        <div>
                          <Typography
                            component="h6"
                            variant="h6"
                            color={"black"}
                            fontWeight={600}
                            fontSize={"16px"}
                          >
                            Básico
                          </Typography>
                          <Typography
                            component="h6"
                            variant="subtitle1"
                            color={"#0066FF"}
                            fontWeight={600}
                          >
                            Gratuito
                          </Typography>
                        </div>
                        <div>
                          <CheckCircle />
                        </div>
                      </ItemFormatDownload>
                    </div>
                    <div>
                      <ItemFormatDownload
                        selected={valuePlanPay == 1}
                        onClick={() => dispatch(updateValuePlanPay(1))}
                      >
                        <div>
                          <Typography
                            component="h6"
                            variant="h6"
                            color={"black"}
                            fontWeight={600}
                            fontSize={"16px"}
                          >
                            Intermedio
                          </Typography>
                          <Typography
                            component="h6"
                            variant="subtitle1"
                            color={"#55B65E"}
                            fontWeight={600}
                          >
                            s/ 19.90
                          </Typography>
                        </div>
                        <div>
                          <CheckCircle />
                        </div>
                      </ItemFormatDownload>
                    </div>
                    <div>
                      <ItemFormatDownload
                        selected={valuePlanPay == 2}
                        onClick={() => dispatch(updateValuePlanPay(2))}
                      >
                        <div>
                          <Typography
                            component="h6"
                            variant="h6"
                            color={"black"}
                            fontWeight={600}
                            fontSize={"16px"}
                          >
                            Premium
                          </Typography>
                          <Typography
                            component="h6"
                            variant="subtitle1"
                            color={"#BF953F"}
                            fontWeight={600}
                          >
                            s/ 29.90
                          </Typography>
                        </div>
                        <div>
                          <CheckCircle />
                        </div>
                      </ItemFormatDownload>
                    </div>
                  </ContainerFormats>
                  {valuePlanPay == 0 && (
                    <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
                      <BodyPlan
                        bodyInfo={"BASIC"}
                        price={"Gratuito"}
                        editor={"Acceso Parcial al editor"}
                        text={"Acceso a fuentes gratuitas de texto"}
                        images={"Sube imagenes solo en JPG"}
                        arturito={"Consulta con Arturito hasta 10 veces"}
                        formats={"Descargas en A4 con marca de agua"}
                        downloads={"5 Descargas / mes"}
                        support={"Sin soporte"}
                        onlyText={true}
                      />
                    </Box>
                  )}
                  {valuePlanPay == 1 && (
                    <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
                      <BodyPlan
                        bodyInfo={"MEDIUM"}
                        price={"19.90"}
                        editor={"Acceso parcial al Editor"}
                        text={"Acceso a fuentes basicas de texto"}
                        images={"Sube imagenes en JPG y PNG"}
                        arturito={"Consulta con Arturito hasta 30 veces"}
                        formats={"Descargas en A4, A3 y Oficio"}
                        downloads={"50 Descargas"}
                        support={"Soporte comercial"}
                        onlyText={true}
                      />
                    </Box>
                  )}
                  {valuePlanPay == 2 && (
                    <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
                      <BodyPlan
                        bodyInfo={"PREMIUM"}
                        price={"19.90"}
                        editor={"Acceso completo al Editor"}
                        text={"Acceso a fuentes premium de texto"}
                        images={"Sube imagenes en JPG, PNG y JPEG"}
                        arturito={"Consultas ilimitadas a Arturito"}
                        formats={"Descargas en A4, A3 y Oficio"}
                        downloads={"100 Descargas"}
                        support={"Soporte 24/7"}
                        onlyText={true}
                      />
                    </Box>
                  )}
                  {valuePlanPay == 0 && (
                    <Typography
                      component="p"
                      variant="caption"
                      textAlign={"center"}
                      fontSize={"10px"}
                    >
                      Este plan no se encuentra disponible, ya se te fue
                      asignado al registrarte
                    </Typography>
                  )}
                  <CustomButtom
                    title="Continuar"
                    style="SECONDARY"
                    borderStyle="NONE"
                    action={handleNextStepPay}
                    isLoading={
                      resultAccessToken.isLoading ||
                      resultSessionToken.isLoading
                    }
                    customStyle={`
                      width: "fit-content";
                      ${
                        valuePlanPay == 0 &&
                        `
                        background: gray;
                        border: 1px solid gray;
                        cursor: not-allowed;
                      `
                      }
                    `}
                  />
                </ContainerSelectedPlan>
              )}

              {statusStepPay == 1 && (
                <ContainerDetailOrder>
                  <BodyDetailPlan>
                    <table>
                      <thead>
                        <tr>
                          <td>Concepto</td>
                          <td>Cantidad</td>
                          <td>Monto</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            Plan {valuePlanPay == 1 ? "Medium" : "Premium"}
                          </td>
                          <td>1</td>
                          <td>s/ {valuePlanPay == 1 ? "19.90" : "29.90"}</td>
                        </tr>
                        <tr>
                          <ContainerTDTotal colSpan={2}>Total</ContainerTDTotal>
                          <td>s/ {valuePlanPay == 1 ? "19.90" : "29.90"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </BodyDetailPlan>
                  <ContainerAddNiubiz>
                    <img src={NiubizPaymentIMG} />
                  </ContainerAddNiubiz>
                  <WrapperButtonsDetail>
                    <CustomButtom
                      title="Atrás"
                      style="SECONDARY"
                      borderStyle="NONE"
                      action={() => handleChangeStep(0)}
                      customStyle={`width: "fit-content"`}
                    />
                    <CustomButtom
                      title="Pagar"
                      style="SECONDARY"
                      borderStyle="NONE"
                      action={handleOpenNiubiz}
                      customStyle={`width: "fit-content"`}
                    />
                  </WrapperButtonsDetail>
                </ContainerDetailOrder>
              )}
              {statusStepPay == 2 && (
                <ContainerFinishPay>
                  <div>
                    {resultAuthorization.isLoading && <PaymentSkeleton />}
                    {paymentError == null && !resultAuthorization.isLoading ? (
                      <>
                        <div>
                          <Typography variant="body2" component="p">
                            Código de transacción:
                            {resultAuthorization.data?.fulfillment}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="body2" component="p">
                            ID de Transacción:
                            {resultAuthorization.data?.transactionUUID}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="body2" component="p">
                            ID Token:
                            {resultAuthorization.data?.tokenId}
                          </Typography>
                        </div>
                        {resultAuthorization.data?.yapeId != null &&
                          resultAuthorization.data?.yapeId != "" && (
                            <div>
                              <Typography variant="body2" component="p">
                                ID Transacción Yape:
                                {resultAuthorization.data?.yapeId}
                              </Typography>
                            </div>
                          )}
                        <div>
                          <Typography variant="body2" component="p">
                            Número de Orden:
                            {resultAuthorization.data?.purchaseNumber}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="body2" component="p">
                            Tarjeta:
                            {resultAuthorization.data?.card}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="body2" component="p">
                            Marca:
                            {resultAuthorization.data?.brand}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="body2" component="p">
                            Monto:
                            {resultAuthorization.data?.amount}
                          </Typography>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <Typography variant="body2" component="p">
                            ID Transacción:
                            {paymentError?.transactionUUID || ""}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="body2" component="p">
                            Monto:
                            {paymentError?.amount || ""}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="body2" component="p">
                            Tarjeta:
                            {paymentError?.card || ""}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="body2" component="p">
                            Marca:
                            {paymentError?.brand || ""}
                          </Typography>
                        </div>
                      </>
                    )}
                  </div>
                </ContainerFinishPay>
              )}
            </Box>
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
          Al parecer hubo un error con el pago, por favor contacta a un asesor
        </Alert>
      </Snackbar>
    </>
  );
};

export default ModalPayment;
