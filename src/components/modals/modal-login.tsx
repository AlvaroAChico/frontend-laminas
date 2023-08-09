import React from "react";
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
  getStatusModalLogin,
  updateStatusModalLogin,
  updateStatusModalRecover,
  updateStatusModalRegister,
  updateStatusAuthenticated,
} from "../../core/store/app-store/appSlice";
import CustomButton from "../../components/custom-button/custom-button";
import { RightArrowAlt } from "@styled-icons/boxicons-regular/RightArrowAlt";
import { useStartLoginMutation } from "../../core/store/auth/authAPI";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { settingsAPP } from "../../config/environments/settings";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { ILogin, IAuthData } from "../../core/store/auth/types/auth-types";
import { SigninForm, SigninSchema } from "../../core/models/login-model";
import { Facebook, Google } from "styled-icons/bootstrap";
import { customPalette } from "../../config/theme/theme";
import { yupResolver } from "@hookform/resolvers/yup";

import RuleImg from "../../assets/img/rule_icon.png";
import BookImg from "../../assets/img/book_icon.png";
import LogoImg from "../../assets/img/logo.svg";
import ReCAPTCHA from "react-google-recaptcha";
import styled from "styled-components";
import Cookies from "js-cookie";

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
> div:nth-child(1), div:nth-child(2){
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
  
  > div:nth-child(3){
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
const ErrorMessage = styled.span`
  font-size: 10px;
  color: red;
  margin-top: 6px;
`;

const ModalLogin: React.FC = () => {
  const [startLogin, resultLogin] = useStartLoginMutation();
  const [statusSnackbar, setStatusSnackbar] = React.useState(false);
  const isStatus = useAppSelector(getStatusModalLogin);
  const dispatch = useAppDispatch();

  const methods = useForm<SigninForm>({
    resolver: yupResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
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
    startLogin({
      email: data.email,
      password: data.password,
    });
  }, []);

  const handleChangeRegister = () => {
    dispatch(updateStatusModalLogin(false));
    dispatch(updateStatusModalRegister(true));
  };

  const handleInitRecover = () => {
    dispatch(updateStatusModalLogin(false));
    dispatch(updateStatusModalRecover(true));
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

  React.useEffect(() => {
    if (resultLogin.data != null) {
      const authData: IAuthData = {
        user: resultLogin.data["0"],
        roles: resultLogin.data.roles,
        token: resultLogin.data.token,
        plan: resultLogin.data.plan,
        functionalities: resultLogin.data.functionalities,
      } as IAuthData;
      Cookies.set("auth_user", JSON.stringify(authData));
      dispatch(updateStatusAuthenticated(true));
      dispatch(updateStatusModalLogin(false));
      location.reload();
    }
  }, [resultLogin.isSuccess]);

  React.useEffect(() => {
    if (resultLogin.isError) {
      setStatusSnackbar(true);
    }
  }, [resultLogin.isError]);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isStatus}
        onClose={() => dispatch(updateStatusModalLogin(false))}
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
              <Grid
                item
                xs={12}
                justifyContent="center"
                alignItems="center"
                display="flex"
                marginTop={1}
                marginBottom={1}
              >
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
                Iniciar Sesión
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
                <div>
                  <Typography
                    variant="caption"
                    component="span"
                    textAlign="right"
                    color="#FC4A41"
                    sx={{ cursor: "pointer" }}
                    onClick={handleInitRecover}
                  >
                    ¿Olvidaste tu contraseña?
                  </Typography>
                </div>
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
                title="Ingresar"
                style="SECONDARY"
                borderStyle="NONE"
                Icon={RightArrowAlt}
                action={submitWrapper(handleSubmit)}
                isLoading={resultLogin.isLoading}
                customStyle={`
                border-color: white;
                color: white;
                padding: 8px 10px;
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
              >
                <Google />
                <Typography variant="caption" component="span">
                  Google
                </Typography>
              </ButtonGoogle>
              <ButtonFacebook
                item
                xs={12}
                display="flex"
                justifyContent="center"
                alignItems="center"
                columnGap={2}
              >
                <Facebook />
                <Typography variant="caption" component="span">
                  Facebook
                </Typography>
              </ButtonFacebook>
            </Grid>
            <Grid item xs={12} textAlign="center" marginTop={2}>
              <Typography
                variant="caption"
                component="span"
                fontWeight="300"
                color={customPalette.primaryColor}
              >
                ¿Aún no tienes cuenta?
              </Typography>
              <Typography
                variant="caption"
                component="span"
                fontWeight="400"
                color={customPalette.secondaryColor}
                onClick={handleChangeRegister}
                marginLeft="5px"
                sx={{ cursor: "pointer  " }}
              >
                Registrate
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
          Al parecer hubo un error con tus credenciales
        </Alert>
      </Snackbar>
    </>
  );
};

export default ModalLogin;
