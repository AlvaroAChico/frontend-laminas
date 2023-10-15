import React from "react";
import styled from "styled-components";
import { customPalette } from "../../config/theme/theme";
import LogoImg from "../../assets/img/logo.svg";
import { Box, Grid, Typography } from "@mui/material";
import {
  RecoverPasswordForm,
  RecoverPasswordSchema,
} from "../../core/models/reset-password";
import { yupResolver } from "@hookform/resolvers/yup";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { settingsAPP } from "../../config/environments/settings";
import CustomButton from "../../components/custom-button/custom-button";
import { RightArrowAlt } from "@styled-icons/boxicons-regular/RightArrowAlt";
import HeaderSearch from "../../components/header-search/header-search";
import useSearchSheet from "../../utils/hooks/use-search-sheet";
import { useNavigate } from "react-router-dom";
import { useUpdatePasswordRecoveryMutation } from "../../core/store/user/userAPI";
import { toast, Toaster } from "react-hot-toast";

const RecoveryContainer = styled.div`
  background: ${customPalette.primaryColor};
  height: fit-content;
`;

const BoxStyle = styled(Box)`
  padding: 20px 25px;
  background: white;
  outline: none;
  width: 100%;
`;
const GridCaptcha = styled(Grid)`
  > div div div:nth-child(1) {
    margin: auto;
  }
`;

const FormContainer = styled.div`
> div:nth-child(1), div:nth-child(2), div:nth-child(3){
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
const ContainerOldPassStyle = styled.div<{ errorStyle: boolean }>`
  > input {
    border: ${(p) =>
      p.errorStyle ? "1px solid red !important" : "1px solid #001C46;"};
  }
`;
const ContainerNewPassStyle = styled.div<{ errorStyle: boolean }>`
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

const RecoveryPassword: React.FC = () => {
  const { handleSetData, handleKeyUp } = useSearchSheet();
  const queryParams = window.location.search;
  const navigate = useNavigate();

  const [updateCurrentPass, resultUpdatePass] =
    useUpdatePasswordRecoveryMutation();

  React.useEffect(() => {
    const txkConstans = queryParams?.split("?")[1]?.split("=")[0];
    const txk = queryParams.split("&")[0].split("=")[1];
    if (!!txk && txk != null && txk != "" && txkConstans == "token") {
      window.history.pushState({}, document.title, "/recuperar-contraseña");
      setValue("token", txk);
    } else {
      navigate("/");
    }
  }, []);

  const methods = useForm<RecoverPasswordForm>({
    resolver: yupResolver(RecoverPasswordSchema),
    defaultValues: {
      token: "",
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
    updateCurrentPass({
      token: data.token,
      email: data.email,
      pass: data.password,
    })
      .unwrap()
      .catch((error) => {
        toast.error(error.data.message);
      });
  }, []);

  function onChange(value: any) {
    if (value != "") {
      setValue("recaptcha", value);
    }
  }

  React.useEffect(() => {
    if (resultUpdatePass.data) {
      toast.success(resultUpdatePass.data.message);
      setTimeout(() => {
        navigate("/");
      }, 2500);
    }
  }, [resultUpdatePass.isSuccess]);
  return (
    <RecoveryContainer>
      <Toaster />
      <HeaderSearch
        title="Recuperar Contraseña"
        handleSetData={handleSetData}
        handleKeyUp={handleKeyUp}
      />
      <BoxStyle>
        <Grid
          item
          xs={12}
          sx={{ width: "100%", maxWidth: "400px", margin: "auto" }}
        >
          <FormContainer>
            <ContainerOldPassStyle
              errorStyle={!!(errors.email as any)?.message}
            >
              <Typography variant="caption" component="label" textAlign="left">
                Email
              </Typography>
              <input
                placeholder="Email"
                type="text"
                required
                {...register("email")}
              />
              {!!(errors.email as any)?.message && (
                <ErrorMessage>{errors?.email?.message}</ErrorMessage>
              )}
            </ContainerOldPassStyle>
            <ContainerNewPassStyle
              errorStyle={!!(errors.password as any)?.message}
            >
              <Typography variant="caption" component="label" textAlign="left">
                Nueva Contraseña
              </Typography>
              <input
                placeholder="Nueva contraseña"
                type="password"
                required
                {...register("password")}
              />
              {!!(errors.password as any)?.message && (
                <ErrorMessage>{errors?.password?.message}</ErrorMessage>
              )}
            </ContainerNewPassStyle>
            <ContainerNewPassStyle
              errorStyle={!!(errors.passConfirmation as any)?.message}
            >
              <Typography variant="caption" component="label" textAlign="left">
                Repetir Contraseña
              </Typography>
              <input
                placeholder="Repetir contraseña"
                type="password"
                required
                {...register("passConfirmation")}
              />
              {!!(errors.passConfirmation as any)?.message && (
                <ErrorMessage>{errors?.passConfirmation?.message}</ErrorMessage>
              )}
            </ContainerNewPassStyle>
          </FormContainer>
        </Grid>
        <GridCaptcha
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
          paddingTop={"20px"}
          paddingBottom={"20px"}
          textAlign={"center"}
          sx={{ width: "100%", maxWidth: "400px", margin: "auto" }}
        >
          <ReCAPTCHA
            sitekey={settingsAPP.app.recaptchaKey}
            onChange={onChange}
          />
          {!!(errors.recaptcha as any)?.message && (
            <ErrorMessage>{errors?.recaptcha?.message}</ErrorMessage>
          )}
        </GridCaptcha>
        <Grid
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
          flexWrap={"wrap"}
          display={"flex"}
          gap={3}
          sx={{ width: "100%", maxWidth: "400px", margin: "auto" }}
        >
          <CustomButton
            title="Actualizar"
            style="SECONDARY"
            borderStyle="NONE"
            Icon={RightArrowAlt}
            action={submitWrapper(handleSubmit)}
            isLoading={resultUpdatePass.isLoading}
            customStyle={`
                  border-color: white;
                  color: white
                  padding: 8px 10px;
                  width: 100%;
                `}
          />
        </Grid>
      </BoxStyle>
    </RecoveryContainer>
  );
};

export default RecoveryPassword;
