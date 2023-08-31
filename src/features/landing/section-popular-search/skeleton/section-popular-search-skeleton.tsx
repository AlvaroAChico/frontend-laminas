import { Skeleton } from "@mui/material";
import React from "react";
import styled from "styled-components";

const ContainerSkeleton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
`;

const SectionPopularSearchSkeleton: React.FC = () => {
  return (
    <ContainerSkeleton>
      <Skeleton variant="rounded" width={"200px"} height={"45px"} />
      <Skeleton variant="rounded" width={"180px"} height={"45px"} />
      <Skeleton variant="rounded" width={"150px"} height={"45px"} />
      <Skeleton variant="rounded" width={"220px"} height={"45px"} />
      <Skeleton variant="rounded" width={"100px"} height={"45px"} />
      <Skeleton variant="rounded" width={"200px"} height={"45px"} />
      <Skeleton variant="rounded" width={"180px"} height={"45px"} />
      <Skeleton variant="rounded" width={"150px"} height={"45px"} />
      <Skeleton variant="rounded" width={"220px"} height={"45px"} />
      <Skeleton variant="rounded" width={"100px"} height={"45px"} />
      <Skeleton variant="rounded" width={"200px"} height={"45px"} />
      <Skeleton variant="rounded" width={"180px"} height={"45px"} />
      <Skeleton variant="rounded" width={"150px"} height={"45px"} />
      <Skeleton variant="rounded" width={"220px"} height={"45px"} />
      <Skeleton variant="rounded" width={"100px"} height={"45px"} />
    </ContainerSkeleton>
  );
};

export default SectionPopularSearchSkeleton;
