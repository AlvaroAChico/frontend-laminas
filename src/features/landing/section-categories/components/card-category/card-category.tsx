import React from "react";
import styled from "styled-components";
import { Box, Skeleton, Typography } from "@mui/material";

const CardCategoryBackground = styled.div<{ cardImage: string }>`
  box-shadow: 0px 6px 10px 2px rgba(0, 0, 0, 0.25);
  background-image: url(${(p) => p.cardImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  border-radius: 20px;
  min-height: 200px;
  cursor: pointer;
`;

const OverlayCategory = styled.div`
  background-color: rgb(0 0 0 / 60%);
  border-radius: 20px;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
  top: 0;
  left: 0;
`;
const CategoryBody = styled(Box)`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 2;
  left: 0;
  top: 0;
  display: grid;
  place-items: center;
  padding: 10px;
`;

interface IOwnProps {
  id?: number;
  name: string;
  image: string;
}

const CardCategory: React.FC<IOwnProps> = ({ name, image }) => {
  const [loadImage, setLoadImage] = React.useState(false);
  const img = document.createElement("img");
  img.onload = () => setLoadImage(true);
  img.src = image;

  return (
    <>
      {loadImage && (
        <CardCategoryBackground cardImage={image}>
          <OverlayCategory />
          <CategoryBody justifyContent="center" alignItems="center">
            <Typography
              textAlign={"center"}
              fontWeight={600}
              component={"h5"}
              variant={"h5"}
              color="white"
            >
              {name}
            </Typography>
          </CategoryBody>
        </CardCategoryBackground>
      )}
      {!loadImage && (
        <Skeleton
          variant="rounded"
          width={"320px"}
          height={"250px"}
          sx={{ borderRadius: "25px" }}
        />
      )}
    </>
  );
};

export default CardCategory;
