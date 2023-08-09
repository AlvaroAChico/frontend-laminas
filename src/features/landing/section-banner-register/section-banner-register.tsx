import React from "react";
import BannerImg from "../../../assets/img/banner_register.jpg";
import styled from "styled-components";
import { Grid, Typography } from "@mui/material";
import { customPalette } from "../../../config/theme/theme";
import { Facebook, Google } from "styled-icons/bootstrap";
import { Email } from "@styled-icons/material-outlined/Email";
import { breakpoints } from "../../../constants/breakpoints";
import { useAppDispatch } from "../../../app/hooks";
import { updateStatusModalRegister } from "../../../core/store/app-store/appSlice";

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
  const dispatch = useAppDispatch();

  const handleOpenRegister = () => dispatch(updateStatusModalRegister(true));
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
            >
              <Google />
              <Typography variant="caption" component="span">
                Registrarse con Google
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
                Registrarse con Facebook
              </Typography>
            </ButtonFacebook>
            <ButtonEmail
              item
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              columnGap={2}
              onClick={handleOpenRegister}
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
    </HeaderBackground>
  );
};

export default SectionBannerRegister;
