import React from "react";
import styled from "styled-components";
import { Grid, Box, Typography, useMediaQuery } from "@mui/material";
import CustomButtom from "../custom-button/custom-button";
import LogoImg from "../../assets/img/logo.svg";
import { Menu } from "@styled-icons/evaicons-solid/Menu";
import { theme } from "../../config/theme/theme";
import { useAppSelector } from "../../app/hooks";
import { getValueScroll } from "../../core/store/landing/landingSlice";
import { NavLink } from "react-router-dom";
import './navbar-styles.css'

const WrapperNavbar = styled.div<{ valueScroll: number }>`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 4;
  color: white;
  height: 65px;
  background: ${(p) => (p.valueScroll > 160 ? "#001c467a" : "transparent")};
  backdrop-filter: ${(p) => (p.valueScroll > 160 ? "blur(8px)" : "blur(0)")};
  display: grid;
  place-items: center;
  padding-left: 15px;
  padding-right: 15px;
  transition: 0.5s;
`;
const GridBurguerMenu = styled(Grid)`
  > svg {
    width: 100%;
    max-width: 40px;
  }
`;

const Navbar: React.FC = () => {
  const QueriePhone = useMediaQuery(theme.breakpoints.down("sm"));
  const valueScroll = useAppSelector(getValueScroll);

  return (
    <WrapperNavbar valueScroll={valueScroll}>
      <Grid container alignItems={"center"}>
        <Grid xs={6} sm={3} md={3} xl={6} textAlign={"left"}>
          <Box
            component="img"
            sx={{
              padding: "4px",
              maxWidth: { xs: 160, sm: 140, md: 160 },
            }}
            alt="Logo de Elaminas"
            src={LogoImg}
          />
        </Grid>
        {!QueriePhone && (
          <Grid sm={9} md={9} xl={6} textAlign={"center"}>
            <Grid
              container
              alignItems={"right"}
              justifyContent={"right"}
              columnGap={2}
            >
              <Grid xs={2}>
                <Typography>
                  <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "link-active" : "link-inactive"
                    }
                  >
                    Inicio
                  </NavLink>
                </Typography>
              </Grid>
              <Grid xs={2}>
                <Typography>
                  <NavLink
                    to="/laminas"
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "link-active" : "link-inactive"
                    }
                  >
                    Láminas
                  </NavLink>
                </Typography>
              </Grid>
              <Grid xs={2}>
                <Typography>
                  <NavLink
                    to="/planes"
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "link-active" : "link-inactive"
                    }
                  >
                    Planes
                  </NavLink>
                </Typography>
              </Grid>
              <Grid xs={2} textAlign={"right"}>
                <CustomButtom
                  title="Ingresar"
                  style="PRIMARY"
                  borderStyle="OUTLINE"
                  action={() => console.log("Login")}
                  customStyle={`
                  border-color: white;
                  color: white;
                `}
                />
              </Grid>
              <Grid xs={2} textAlign={"right"}>
                <CustomButtom
                  title="Unirme"
                  style="SECONDARY"
                  borderStyle="NONE"
                  action={() => console.log("Register")}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
        {QueriePhone && (
          <GridBurguerMenu xs={6} textAlign={"right"}>
            <Menu />
          </GridBurguerMenu>
        )}
      </Grid>
    </WrapperNavbar>
  );
};

export default Navbar;
