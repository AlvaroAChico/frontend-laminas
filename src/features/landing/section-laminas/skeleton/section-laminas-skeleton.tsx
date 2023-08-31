import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import CardLaminaSkeleton from "../../../../components/card-lamina/card-lamina-skeleton";
import { breakpoints } from "../../../../constants/breakpoints";

const GridContainerSkeleton = styled(Grid)`
  position: relative;
  padding: 20px 6%;
  max-width: 1200px;
  margin: auto;
  place-content: space-around;

  ${breakpoints.tabletLMin} {
    padding: 20px 4%;
  }
`;

const SectionLaminasSkeleton: React.FC = () => {
  return (
    <GridContainerSkeleton container gap={2} sx={{ width: "100%" }}>
      <Grid item xs={3}>
        <CardLaminaSkeleton />
      </Grid>
      <Grid item xs={3}>
        <CardLaminaSkeleton />
      </Grid>
      <Grid item xs={3}>
        <CardLaminaSkeleton />
      </Grid>
    </GridContainerSkeleton>
  );
};

export default SectionLaminasSkeleton;
