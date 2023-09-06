import React from "react";
import styled from "styled-components";
import {
  Grid,
  Box,
  Typography,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Drawer,
} from "@mui/material";
import CustomButtom from "../custom-button/custom-button";
import LogoImg from "../../assets/img/logo.svg";
import { theme } from "../../config/theme/theme";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  getValueScroll,
  getStatusAuthenticated,
  updateStatusModalLogin,
  updateStatusModalRegister,
  updateStatusAuthenticated,
  updateStatusModalCoupon,
  updateStatusModalPayment,
} from "../../core/store/app-store/appSlice";
import { NavLink } from "react-router-dom";
import AvatarImg from "../../assets/img/avatar_nav.png";
import { customPalette } from "../../config/theme/theme";
import {
  useStartLogoutMutation,
  useStartValidationMeMutation,
} from "../../core/store/auth/authAPI";
import { IAuthData } from "../../core/store/auth/types/auth-types";
import "./navbar-styles.css";

import { Bars } from "@styled-icons/fa-solid/Bars";
import { PersonCircle } from "@styled-icons/bootstrap/PersonCircle";
import { Download } from "@styled-icons/evaicons-solid/Download";
import { Card } from "@styled-icons/ionicons-sharp/Card";
import { StarFill } from "@styled-icons/bootstrap/StarFill";
import { LogOut } from "@styled-icons/ionicons-outline/LogOut";
import BookImg from "../../assets/img/book_icon.png";
import RuleImg from "../../assets/img/rule_icon.png";
import Cookies from "js-cookie";
import { APP_CONSTANS } from "../../constants/app";
import useDataUser from "../../utils/hooks/use-data-user";
import {
  ETemporalActions,
  updateTemporalAction,
} from "../../core/store/temporal/temporalSlice";

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

