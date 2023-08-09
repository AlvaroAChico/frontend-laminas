import React from "react";
import styled from "styled-components";
import { Grid, Typography } from "@mui/material";
import { customPalette } from "../../config/theme/theme";

const WrapperTitle = styled(Grid)`
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

interface IOwnProps {
  title: string;
  primaryAction?: any;
}

const CustomTitle: React.FC<IOwnProps> = ({ title, primaryAction = null }) => {
  return (
    <>
      <WrapperTitle container justifyContent={"space-between"}>
        <Grid item xs={12} sm={8} md={primaryAction != null ? 9 : 12}>
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
          <Grid item xs={12} sm={4} md={3}>
            {primaryAction}
          </Grid>
        )}
      </WrapperTitle>
    </>
  );
};

export default CustomTitle;
