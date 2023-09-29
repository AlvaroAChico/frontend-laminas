import React from "react";
import HeaderSearch from "../../components/header-search/header-search";
import CustomTitle from "../../components/custom-title/custom-title";
import SectionMax from "../../components/section-max/section-max";
import CustomButtom from "../../components/custom-button/custom-button";
import PlansMobile from "../../components/plans/plans-mobile";
import { Phone } from "styled-icons/boxicons-solid";
import Plans from "../../components/plans/plans";
import { Typography, Grid } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import styled from "styled-components";
import useSearchSheet from "../../utils/hooks/use-search-sheet";
import {
  updateStatusModalLogin,
  updateStatusModalPayment,
  updateStatusStepPayment,
  updateValuePlanPay,
} from "../../core/store/app-store/appSlice";
import { useAppDispatch } from "../../app/hooks";
import { APP_CONSTANS } from "../../constants/app";
import useDataUser from "../../utils/hooks/use-data-user";
import {
  ETemporalActions,
  updateTemporalAction,
} from "../../core/store/temporal/temporalSlice";

const WrapperPlansPage = styled.div`
  padding: 20px;
  width: 100%;
`;
const WrapperPlans = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  padding: 30px 20px;
`;

const PlansPage: React.FC = () => {
  const QueriePhone = useMediaQuery("(min-width:768px)");
  const { handleSetData, handleKeyUp } = useSearchSheet();
  const dispatch = useAppDispatch();

  const handleCallSupport = () => {
    window.location.href = "tel:+51977431451";
  };

  const clearDataPayment = () => {
    localStorage.removeItem(APP_CONSTANS.ACTION_PAGE_NIUBIZ);
    localStorage.removeItem(APP_CONSTANS.ACCESS_TOKEN_NIUBIZ);
    localStorage.removeItem(APP_CONSTANS.PURCHASE_NUMBER_NIUBIZ);
    localStorage.removeItem(APP_CONSTANS.SESSION_TOKEN_NIUBIZ);
    localStorage.removeItem(APP_CONSTANS.AMOUNT_NIUBIZ);
  };

  const { handleGetToken } = useDataUser();

  const handleOpenModalPay = (step: number) => {
    const user = handleGetToken();
    if (user.token) {
      if (step == 1) {
        clearDataPayment();
      }
      dispatch(updateStatusStepPayment(0));
      dispatch(updateValuePlanPay(step));
      dispatch(updateStatusModalPayment(true));
    } else {
      if (step != 0) {
        dispatch(updateTemporalAction(ETemporalActions.OPEN_PAYMENT));
      }
      dispatch(updateStatusModalLogin(true));
    }
  };

  return (
    <>
      <HeaderSearch
        title="Planes"
        handleSetData={handleSetData}
        handleKeyUp={handleKeyUp}
      />
      <WrapperPlansPage>
        <WrapperPlans>
          <SectionMax>
            <CustomTitle title="Selecciona el plan que mejor se adapte a tus necesidades" />
          </SectionMax>
          <SectionMax>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
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
                  action={handleCallSupport}
                  customStyle={`width: fit-content; padding: 10px 30px; margin: 0;`}
                />
              </Grid>
              <Grid
                item
                xs={12}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {QueriePhone && (
                  <Plans
                    basicAction={() => handleOpenModalPay(0)}
                    mediumAction={() => handleOpenModalPay(1)}
                    premiumAction={() => handleOpenModalPay(2)}
                  />
                )}
                {!QueriePhone && (
                  <PlansMobile
                    basicAction={() => handleOpenModalPay(0)}
                    mediumAction={() => handleOpenModalPay(1)}
                    premiumAction={() => handleOpenModalPay(2)}
                  />
                )}
              </Grid>
            </Grid>
          </SectionMax>
        </WrapperPlans>
      </WrapperPlansPage>
    </>
  );
};

export default PlansPage;
