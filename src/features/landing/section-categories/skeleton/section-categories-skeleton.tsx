import { Skeleton } from "@mui/material";
import React from "react";
import styled from "styled-components";

const ContainerSkeleton = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
`;

const SectionCategoriesSkeleton: React.FC = () => {
  return (
    <ContainerSkeleton>
      <Skeleton
        variant="rounded"
        width={"320px"}
        height={"250px"}
        sx={{ borderRadius: "25px" }}
      />
      <Skeleton
        variant="rounded"
        width={"320px"}
        height={"250px"}
        sx={{ borderRadius: "25px" }}
      />
      <Skeleton
        variant="rounded"
        width={"320px"}
        height={"250px"}
        sx={{ borderRadius: "25px" }}
      />
    </ContainerSkeleton>
  );
};

export default SectionCategoriesSkeleton;
