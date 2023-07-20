import React from "react";
import styled from "styled-components";
import { breakpoints } from "../../constants/breakpoints";

const WrapperSectionMax = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  position: relative;
`;

const MaxWidthSection = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 10px 20px;

  ${breakpoints.laptop} {
    padding: 20px 30px;
  }
`;

interface IOwnProps {
  children: any;
}
const SectionMax: React.FC<IOwnProps> = ({ children }) => {
  return (
    <WrapperSectionMax>
      <MaxWidthSection>{children}</MaxWidthSection>
    </WrapperSectionMax>
  );
};

export default SectionMax;
