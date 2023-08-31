import * as React from "react";
import {
  Typography,
  Modal,
  Fade,
  Box,
  Backdrop,
  Grid,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  getStatusModalRegister,
  updateStatusModalRegister,
  updateStatusModalLogin,
  updateLoadingApp,
} from "../../core/store/app-store/appSlice";
import CustomButton from "../../components/custom-button/custom-button";
import { RightArrowAlt } from "@styled-icons/boxicons-regular/RightArrowAlt";
import { SignupForm, SignupSchema } from "../../core/models/register-model";
import {
  useStartLoginSocialMutation,
  useStartRegisterByEmailMutation,
  useStartSocialCallbackMutation,
} from "../../core/store/auth/authAPI";
import { useForm } from "react-hook-form";
import { settingsAPP } from "../../config/environments/settings";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Facebook, Google } from "styled-icons/bootstrap";
import { customPalette } from "../../config/theme/theme";
import { yupResolver } from "@hookform/resolvers/yup";
import RuleImg from "../../assets/img/rule_icon.png";
import BookImg from "../../assets/img/book_icon.png";
import LogoImg from "../../assets/img/logo.svg";
import ReCAPTCHA from "react-google-recaptcha";
import styled from "styled-components";
import Cookies from "js-cookie";
import { APP_CONSTANS } from "../../constants/app";
import useDataUser from "../../utils/hooks/use-data-user";
import CustomLoader from "../custom-loader/custom-loader";
import { SerializedError } from "@reduxjs/toolkit";
import {
  ETemporalActions,
  updateTemporalAction,
} from "../../core/store/temporal/temporalSlice";

const BoxStyle = styled(Box)`
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 20px 25px;
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
const GridCaptcha = styled(Grid)`
  > div div div:nth-child(1) {
    margin: auto;
  }
`;

const WrapperBookImg = styled.img`
  position: absolute;
  bottom: 10px;
  left: -60px;
  width: 150px;
  opacity: 0.2;
`;
const WrapperRuleImg = styled.img`
  position: absolute;
  top: 0;
  right: -80px;
  width: 200px;
  opacity: 0.2;
`;

const ButtonSocialRegister = styled(Grid)`
  color: white;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;

  > svg {
    width: 100%;
    max-width: 20px;
  }
`;
const ButtonGoogle = styled(ButtonSocialRegister)`
  background: ${customPalette.secondaryColor};
`;
const ButtonFacebook = styled(ButtonSocialRegister)`
  background: #0066ff;
`;

const FormContainer = styled.div`
  > div:nth-child(1),
    div:nth-child(2),
    div:nth-child(3) {
    justify-content: center;
    flex-direction: column;
    align-items: left;
    display: flex;
    padding 8px 15px;

    > input {
      box-shadow: 0px 4px 8px 5px rgba(198, 198, 198, 0.25);
      border: 1px solid #001C46;
      background-color: white;
      border-radius: 12px;
      padding: 8px 14px;
      outline: none;
      width: 100%;
    }
  }

  > div:nth-child(4){
    text-align: right;
    padding-right: 15px;
  }
`;
const ContainerEmailStyle = styled.div<{ errorStyle: boolean }>`
  > input {
    border: ${(p) =>
      p.errorStyle ? "1px solid red !important" : "1px solid #001C46;"};
  }
`;
const ContainerPassStyle = styled.div<{ errorStyle: boolean }>`
  > input {
    border: ${(p) =>
      p.errorStyle ? "1px solid red !important" : "1px solid #001C46;"};
  }
`;
const ContainerPassConfirmStyle = styled.div<{ errorStyle: boolean }>`
  > input {
    border: ${(p) =>
      p.errorStyle ? "1px solid red !important" : "1px solid #001C46;"};
  }
`;
const ErrorMessage = styled.span`
  font-size: 10px;
  color: red;
  margin-top: 6px;
