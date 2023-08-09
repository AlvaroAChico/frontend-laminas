import React from "react";
import { Typography } from "@mui/material";
import SectionMax from "../../components/section-max/section-max";
import SearchLamina from "../../components/search-lamina/search-lamina";
import styled from "styled-components";

const HeaderSearchContainer = styled.div`
  background: linear-gradient(
    90deg,
    #fc4a41 0%,
    #fc4a41 0.01%,
    rgba(252, 74, 65, 0.89) 100%
  );
  position: relative;
  height: 100%;
  min-height: 500px;
  display: grid;
  place-items: center;
  padding-bottom: 50px;
`;
const CustomShapeDivider = styled.div`
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;

  > svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 110px;
    transform: rotateY(180deg);

    > path {
      fill: white;
    }
  }
`;

interface IOwnProps {
  title: string;
  placeHolder?: string;
  isLoading?: boolean;
  handleSetData?: (value: any) => void;
  handleKeyUp?: () => void;
}

const HeaderSearch: React.FC<IOwnProps> = ({
  title,
  placeHolder,
  isLoading = false,
  handleSetData,
  handleKeyUp,
}) => {
  return (
    <HeaderSearchContainer>
      <SectionMax>
        <Typography
          variant={"h2"}
          component={"h2"}
          fontWeight={600}
          color={"white"}
          marginBottom={3}
        >
          {title}
        </Typography>
        <SearchLamina
          placeHolder={placeHolder}
          handleSetData={handleSetData}
          handleKeyUp={handleKeyUp}
          isLoading={isLoading}
        />
      </SectionMax>
      <CustomShapeDivider>
        <svg
          data-name="Layer 1"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
      </CustomShapeDivider>
    </HeaderSearchContainer>
  );
};

export default HeaderSearch;
