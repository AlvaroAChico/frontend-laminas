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
  getStatusAuthenticated,
  getUserHavePlan,
  updateCurrentPlan,
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
import { breakpoints } from "../../constants/breakpoints";
import { customPalette } from "../../config/theme/theme";
import axios from "axios";
import { IAuthData } from "../../core/store/auth/types/auth-types";
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";

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

  > div {
    width: 30%;

    ${breakpoints.tabletS} {
      width: 48%;
    }
    ${breakpoints.phoneL} {
      width: 100%;
    }
  }
  ${breakpoints.tabletS} {
    justify-content: space-around;
  }
  ${breakpoints.phoneL} {
    justify-content: space-between;
  }
`;

const ItemFormatDownload = styled.div<{ selected: boolean }>`
  border: 1px solid ${(p) => (p.selected ? "#55B65E" : "transparent")};
  box-shadow: 0px 4px 10px 2px rgba(155, 155, 155, 0.25);
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  row-gap: 10px;
  background: #fff;
  display: flex;
  padding: 5px 8px;
  width: 100%;
  cursor: pointer;
  text-align: center;
  column-gap: 10px;

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
    background: #ff999333;
    border-radius: 10px;
    color: black;
  }
  > table thead tr td {
    border-radius: 10px;
    text-align: center;
    padding: 10px;
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
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  border-radius: 20px;
  max-width: 600px;
  padding: 20px;
  margin: auto;

  > img {
    width: 100%;
  }
`;
const ContainerTDTotal = styled.td`
  font-weight: 600;
  text-transform: uppercase;
`;

const ContainerSuccess = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 5px;
`;

const ContainerTitle = styled.div`
  display: grid;
  place-items: center;
  margin-bottom: 20px;
`;

const ItemTrx = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  > p {
    width: fit-content;

    ${breakpoints.phoneL} {
      width: 100%;
    }
  }
  > p:nth-child(1) {
    color: #0066ff;
  }
`;

const ModalPayment: React.FC = () => {
  const [statusSnackbar, setStatusSnackbar] = React.useState(false);
  const [txkNiubiz, setTxkNiubiz] = React.useState("");
  const [isLoadingFreePlan, setIsLoadingFreePlan] =
    React.useState<boolean>(false);
  const [paymentError, setPaymentError] = React.useState<IAuthorizationError>();
  const isAuthenticated = useAppSelector(getStatusAuthenticated);
  const userHavePlan = useAppSelector(getUserHavePlan);
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
    if (!userHavePlan && isAuthenticated && valuePlanPay == 0) {
      setIsLoadingFreePlan(true);
      const dataUser = Cookies.get(APP_CONSTANS.AUTH_USER_DATA);
      if (dataUser != null && dataUser != undefined) {
        const user = JSON.parse(dataUser) as IAuthData;
        axios({
          url: `${settingsAPP.api.user}/users/plan-free`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            ContentType: "application/json",
            Accept: "application/json",
          },
        })
          .then((result: any) => {
            setIsLoadingFreePlan(false);
            toast.success(result.data.message);
            dispatch(updateCurrentPlan(true));
            dispatch(updateStatusModalPayment(false));
          })
          .catch((err) => {
            setIsLoadingFreePlan(false);
            toast.error(
              err.response.data.message != null
                ? err.response.data.message
                : "Ha ocurrido un error. Por favor contacta con el administrador"
            );
          });
      }
      return true;
    }
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
    const txkConstans = queryParams?.split("?")[1]?.split("=")[0];
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
      <Toaster />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isStatus}
        onClose={() => {
          if (userHavePlan) {
            const buttonClearStyles = document.getElementById(
              "button-clear-niubiz"
            );
            if (buttonClearStyles) {
              buttonClearStyles.click();
              dispatch(updateStatusModalPayment(false));
            }
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
            <Box
              sx={{ width: "80vw", height: "fit-content", maxWidth: "800px" }}
            >
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
                  {userHavePlan && isAuthenticated && valuePlanPay == 0 && (
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
                      isLoadingFreePlan ||
                      resultAccessToken.isLoading ||
                      resultSessionToken.isLoading
                    }
                    customStyle={`
                      width: "fit-content";
                      ${
                        userHavePlan &&
                        isAuthenticated &&
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
                    {paymentError == null && !resultAuthorization.isLoading && (
                      <ContainerSuccess>
                        <ContainerTitle>
                          <Typography
                            variant="h5"
                            component="h5"
                            fontWeight={600}
                            color={"#55B65E"}
                          >
                            ¡ Felicidades !
                          </Typography>
                          <Typography
                            variant="body2"
                            component="h6"
                            color={"#55B65E"}
                          >
                            Tu transacción fue procesada con éxito
                          </Typography>
                        </ContainerTitle>
                        <ItemTrx>
                          <Typography variant="body2" component="p">
                            Código de transacción:
                          </Typography>
                          <Typography variant="body2" component="p">
                            {resultAuthorization.data?.fulfillment}
                          </Typography>
                        </ItemTrx>
                        {resultAuthorization.data?.yapeId != null &&
                          resultAuthorization.data?.yapeId != "" && (
                            <ItemTrx>
                              <Typography variant="body2" component="p">
                                ID Transacción Yape:
                              </Typography>
                              <Typography variant="body2" component="p">
                                {resultAuthorization.data?.yapeId}
                              </Typography>
                            </ItemTrx>
                          )}
                        <ItemTrx>
                          <Typography variant="body2" component="p">
                            Número de Orden:
                          </Typography>
                          <Typography variant="body2" component="p">
                            {resultAuthorization.data?.purchaseNumber}
                          </Typography>
                        </ItemTrx>
                        <ItemTrx>
                          <Typography variant="body2" component="p">
                            Tarjeta:
                          </Typography>
                          <Typography variant="body2" component="p">
                            {resultAuthorization.data?.card}
                          </Typography>
                        </ItemTrx>
                        <ItemTrx>
                          <Typography variant="body2" component="p">
                            Marca:
                          </Typography>
                          <Typography variant="body2" component="p">
                            {resultAuthorization.data?.brand}
                          </Typography>
                        </ItemTrx>
                        <ItemTrx>
                          <Typography variant="body2" component="p">
                            Monto:
                          </Typography>
                          <Typography variant="body2" component="p">
                            {resultAuthorization.data?.amount}
                          </Typography>
                        </ItemTrx>
                      </ContainerSuccess>
                    )}
                    {paymentError != null && !resultAuthorization.isLoading && (
                      <ContainerSuccess>
                        <ContainerTitle>
                          <Typography
                            variant="h5"
                            component="h5"
                            fontWeight={600}
                            color={"#ed6e6e"}
                          >
                            ¡ Lo Sentimos !
                          </Typography>
                          <Typography
                            variant="body2"
                            component="h6"
                            color={"#ed6e6e"}
                          >
                            La transacción no pudo ser procesada. Por favor
                            contacta con tu administrador
                          </Typography>
                        </ContainerTitle>
                        <ItemTrx>
                          <Typography variant="body2" component="p">
                            ID Transacción:
                          </Typography>
                          <Typography variant="body2" component="p">
                            {paymentError?.transactionUUID || ""}
                          </Typography>
                        </ItemTrx>
                        <ItemTrx>
                          <Typography variant="body2" component="p">
                            Monto:
                          </Typography>
                          <Typography variant="body2" component="p">
                            {paymentError?.amount || ""}
                          </Typography>
                        </ItemTrx>
                        <ItemTrx>
                          <Typography variant="body2" component="p">
                            Tarjeta:
                          </Typography>
                          <Typography variant="body2" component="p">
                            {paymentError?.card || ""}
                          </Typography>
                        </ItemTrx>
                        <ItemTrx>
                          <Typography variant="body2" component="p">
                            Marca:
                          </Typography>
                          <Typography variant="body2" component="p">
                            {paymentError?.brand || ""}
                          </Typography>
                        </ItemTrx>
                      </ContainerSuccess>
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
