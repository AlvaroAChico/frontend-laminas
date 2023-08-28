import { Grid, Skeleton } from "@mui/material";
import React from "react";

const SubscriptionSectionSkeleton: React.FC = () => {
  return (
    <Grid
      container
      gap={1}
      boxSizing={"border-box"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid item xs={12}>
        <Skeleton variant="rounded" width={"100%"} height={30} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton variant="rounded" width={"100%"} height={40} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton variant="rounded" width={"100%"} height={40} />
      </Grid>
      <Grid item xs={2}>
        <Skeleton variant="rounded" width={"100%"} height={40} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton variant="rounded" width={"100%"} height={40} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton variant="rounded" width={"100%"} height={40} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton variant="rounded" width={"100%"} height={40} />
      </Grid>
      <Grid item xs={2}>
        <Skeleton variant="rounded" width={"100%"} height={40} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton variant="rounded" width={"100%"} height={40} />
      </Grid>
    </Grid>
  );
};

export default SubscriptionSectionSkeleton;