const WrapperNavMobileMenu = styled.div`
  max-width: 250px;
  min-width: 250px;
  background: #082f76;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  position: relative;
  overflow: hidden;
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
  top: 80px;
  right: -60px;
  width: 150px;
  opacity: 0.2;
`;

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [statusNavMobile, setStatusNavMobile] = React.useState(false);
  const QueriePhone = useMediaQuery(theme.breakpoints.down("sm"));
  const isAuthenticated = useAppSelector(getStatusAuthenticated);
  const [startLogout, resultLogout] = useStartLogoutMutation();
  const valueScroll = useAppSelector(getValueScroll);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewLogin = () => dispatch(updateStatusModalLogin(true));
  const handleViewRegister = () => dispatch(updateStatusModalRegister(true));

  const { handleGetToken } = useDataUser();

  const [validationMe, resultMe] = useStartValidationMeMutation();

  React.useEffect(() => {
    const user = handleGetToken();
    if (user.token != null && user.token != "") {
      if (resultMe.isError) {
        startLogout("");
        dispatch(updateStatusAuthenticated(false));
        Cookies.remove(APP_CONSTANS.AUTH_USER_DATA);
        localStorage.removeItem(APP_CONSTANS.AUTH_FUNCIONALITIES);
        location.reload();
      }
    }
  }, [resultMe.isError]);

  React.useEffect(() => {
    const user = handleGetToken();
    if (user.token != null && user.token != "") {
      validationMe(user.token);
    }
  }, []);

  React.useEffect(() => {
    const user = handleGetToken();
    if (user.token) {
      const tempAction =
        Cookies.get(ETemporalActions.TEMPORAL_ACTION_KEY) ||
        localStorage.getItem(ETemporalActions.TEMPORAL_ACTION_KEY);
      switch (tempAction) {
        case ETemporalActions.OPEN_COUPON:
          {
            dispatch(updateStatusModalCoupon(true));
            dispatch(updateTemporalAction(ETemporalActions.NO_ACTION));
          }
          break;
        case ETemporalActions.OPEN_LOGIN:
          {
            dispatch(updateStatusModalLogin(true));
            dispatch(updateTemporalAction(ETemporalActions.NO_ACTION));
          }
          break;
        case ETemporalActions.OPEN_PAYMENT:
          {
            dispatch(updateStatusModalPayment(true));
            dispatch(updateTemporalAction(ETemporalActions.NO_ACTION));
          }
          break;
        case ETemporalActions.OPEN_REGISTER:
          {
            dispatch(updateStatusModalRegister(true));
            dispatch(updateTemporalAction(ETemporalActions.NO_ACTION));
          }
          break;
        case ETemporalActions.NO_ACTION:
          {
            // NO_ACTION
            dispatch(updateTemporalAction(ETemporalActions.NO_ACTION));
          }
          break;
      }
    }
  }, []);

  return (
    <>
      <WrapperNavbar valueScroll={valueScroll}>
        <Grid container alignItems={"center"}>
          <Grid item xs={6} sm={3} md={3} xl={6} textAlign={"left"}>
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
            <Grid item sm={9} md={9} xl={6} textAlign={"center"}>
              <Grid
                container
                alignItems={"right"}
                justifyContent={"right"}
                columnGap={2}
              >
                <Grid item xs={2}>
                  <Typography>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive ? "link-active" : "link-inactive"
                      }
                    >
                      Inicio
                    </NavLink>
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>
                    <NavLink
                      to="/laminas"
                      className={({ isActive }) =>
                        isActive ? "link-active" : "link-inactive"
                      }
                    >
                      Láminas
                    </NavLink>
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>
                    <NavLink
                      to="/planes"
                      className={({ isActive }) =>
                        isActive ? "link-active" : "link-inactive"
                      }
                    >
                      Planes
                    </NavLink>
                  </Typography>
                </Grid>
                {!isAuthenticated && (
                  <>
                    <Grid item xs={2} textAlign={"right"}>
                      <CustomButtom
                        title="Ingresar"
                        style="PRIMARY"
                        borderStyle="OUTLINE"
                        action={handleViewLogin}
                        customStyle={`
                      border-color: white;
                      color: white;
                    `}
                      />
                    </Grid>
                    <Grid item xs={2} textAlign={"right"}>
                      <CustomButtom
                        title="Unirme"
                        style="SECONDARY"
                        borderStyle="NONE"
                        action={handleViewRegister}
                      />
                    </Grid>
                  </>
                )}
                {isAuthenticated && (
                  <Grid item xs={1}>
                    <Avatar
                      alt="Avatar"
                      src={AvatarImg}
                      onClick={handleClick}
                    />
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          padding: "10px 15px",
                          borderRadius: "15px",
                          mt: 1.5,
                          "& svg": {
                            width: 16,
                            height: 16,
                            ml: -0.5,
                            mr: 2,
                            color: customPalette.primaryColor,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 15,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                          "& a": {
                            color: customPalette.primaryColor,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem onClick={handleClose}>
                        <PersonCircle />
                        <NavLink
                          to="/dashboard/perfil"
                          className={({ isActive }) =>
                            isActive ? "sidebar-active" : "sidebar-inactive"
                          }
                        >
                          Mi Perfil
                        </NavLink>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Download />
                        <NavLink
                          to="/dashboard/descargas"
                          className={({ isActive }) =>
                            isActive ? "sidebar-active" : "sidebar-inactive"
                          }
                        >
                          Descargas
                        </NavLink>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Card />
                        <NavLink
                          to="/dashboard/suscripcion"
                          className={({ isActive }) =>
                            isActive ? "sidebar-active" : "sidebar-inactive"
                          }
                        >
                          Suscripción
                        </NavLink>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <StarFill />
                        <NavLink
                          to="/dashboard/favoritos"
                          className={({ isActive }) =>
                            isActive ? "sidebar-active" : "sidebar-inactive"
                          }
                        >
                          Favoritos
                        </NavLink>
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        onClick={handleClose}
                        sx={{ color: customPalette.secondaryColor }}
                      >
                        <ListItemIcon
                          sx={{
                            "& svg": {
                              color: customPalette.secondaryColor,
                              width: "16px",
                              height: "16px",
                            },
                          }}
                        >
                          <LogOut />
                        </ListItemIcon>
                        <div
                          onClick={() => {
                            startLogout("");
                            dispatch(updateStatusAuthenticated(false));
                            Cookies.remove(APP_CONSTANS.AUTH_USER_DATA);
                            localStorage.removeItem(
                              APP_CONSTANS.AUTH_FUNCIONALITIES
                            );
                            location.reload();
                          }}
                        >
                          Cerrar Sesión
                        </div>
                      </MenuItem>
                    </Menu>
                  </Grid>
                )}
              </Grid>
            </Grid>
          )}
          {QueriePhone && (
            <GridBurguerMenu
              item
              xs={6}
              textAlign={"right"}
              onClick={() => setStatusNavMobile(true)}
              sx={{ cursor: "pointer" }}
            >
              <Bars />
            </GridBurguerMenu>
          )}
        </Grid>
      </WrapperNavbar>
      <Drawer
        anchor={"left"}
        open={statusNavMobile}
        onClose={() => setStatusNavMobile(false)}
        sx={{ maxWidth: "250px" }}
      >
        <WrapperNavMobileMenu>
          <WrapperBookImg src={BookImg} />
          <WrapperRuleImg src={RuleImg} />
          <div>
            <Grid
              container
              alignItems={"right"}
              justifyContent={"right"}
              columnGap={2}
              rowGap={2}
              paddingTop={2}
            >
              {isAuthenticated && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    columnGap: "10px",
                    "> div": {
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "6px",
                    },
                    "> div a:nth-child(1)": {
                      color: "white",
                      textDecoration: "none",
                    },
                    "> div span": {
                      fontSize: "10px",
                      color: "#f4ff1f",
                      cursor: "pointer",
                    },
                  }}
                >
                  <Avatar alt="Avatar" src={AvatarImg} onClick={handleClick} />
                  <div>
                    <NavLink to="/dashboard/perfil">Mi Perfil</NavLink>
                    <div
                      onClick={() => {
                        startLogout("");
                        dispatch(updateStatusAuthenticated(false));
                        Cookies.remove(APP_CONSTANS.AUTH_USER_DATA);
                        localStorage.removeItem(
                          APP_CONSTANS.AUTH_FUNCIONALITIES
                        );
                        location.reload();
                      }}
                    >
                      Cerrar Sesión
                    </div>
                  </div>
                </Grid>
              )}
              {!isAuthenticated && (
                <>
                  <Grid
                    item
                    xs={5}
                    textAlign={"center"}
                    sx={{ margin: "auto" }}
                  >
                    <CustomButtom
                      title="Ingresar"
                      style="PRIMARY"
                      borderStyle="OUTLINE"
                      action={handleViewLogin}
                      customStyle={`
                      border-color: white;
                      color: white;
                    `}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={5}
                    textAlign={"center"}
                    sx={{ margin: "auto" }}
                  >
                    <CustomButtom
                      title="Unirme"
                      style="SECONDARY"
                      borderStyle="NONE"
                      action={handleViewRegister}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} sx={{ marginTop: "20px", padding: "10px" }}>
                <Typography>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "link-mobile-active" : "link-mobile-inactive"
                    }
                  >
                    Inicio
                  </NavLink>
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ padding: "10px" }}>
                <Typography>
                  <NavLink
                    to="/laminas"
                    className={({ isActive }) =>
                      isActive ? "link-mobile-active" : "link-mobile-inactive"
                    }
                  >
                    Láminas
                  </NavLink>
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ padding: "10px" }}>
                <Typography>
                  <NavLink
                    to="/planes"
                    className={({ isActive }) =>
                      isActive ? "link-mobile-active" : "link-mobile-inactive"
                    }
                  >
                    Planes
                  </NavLink>
                </Typography>
              </Grid>
              {isAuthenticated && (
                <>
                  <Grid item xs={12} sx={{ padding: "10px" }}>
                    <Typography>
                      <NavLink
                        to="/dashboard/descargas"
                        className={({ isActive }) =>
                          isActive
                            ? "link-mobile-active"
                            : "link-mobile-inactive"
                        }
                      >
                        Descargas
                      </NavLink>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ padding: "10px" }}>
                    <Typography>
                      <NavLink
                        to="/dashboard/suscripcion"
                        className={({ isActive }) =>
                          isActive
                            ? "link-mobile-active"
                            : "link-mobile-inactive"
                        }
                      >
                        Subscripción
                      </NavLink>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ padding: "10px" }}>
                    <Typography>
                      <NavLink
                        to="/dashboard/favoritos"
                        className={({ isActive }) =>
                          isActive
                            ? "link-mobile-active"
                            : "link-mobile-inactive"
                        }
                      >
                        Favoritos
                      </NavLink>
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </div>
        </WrapperNavMobileMenu>
      </Drawer>
    </>
  );
};

export default Navbar;
