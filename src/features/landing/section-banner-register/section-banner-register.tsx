import React from "react";
import BannerImg from "../../../assets/img/banner_register.jpg";
import styled from "styled-components";
import { Alert, Grid, Snackbar, Typography } from "@mui/material";
import { customPalette } from "../../../config/theme/theme";
import { Facebook, Google } from "styled-icons/bootstrap";
import { Email } from "@styled-icons/material-outlined/Email";
import { useAppDispatch } from "../../../app/hooks";
import {
  updateLoadingApp,
  updateStatusModalRegister,
} from "../../../core/store/app-store/appSlice";
import useDataUser from "../../../utils/hooks/use-data-user";
import {
  useStartLoginSocialMutation,
  useStartSocialCallbackMutation,
} from "../../../core/store/auth/authAPI";
import { APP_CONSTANS } from "../../../constants/app";
import CustomLoader from "../../../components/custom-loader/custom-loader";

const HeaderBackground = styled(Grid)`
  background-image: url(${BannerImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: fit-content;
  min-height: 400px;
  position: relative;

  @media (max-width: 899px) {
    min-height: 750px;
  }
`;

const OverlayHeader = styled.div`
  background-color: rgb(0 0 0 / 60%);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`;
const HeaderBody = styled(Grid)`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 2;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  max-width: 1200px;
  margin: auto;
  padding: 30px;
`;

const WrapperSocialRegister = styled(Grid)`
  border-radius: 20px;
  background: #ffefef;
  backdrop-filter: blur(2px);
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
const ButtonEmail = styled(ButtonSocialRegister)`
  background: #55b65e;
`;

const SectionBannerRegister: React.FC = () => {
  const [socialRequest, setSocialRequest] = React.useState<string>("");
  const [statusSnackbar, setStatusSnackbar] = React.useState(false);
  const queryParams = window.location.search;
  const splitParams = new URLSearchParams(queryParams);
  const dispatch = useAppDispatch();

  const { handleGetToken } = useDataUser();

  const user = handleGetToken();
  if (user.token != null && user.token != "") {
    return null;
  }

  const handleOpenRegister = () => dispatch(updateStatusModalRegister(true));

  const { handleUpdateUserAuth, handleUpdateFunctionalities } = useDataUser();

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
    <HeaderBackground>
      <OverlayHeader />
      <HeaderBody container justifyContent="center" alignItems="center">
        <Grid
          item
          xs={12}
          md={6}
          justifyContent="center"
          alignItems="center"
          padding={2}
        >
          <Typography
            variant="h3"
            component="h3"
            color="white"
            fontWeight={200}
            textAlign="center"
          >
            ¡Registrate para descargar laminas gratis!
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          justifyContent="center"
          alignItems="center"
          padding={2}
        >
          <WrapperSocialRegister container padding={4} rowGap={2}>
            <ButtonGoogle
              item
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              columnGap={2}
              sx={{ cursor: "pointer" }}
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
              sx={{ cursor: "pointer" }}
              onClick={() => {
                if (!resultsGoogle.isLoading) {
                  localStorage.setItem(APP_CONSTANS.SOCIAL_REQUEST, "facebook");
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
            <ButtonEmail
              item
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              columnGap={2}
              onClick={handleOpenRegister}
              sx={{ cursor: "pointer" }}
            >
              <Email />
              <Typography variant="caption" component="span">
                Registrarse con Email
              </Typography>
            </ButtonEmail>
            <Grid item xs={12} justifyContent="center" alignItems="center">
              <Typography variant="caption" component="span">
                Al hacer click en <strong>Registrar Cuenta</strong> o
                registrarse a través de Facebook o Google esta aceptando las
                condiciones del Contrato de Usuario
              </Typography>
            </Grid>
          </WrapperSocialRegister>
        </Grid>
      </HeaderBody>
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
    </HeaderBackground>
  );
};

export default SectionBannerRegister;
