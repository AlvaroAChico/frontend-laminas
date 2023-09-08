import React from "react";
import styled from "styled-components";
import CustomTitle from "../../../components/custom-title/custom-title";
import { customPalette } from "../../../config/theme/theme";
import { Typography } from "@mui/material";
import SectionMax from "../../../components/section-max/section-max";
import BookImg from "../../../assets//img/book_icon.png";
import { useGetPopularSheetsQuery } from "../../../core/store/sheets/sheetsAPI";
import SectionPopularSearchSkeleton from "./skeleton/section-popular-search-skeleton";
import { useAppDispatch } from "../../../app/hooks";
import { updateCurrentSearchWord } from "../../../core/store/sheets/sheetsSlice";
import { useNavigate } from "react-router-dom";

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
  const { data, isLoading } = useGetPopularSheetsQuery("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSearchPopular = (word: string) => {
    dispatch(updateCurrentSearchWord(word));
    navigate("/laminas");
  };

  return (
    <WrapperPopularSearch>
      <WrapperBookImg src={BookImg} />
      <SectionMax>
        <CustomTitle title="Búsquedas populares" />
      </SectionMax>
      <SectionMax>
        <WrapperPopularSearch>
          {(data || []).map((search) => (
            <ItemPopular
              key={Date.now()}
              onClick={() => handleSearchPopular(search.name)}
            >
              <Typography variant="body1" component="span" textAlign={"center"}>
                {search.name}
              </Typography>
            </ItemPopular>
          ))}
          {isLoading && <SectionPopularSearchSkeleton />}
        </WrapperPopularSearch>
      </SectionMax>
    </WrapperPopularSearch>
  );
};

export default SectionPopularSearch;