`;

interface IRegisterError {
  message: string;
  statusCode: number;
  // Otras propiedades específicas del error
}

const ModalRegister: React.FC = () => {
  const [startRegister, resultRegister] = useStartRegisterByEmailMutation();
  const [statusSnackbar, setStatusSnackbar] = React.useState(false);
  const [socialRequest, setSocialRequest] = React.useState<string>("");
  const [registerError, setRegisterError] = React.useState<string>("");
  const isStatus = useAppSelector(getStatusModalRegister);
  const dispatch = useAppDispatch();
  const queryParams = window.location.search;
  const splitParams = new URLSearchParams(queryParams);

  const [startGoogleCallback, resultCallback] =
    useStartSocialCallbackMutation();

  React.useEffect(() => {
    if (queryParams && splitParams.size > 0) {
      const socialRequest = localStorage.getItem(APP_CONSTANS.SOCIAL_REQUEST);
      if (socialRequest) {
        startGoogleCallback({ params: queryParams, social: socialRequest });
        window.history.pushState({}, document.title, "/");
        localStorage.removeItem(APP_CONSTANS.SOCIAL_REQUEST);
        dispatch(updateLoadingApp(true));
      }
    }
  }, []);

  const methods = useForm<SignupForm>({
    resolver: yupResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      passConfirmation: "",
      recaptcha: "",
    },
  });

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
    setValue,
  } = methods;

  const handleSubmit = React.useCallback((data: any) => {
    startRegister({
      email: data.email,
      password: data.password,
      passConfirmation: data.passConfirmation,
    })
      .unwrap()
      .catch((error) => setRegisterError(error.data.message));
  }, []);

  const handleChangeLogin = () => {
    dispatch(updateStatusModalRegister(false));
    dispatch(updateStatusModalLogin(true));
  };

  function onChange(value: any) {
    if (value != "") {
      setValue("recaptcha", value);
    }
  }

  const handleKeyUp = (e: any) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      submitWrapper(handleSubmit)();
    }
  };

  const { handleUpdateUserAuth, handleUpdateFunctionalities } = useDataUser();

  React.useEffect(() => {
    if (resultRegister.data != null) {
      handleUpdateUserAuth(resultRegister.data);
      handleUpdateFunctionalities(
        resultRegister.data.functionalities,
        true,
        true
      );
    }
  }, [resultRegister.isSuccess]);

  React.useEffect(() => {
    if (resultRegister.isError) {
      handleCloseAllAdvideError();
      setStatusSnackbar(true);
    }
  }, [resultRegister.isError]);

  const handleCloseAllAdvideError = () => {
    window.history.pushState({}, document.title, "/");
    localStorage.removeItem(APP_CONSTANS.SOCIAL_REQUEST);
    dispatch(updateLoadingApp(false));
  };

  React.useEffect(() => {
    if (resultCallback.data != null) {
      handleUpdateUserAuth(resultCallback.data);
      handleUpdateFunctionalities(
        resultCallback.data.functionalities,
        true,
        true
      );
      dispatch(updateLoadingApp(false));
    }
  }, [resultCallback.isSuccess]);

  React.useEffect(() => {
    if (resultCallback.isError) {
      handleCloseAllAdvideError();
      setStatusSnackbar(true);
    }
  }, [resultCallback.isError]);

  const [startLoginByGoogle, resultsGoogle] = useStartLoginSocialMutation();
  const handleSocialLogin = (social: string) => {
    startLoginByGoogle(social);
    localStorage.setItem(APP_CONSTANS.SOCIAL_REQUEST, social);
  };
  React.useEffect(() => {
    if (resultsGoogle != null) {
      // Logger("Result Google", JSON.stringify(resultsGoogle));
      if (resultsGoogle.isSuccess && !!resultsGoogle.data) {
        window.open(
          resultsGoogle.data.message,
          "_self",
          "width=400,height=600"
        );
      }
    }
  }, [resultsGoogle]);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isStatus}
        onClose={() => {
          dispatch(updateStatusModalRegister(false));
          dispatch(updateTemporalAction(ETemporalActions.NO_ACTION));
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
            <div />
            <WrapperBookImg src={BookImg} />
            <WrapperRuleImg src={RuleImg} />
            <Grid container>
              <Grid item xs={12}>
                <Box
                  component="img"
                  sx={{
                    padding: "4px",
                    maxWidth: { xs: 160, sm: 140, md: 160 },
                    margin: "auto",
                  }}
                  alt="Logo de Elaminas"
                  src={LogoImg}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              justifyContent="center"
              alignItems="center"
              display="flex"
              marginBottom={2}
            >
              <Typography
                variant="h5"
                component="h5"
                fontWeight="600"
                color={customPalette.secondaryColor}
              >
                Registro
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormContainer>
                <ContainerEmailStyle
                  errorStyle={!!(errors.email as any)?.message}
                >
                  <Typography
                    variant="caption"
                    component="label"
                    textAlign="left"
                  >
                    Correo electrónico
                  </Typography>
                  <input
                    placeholder="Correo electronico"
                    type="email"
                    onKeyUp={handleKeyUp}
                    required
                    {...register("email")}
                  />
                  {!!(errors.email as any)?.message && (
                    <ErrorMessage>{errors?.email?.message}</ErrorMessage>
                  )}
                </ContainerEmailStyle>
                <ContainerPassStyle
                  errorStyle={!!(errors.email as any)?.message}
                >
                  <Typography
                    variant="caption"
                    component="span"
                    textAlign="left"
                  >
                    Contraseña
                  </Typography>
                  <input
                    placeholder="Contraseña"
                    type="password"
                    onKeyUp={handleKeyUp}
                    required
                    {...register("password")}
                  />
                  {!!(errors.password as any)?.message && (
                    <ErrorMessage>{errors?.password?.message}</ErrorMessage>
                  )}
                </ContainerPassStyle>
                <ContainerPassConfirmStyle
                  errorStyle={!!(errors.email as any)?.message}
                >
                  <Typography
                    variant="caption"
                    component="span"
                    textAlign="left"
                  >
                    Repetir Contraseña
                  </Typography>
                  <input
                    placeholder="Repetir contraseña"
                    type="password"
                    onKeyUp={handleKeyUp}
                    required
                    {...register("passConfirmation")}
                  />
                  {!!(errors.passConfirmation as any)?.message && (
                    <ErrorMessage>
                      {errors?.passConfirmation?.message}
                    </ErrorMessage>
                  )}
                </ContainerPassConfirmStyle>
              </FormContainer>
            </Grid>
            <GridCaptcha
              item
              xs={12}
              justifyContent="center"
              alignItems="center"
              marginTop={3}
              marginBottom={3}
              textAlign={"center"}
            >
              <ReCAPTCHA
                sitekey={settingsAPP.app.recaptchaKey}
                onChange={onChange}
              />
              {!!(errors.recaptcha as any)?.message && (
                <ErrorMessage>{errors?.recaptcha?.message}</ErrorMessage>
              )}
            </GridCaptcha>
            <Grid item xs={12} justifyContent="center" alignItems="center">
              <CustomButton
                title="Registrar"
                style="SECONDARY"
                borderStyle="NONE"
                Icon={RightArrowAlt}
                action={submitWrapper(handleSubmit)}
                isLoading={resultRegister.isLoading}
                customStyle={`
                border-color: white;
                color: white;
                `}
              />
            </Grid>
            <Grid
              item
              xs={12}
              justifyContent="center"
              alignItems="center"
              marginTop={3}
              marginBottom={3}
            >
              <Divider />
            </Grid>
            <Grid
              item
              xs={12}
              justifyContent="space-evenly"
              alignItems="center"
              display="flex"
              flexDirection="row"
            >
              <ButtonGoogle
                item
                xs={12}
                display="flex"
                justifyContent="center"
                alignItems="center"
                columnGap={2}
                onClick={() => {
                  if (!resultsGoogle.isLoading) {
                    localStorage.setItem(APP_CONSTANS.SOCIAL_REQUEST, "google");
                    setSocialRequest("google");
                    handleSocialLogin("google");
                  }
                }}
              >
                {resultsGoogle.isLoading && socialRequest == "google" ? (
                  <CustomLoader></CustomLoader>
                ) : (
                  <>
                    <Google />
                    <Typography variant="caption" component="span">
                      Google
                    </Typography>
                  </>
                )}
              </ButtonGoogle>
              <ButtonFacebook
                item
                xs={12}
                display="flex"
                justifyContent="center"
                alignItems="center"
                columnGap={2}
                onClick={() => {
                  if (!resultsGoogle.isLoading) {
                    localStorage.setItem(
                      APP_CONSTANS.SOCIAL_REQUEST,
                      "facebook"
                    );
                    setSocialRequest("facebook");
                    handleSocialLogin("facebook");
                  }
                }}
              >
                {resultsGoogle.isLoading && socialRequest == "facebook" ? (
                  <CustomLoader></CustomLoader>
                ) : (
                  <>
                    <Facebook />
                    <Typography variant="caption" component="span">
                      Facebook
                    </Typography>
                  </>
                )}
              </ButtonFacebook>
            </Grid>
            <Grid item xs={12} textAlign="center" marginTop={2}>
              <Typography
                variant="caption"
                component="span"
                fontWeight="300"
                color={customPalette.primaryColor}
              >
                ¿Ya tienes una cuenta?
              </Typography>
              <Typography
                variant="caption"
                component="span"
                fontWeight="400"
                color={customPalette.secondaryColor}
                onClick={handleChangeLogin}
                marginLeft="5px"
                sx={{ cursor: "pointer  " }}
              >
                Inicia Sesión
              </Typography>
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
          {registerError != ""
            ? registerError
            : "Al parecer hubo un error con tus credenciales"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ModalRegister;
