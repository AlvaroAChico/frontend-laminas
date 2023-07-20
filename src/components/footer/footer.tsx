import React from "react";
import styled from "styled-components";
import { customPalette } from "../../config/theme/theme";
import { Grid, Box, Typography } from "@mui/material";
import SectionMax from "../section-max/section-max";
import LogoWhiteImg from "../../assets/img/logo_white.svg";
import {
  Facebook,
  Instagram,
  Pinterest,
  Twitter,
} from "styled-icons/boxicons-logos";
import BookImg from "../../assets/img/book_icon.png";
import RuleImg from "../../assets/img/rule_icon.png";

const WrapperFooterMain = styled.div`
  background: ${customPalette.primaryColor};
  width: 100%;
  padding: 30px 20px;
  color: white;
  position: relative;
  overflow: hidden;
`;
const WrapperCopyright = styled.div`
  width: 100%;
  background: #031024;
  text-align: center;
  color: white;
  padding: 4px;
`;
const SocialGrid = styled(Grid)`
  padding: 10px 0;

  > svg {
    width: 100%;
    max-width: 25px;
    margin: 0 5px 0;
  }
`;
const WrapperBookImg = styled.img`
  position: absolute;
  bottom: -20px;
  left: -50px;
  width: 120px;
  opacity: 0.2;
`;
const WrapperRuleImg = styled.img`
  position: absolute;
  top: 0;
  right: -60px;
  width: 150px;
  opacity: 0.2;
`;

const Footer: React.FC = () => {
  return (
    <>
      <WrapperFooterMain>
        <WrapperBookImg src={BookImg} />
        <WrapperRuleImg src={RuleImg} />
        <SectionMax>
          <Grid container rowGap={3}>
            <Grid xs={12} sm={6} md={3} lg={3} textAlign={"center"}>
              <Grid xs={12}>
                <Box
                  component="img"
                  sx={{
                    padding: "4px",
                    maxWidth: { xs: 160, sm: 140, md: 160 },
                    marginBottom: "15px",
                  }}
                  alt="Logo de Elaminas"
                  src={LogoWhiteImg}
                />
              </Grid>
              <Grid xs={12}>
                <Typography
                  variant="button"
                  component="span"
                  fontWeight={"500"}
                >
                  Industrial Innova SAC
                </Typography>
              </Grid>
              <Grid xs={12}>
                <Typography variant="body2" component="span" fontWeight={"100"}>
                  Calle Malecon Miramar 864
                </Typography>
              </Grid>
              <Grid xs={12}>
                <Typography variant="body2" component="span" fontWeight={"100"}>
                  Lima, Perú
                </Typography>
              </Grid>
            </Grid>
            <Grid xs={12} sm={6} md={3} lg={3} textAlign={"center"}>
              <Grid container rowGap={1}>
                <Grid xs={12}>
                  <Typography
                    variant="button"
                    component="span"
                    fontWeight={"500"}
                  >
                    Secciones
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography
                    variant="body2"
                    component="span"
                    fontWeight={"200"}
                  >
                    Láminas
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography
                    variant="body2"
                    component="span"
                    fontWeight={"200"}
                  >
                    Planes
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography
                    variant="body2"
                    component="span"
                    fontWeight={"200"}
                  >
                    Perfil
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} sm={6} md={3} lg={3} textAlign={"center"}>
              <Grid container rowGap={1}>
                <Grid xs={12}>
                  <Typography
                    variant="button"
                    component="span"
                    fontWeight={"500"}
                  >
                    Recursos
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography
                    variant="body2"
                    component="span"
                    fontWeight={"200"}
                  >
                    Nosotros
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography
                    variant="body2"
                    component="span"
                    fontWeight={"200"}
                  >
                    Contáctanos
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography
                    variant="body2"
                    component="span"
                    fontWeight={"200"}
                  >
                    Novedades
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} sm={6} md={3} lg={3} textAlign={"center"}>
              <Grid container>
                <Grid xs={12}>
                  <Typography
                    variant="button"
                    component="span"
                    fontWeight={"500"}
                  >
                    Redes Sociales
                  </Typography>
                </Grid>
                <SocialGrid xs={12}>
                  <Facebook />
                  <Instagram />
                  <Twitter />
                  <Pinterest />
                </SocialGrid>
              </Grid>
            </Grid>
          </Grid>
        </SectionMax>
      </WrapperFooterMain>
      <WrapperCopyright>
        <Typography variant="caption" component="span" fontWeight={100}>
          Copyright 2023. Industrial Innova del Perú SAC. All Rights Reserved
        </Typography>
      </WrapperCopyright>
    </>
  );
};

export default Footer;
