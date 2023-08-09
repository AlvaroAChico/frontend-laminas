import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Grid, CardActions, Skeleton } from "@mui/material";
import styled from "styled-components";

const WrapperNroLamina = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  margin-bottom: 10px;

  > div:nth-child(1) {
    background: #dcba44;
    color: white;
    width: fit-content;
    display: grid;
    place-items: center;
    padding: 1px 10px;
    border-radius: 20px;
  }
  > div:nth-child(2) {
    width: 100%;
    max-width: 20px;
    color: #dcba44;
    cursor: pointer;
    transition: 0.5s;

    :hover {
      transform: scale(1.2);
    }
  }
`;

const GridViewsContainer = styled(Grid)`
  > * svg {
    width: 100%;
    max-width: 20px;
  }
`;

const CustomCardActions = styled(CardActions)`
  > div:nth-child(1) {
    width: 70%;
    transition: 0.5s;
  }
  > div:nth-child(2) {
    width: 15%;
    overflow: hidden;
    transition: 0.5s;

    > span {
      display: none;
    }

    :hover {
      width: 50%;

      > span {
        display: block;
      }
    }
  }
  > div:nth-child(3) {
    width: 15%;
    overflow: hidden;
    transition: 0.5s;

    > span {
      display: none;
    }

    :hover {
      width: 50%;

      > span {
        display: block;
      }
    }
  }
`;

const CardLaminaSkeleton: React.FC = () => {
  return (
    <>
      <Card
        sx={{
          width: "100%",
          maxWidth: 345,
          margin: "auto",
          borderRadius: "20px",
          boxSizing: "border-box",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <Skeleton variant="rounded" width={"100%"} height={150} />
        <CardContent>
          <WrapperNroLamina>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={"100%"} />
          </WrapperNroLamina>
          <Skeleton variant="text" sx={{ fontSize: "2.5rem" }} />
          <GridViewsContainer
            container
            justifyContent={"left"}
            alignItems={"center"}
            sx={{ color: "#737373" }}
            fontWeight={500}
          >
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.8rem" }}
              width={"100%"}
            />
          </GridViewsContainer>
        </CardContent>
        <CustomCardActions sx={{ width: "100%", justifyContent: "center" }}>
          <Skeleton variant="rounded" width={"60%"} height={40} />
          <Skeleton variant="rounded" width={"20%"} height={40} />
          <Skeleton variant="rounded" width={"20%"} height={40} />
        </CustomCardActions>
      </Card>
    </>
  );
};

export default CardLaminaSkeleton;
