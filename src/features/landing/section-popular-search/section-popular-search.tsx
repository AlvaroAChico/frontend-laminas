import React from "react";
import styled from "styled-components";
import CustomTitle from "../../../components/custom-title/custom-title";
import { customPalette } from "../../../config/theme/theme";
import { Typography } from "@mui/material";
import SectionMax from "../../../components/section-max/section-max";
import BookImg from "../../../assets//img/book_icon.png";
import { useGetPopularSheetsQuery } from "../../../core/store/sheets/sheetsAPI";

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
  bottom: -100px;
  left: -100px;
  width: 280px;
  opacity: 0.2;
`;

const SectionPopularSearch: React.FC = () => {
  const { data } = useGetPopularSheetsQuery("");

  return (
    <WrapperPopularSearch>
      <WrapperBookImg src={BookImg} />
      <SectionMax>
        <CustomTitle title="Búsquedas populares" />
      </SectionMax>
      <SectionMax>
        <WrapperPopularSearch>
          {(data || []).map((search) => (
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
