import React from "react";
import styled from "styled-components";
import { Grid, Typography } from "@mui/material";
import SectionMax from "../section-max/section-max";
import { customPalette } from "../../config/theme/theme";

const WrapperTitle = styled(Grid)`
  width: 100%;
  padding: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

interface IOwnProps {
  title: string;
  primaryAction?: any;
}

const CustomTitle: React.FC<IOwnProps> = ({ title, primaryAction = null }) => {
  return (
    <>
      <SectionMax>
        <WrapperTitle container justifyContent={"space-between"}>
          <Grid xs={12} sm={8} md={primaryAction != null ? 9 : 12}>
            <Typography
              variant="h5"
              component="h5"
              color={customPalette.primaryColor}
              fontWeight={600}
            >
              {title}
            </Typography>
          </Grid>
          {!!primaryAction && (
            <Grid xs={12} sm={4} md={3}>
              {primaryAction}
            </Grid>
          )}
        </WrapperTitle>
      </SectionMax>
    </>
  );
};

export default CustomTitle;
