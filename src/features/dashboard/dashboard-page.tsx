import React from "react";
import HeaderSearch from "../../components/header-search/header-search";
import CustomTitle from "../../components/custom-title/custom-title";
import SectionMax from "../../components/section-max/section-max";
import CardLamina from "../../components/card-lamina/card-lamina";
import { listLaminas } from "../../config/mocks/list-laminas";
import CustomButtom from "../../components/custom-button/custom-button";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Phone } from "styled-icons/boxicons-solid";
import Plans from "../../components/plans/plans";
import { Typography, Grid, useMediaQuery } from "@mui/material";
import styled from "styled-components";
import { theme, customPalette } from "../../config/theme/theme";
import {
  IAuthData,
  IFunctionality,
} from "../../core/store/auth/types/auth-types";
import {
  updateDataFunctionality,
  updateDataToken,
  updateDataUserAuth,
  updateStatusAuthenticated,
} from "../../core/store/app-store/appSlice";
import Cookies from "js-cookie";
import { useAppDispatch } from "../../app/hooks";
import "./dashboard-styles.css";
import { Bars } from "@styled-icons/fa-solid/Bars";
import useSearchSheet from "../../utils/hooks/use-search-sheet";
import { APP_CONSTANS } from "../../constants/app";

const WrapperDashboardPage = styled.div`
  padding: 10px;
  width: 100%;
`;
const WrapperDashboard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  padding: 30px 10px;
`;

const SiderBarDashboard = styled(Grid)`
  box-shadow: 0px 6px 12px 2px rgba(0, 102, 255, 0.25);
  background: ${customPalette.primaryColor};
  border-radius: 20px;
  padding: 20px;
`;
const GridBurguerMenu = styled(Grid)`
  > svg {
    width: 100%;
    max-width: 40px;
  }
`;
const MaxWidthSection = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 10px 20px;
`;

const DashboardPage: React.FC = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const QueriePhone = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleSetData, handleKeyUp } = useSearchSheet();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  React.useEffect(() => {
    const dataUser = Cookies.get(APP_CONSTANS.AUTH_USER_DATA);
    if (dataUser != null && dataUser != undefined) {
      const user = JSON.parse(dataUser) as IAuthData;
      dispatch(updateDataToken(user.token));
      const functionalityUser = localStorage.getItem(
        APP_CONSTANS.AUTH_FUNCIONALITIES
      );
      if (functionalityUser != null && functionalityUser != undefined) {
        const funcUser = JSON.parse(functionalityUser) as IFunctionality[];
        dispatch(updateDataFunctionality(funcUser));
      }
      dispatch(updateStatusAuthenticated(true));
    } else {
      navigate("/");
    }
  }, []);

  const dataUser = Cookies.get(APP_CONSTANS.AUTH_USER_DATA);
  if (dataUser == null || dataUser == undefined) {
    return null;
  }

  return (
    <>
      <HeaderSearch
        title="Dashboard"
        handleSetData={handleSetData}
        handleKeyUp={handleKeyUp}
      />
      <WrapperDashboardPage>
        <WrapperDashboard>
          <SectionMax>
            <CustomTitle title="Panel de Administración" />
          </SectionMax>
          <MaxWidthSection>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {!QueriePhone && (
                <SiderBarDashboard
                  item
                  xs={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexWrap="wrap"
                  flexDirection="column"
                  color="white"
                  alignSelf="start"
                >
                  <Typography variant="subtitle2" component="p">
                    Bienvenido
                  </Typography>
                  <NavLink
                    to="/dashboard/perfil"
                    className={({ isActive }) =>
                      isActive ? "active-dashboard" : "inactive-dashboard"
                    }
                  >
                    Perfil
                  </NavLink>
                  <NavLink
                    to="/dashboard/descargas"
                    className={({ isActive }) =>
                      isActive ? "active-dashboard" : "inactive-dashboard"
                    }
                  >
                    Descargas
                  </NavLink>
                  <NavLink
                    to="/dashboard/suscripcion"
                    className={({ isActive }) =>
                      isActive ? "active-dashboard" : "inactive-dashboard"
                    }
                  >
                    Suscripcion
                  </NavLink>
                  <NavLink
                    to="/dashboard/favoritos"
                    className={({ isActive }) =>
                      isActive ? "active-dashboard" : "inactive-dashboard"
                    }
                  >
                    Favoritos
                  </NavLink>
                </SiderBarDashboard>
              )}
              <Grid
                item
                xs={12}
                sm={9}
                paddingLeft={2}
                justifyContent="center"
                alignSelf="flex-start"
              >
                <Outlet />
              </Grid>
            </Grid>
          </MaxWidthSection>
        </WrapperDashboard>
      </WrapperDashboardPage>
    </>
  );
};

export default DashboardPage;
