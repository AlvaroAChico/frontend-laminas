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
import styled from 'styled-components'

const WrapperPlansPage = styled.div`
  padding: 20px;
  width: 100%;
`
const WrapperPlans = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  padding: 30px 20px;
`;

const PlansPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const nroLaminas = 200;
  
  const handleChange =
  (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  return (
    <>
      <HeaderSearch title="Planes"/>
      <WrapperPlansPage>
        <WrapperPlans>
      <SectionMax>
        <CustomTitle title="Selecciona el plan que mejor se adapte a tus necesidades" />
      </SectionMax>
      <SectionMax>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid xs={12} md={6} justifyContent={"center"} alignItems={"center"}>
            <Typography variant="h6" component="span" fontWeight={300}>
              Y comienza a potenciar tu aprendizaje hoy mismo o contacta un
              asesor
            </Typography>
          </Grid>
          <Grid
            xs={12}
            md={6}
            display="flex"
            justifyContent={"right"}
            alignItems={"right"}
          >
            <CustomButtom
              title="Contactar un asesor"
              style="PRIMARY"
              borderStyle="NONE"
              Icon={Phone}
              action={() => console.log}
              customStyle={`width: fit-content; padding: 10px 30px; margin: 0;`}
            />
          </Grid>
          <Grid xs={12} justifyContent={"center"} alignItems={"center"}>
            <Plans
              basicAction={() => console.log}
              mediumAction={() => console.log}
              premiumAction={() => console.log}
            />
          </Grid>
        </Grid>
      </SectionMax>
    </WrapperPlans>
      </WrapperPlansPage>
    </>
  )
}

export default PlansPage