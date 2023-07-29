import React from "react";
import styled from "styled-components";
import { Search } from "@styled-icons/evaicons-solid/Search";
import { customPalette } from "../../config/theme/theme";

const WrapperSearch = styled.div<{ customStyle: string }>`
  background: #fff;
  box-shadow: 0px 6px 20px 10px rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12.5px);
  position: relative;
  border-radius: 30px;

  > input {
    width: 100%;
    height: 100%;
    padding: 16px 25px;
    outline: none;
    border-radius: inherit;
    border: none;
  }

  ${p => p.customStyle}
`;

const WrappeSearch = styled.div`
  position: absolute;
  background: ${customPalette.secondaryColor};
  top: 0;
  bottom: 0;
  right: 0;
  border-radius: inherit;
  display: grid;
  place-items: center;
  padding: 20px;
  cursor: pointer;

  > svg {
    width: 100%;
    max-width: 25px;
    color: white;
  }
`;

interface IOwnProps {
  placeHolder?: string;
  action?: any;
  customStyle?: string;
}

const SearchLamina: React.FC<IOwnProps> = ({
  placeHolder = "Buscar imágenes o láminas",
  action,
  customStyle = ""
}) => {
  return (
    <WrapperSearch customStyle={customStyle}>
      <input type="text" placeholder={placeHolder} />
      <WrappeSearch>
        <Search />
      </WrappeSearch>
    </WrapperSearch>
  );
};

export default SearchLamina;
