import { Grid, Skeleton } from "@mui/material";
import React from "react";

const PaymentSkeleton: React.FC = () => {
  return (
    <Grid container gap={2}>
      <Grid item xs={12}>
        <Skeleton variant="rounded" width={"100%"} height={30} />
      </Grid>
      <Grid item xs={5}>
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={"100%"} />
      </Grid>
      <Grid item xs={6}>
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={"100%"} />
      </Grid>
      <Grid item xs={5}>
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={"100%"} />
      </Grid>
      <Grid item xs={6}>
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={"100%"} />
      </Grid>
      <Grid item xs={5}>
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={"100%"} />
      </Grid>
      <Grid item xs={6}>
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={"100%"} />
      </Grid>
      <Grid item xs={5}>
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={"100%"} />
      </Grid>
      <Grid item xs={6}>
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={"100%"} />
      </Grid>
    </Grid>
  );
};

export default PaymentSkeleton;
