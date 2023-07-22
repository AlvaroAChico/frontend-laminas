import React from 'react'
import HeaderSearch from '../../components/header-search/header-search'
import CustomTitle from '../../components/custom-title/custom-title'
import SectionMax from '../../components/section-max/section-max'
import CardLamina from '../../components/card-lamina/card-lamina'
import { listLaminas } from '../../config/mocks/list-laminas'
import CustomButtom from "../../components/custom-button/custom-button";
import { Phone } from "styled-icons/boxicons-solid";
import Plans from "../../components/plans/plans";
import { Typography, Grid } from '@mui/material'
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from 'styled-components'
import { customPalette } from  "../../config/theme/theme"
import './dashboard-styles.css'

const WrapperDashboardPage = styled.div`
  padding: 20px;
  width: 100%;
`
const WrapperDashboard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  padding: 30px 20px;
`;

const SiderBarDashboard = styled(Grid)`
  box-shadow: 0px 6px 12px 2px rgba(0, 102, 255, 0.25);
  background: ${customPalette.primaryColor};
  border-radius: 20px;
  padding: 20px;
`

const DashboardPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const nroLaminas = 200;
  
  const handleChange =
  (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  return (
    <>
      <HeaderSearch title="Dashboard"/>
      <WrapperDashboardPage>
        <WrapperDashboard>
      <SectionMax>
        <CustomTitle title="Panel de Administración" />
      </SectionMax>
      <SectionMax>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <SiderBarDashboard
            item xs={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            flexDirection="column"
            color="white"
          >
            <Typography variant="subtitle2" component="p">Bienvenido</Typography>
            <NavLink
              to="/dashboard/perfil"
              className={({ isActive }) => isActive ? "active-dashboard" : "inactive-dashboard"}
            >
              Perfil
            </NavLink>
            <NavLink
              to="/dashboard/descargas"
              className={({ isActive }) => isActive ? "active-dashboard" : "inactive-dashboard"}
            >
              Descargar
            </NavLink>
            <NavLink
              to="/dashboard/suscripcion"
              className={({ isActive }) => isActive ? "active-dashboard" : "inactive-dashboard"}
            >
              Suscripcion
            </NavLink>
            <NavLink
              to="/dashboard/favoritos"
              className={({ isActive }) => isActive ? "active-dashboard" : "inactive-dashboard"}
            >
              Favoritos
            </NavLink>
          </SiderBarDashboard>
          <Grid item xs={9}>
            <Outlet />
          </Grid>
        </Grid>
      </SectionMax>
    </WrapperDashboard>
      </WrapperDashboardPage>
    </>
  )
}

export default DashboardPage