import React from "react";
import styled from "styled-components";
import CustomTitle from "../../../components/custom-title/custom-title";
import { listPopularSearch } from "../../../config/mocks/list-popular-search";
import { customPalette } from "../../../config/theme/theme";
import { Typography } from "@mui/material";
import SectionMax from "../../../components/section-max/section-max";
import BookImg from "../../../assets//img/book_icon.png";

const WrapperPopularSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 18px;
  column-gap: 18px;
  position: relative;
`;
const ItemPopular = styled.div`
  border: 1px solid ${customPalette.secondaryColor};
  width: fit-content;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
`;
const WrapperBookImg = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 280px;
  margin-left: -100px;
  margin-bottom: -100px;
  opacity: 0.2;
`;

const SectionPopularSearch: React.FC = () => {
  return (
    <WrapperPopularSearch>
      <WrapperBookImg src={BookImg} />
      <CustomTitle title="Búsquedas populares" />
      <SectionMax>
        <WrapperPopularSearch>
          {listPopularSearch.map((search) => (
            <ItemPopular key={Date.now()}>
              <Typography variant="body1" component="span" textAlign={"center"}>
                {search.name}
              </Typography>
            </ItemPopular>
          ))}
        </WrapperPopularSearch>
      </SectionMax>
    </WrapperPopularSearch>
  );
};

export default SectionPopularSearch;
