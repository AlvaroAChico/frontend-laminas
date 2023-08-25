import React from "react";
import styled from "styled-components";
import CustomTitle from "../../../components/custom-title/custom-title";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import SectionMax from "../../../components/section-max/section-max";
import CustomButtom from "../../../components/custom-button/custom-button";
import { Phone } from "styled-icons/boxicons-solid";
import Plans from "../../../components/plans/plans";
import PlansMobile from "../../../components/plans/plans-mobile";
import { updateStatusModalPayment } from "../../../core/store/app-store/appSlice";
import { useAppDispatch } from "../../../app/hooks";

const WrapperPlans = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  padding: 30px 20px;
`;

const SectionPlans: React.FC = () => {
  const QueriePhone = useMediaQuery("(min-width:768px)");
  const dispatch = useAppDispatch();

  const handleOpenWhatsapp = () => {
    window.open("https://wa.link/8o4p6t", "_blank");
  };

  return (
    <WrapperPlans>
      <SectionMax>
        <CustomTitle title="Selecciona el plan que mejor se adapte a tus necesidades" />
      </SectionMax>
      <SectionMax>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid
            item
            xs={12}
            md={6}
            justifyContent={"center"}
            alignItems={"center"}
            rowGap={2}
            columnGap={2}
          >
            <Typography variant="h6" component="span" fontWeight={300}>
              Y comienza a potenciar tu aprendizaje hoy mismo o contacta un
              asesor
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            justifyContent={"right"}
            alignItems={"right"}
            rowGap={2}
            columnGap={2}
            sx={{
              "@media (max-width: 768px)": {
                alignItems: "center",
                justifyContent: "center",
                margin: "10px 6px",
              },
            }}
          >
            <CustomButtom
              title="Contactar un asesor"
              style="PRIMARY"
              borderStyle="NONE"
              Icon={Phone}
              action={handleOpenWhatsapp}
              customStyle={`width: fit-content; padding: 10px 30px; margin: 0;`}
            />
          </Grid>
          <Grid item xs={12} justifyContent={"center"} alignItems={"center"}>
            {QueriePhone && (
              <Plans
                basicAction={() => dispatch(updateStatusModalPayment(true))}
                mediumAction={() => dispatch(updateStatusModalPayment(true))}
                premiumAction={() => dispatch(updateStatusModalPayment(true))}
              />
            )}
            {!QueriePhone && (
              <PlansMobile
                basicAction={() => dispatch(updateStatusModalPayment(true))}
                mediumAction={() => dispatch(updateStatusModalPayment(true))}
                premiumAction={() => dispatch(updateStatusModalPayment(true))}
              />
            )}
          </Grid>
        </Grid>
      </SectionMax>
    </WrapperPlans>
  );
};

export default SectionPlans;
