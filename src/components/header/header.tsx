import React from "react";
import HeaderImg from "../../assets/img/header_main.jpg";
import styled from "styled-components";
import { Grid, Typography } from "@mui/material";
import SearchLamina from "../search-lamina/search-lamina";
import SectionMax from "../section-max/section-max";

const HeaderBackground = styled(Grid)`
  height: 100vh;
  background-image: url(${HeaderImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
  top: 0;
`;

const Header: React.FC = () => {
  return (
    <HeaderBackground>
      <OverlayHeader />
      {/* <Container maxWidth="sm"> */}
      <HeaderBody container justifyContent="center" alignItems="center">
        <Grid xs={10} justifyContent="center" alignItems="center">
          <SectionMax>
            <Typography
              variant="h2"
              component="h2"
              color="white"
              fontWeight={600}
              textAlign="center"
            >
              Láminas Escolares
            </Typography>
            <Typography
              variant="body1"
              fontWeight={200}
              component="p"
              color="white"
              textAlign="center"
              sx={{ marginTop: 1, marginBottom: 10 }}
            >
              Busca las mejores imágenes para tus tareas...
            </Typography>
            <SearchLamina />
          </SectionMax>
        </Grid>
      </HeaderBody>
      {/* </Container> */}
    </HeaderBackground>
  );
};

export default Header;
