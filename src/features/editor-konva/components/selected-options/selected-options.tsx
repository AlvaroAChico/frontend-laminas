import React from "react";
import styled from "styled-components";
import { customPalette } from "../../../../config/theme/theme";
import { SettingsOutline } from "@styled-icons/evaicons-outline/SettingsOutline";
import { CardImage } from "@styled-icons/bootstrap/CardImage";
import { Text } from "@styled-icons/evaicons-solid/Text";

const baseCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WrapperMenu = styled(baseCenter)`
  position: absolute;
  top: 2%;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 15px;
  background: ${customPalette.grayLightColor};
  box-shadow: 0px 4px 15px 6px rgba(98, 98, 98, 0.25);
  width: fit-content;
`;

const ItemMenu = styled(baseCenter)`
  color: black;
  border-radius: 12px;
  padding: 10px;
  cursor: pointer;

  > svg {
    width: 100%;
    max-width: 15px;
  }
`;

const SelectedOptions: React.FC = () => {
  return (
    <WrapperMenu>
      <ItemMenu>
        <SettingsOutline />
      </ItemMenu>
      <ItemMenu>
        <CardImage />
      </ItemMenu>
      <ItemMenu>
        <Text />
      </ItemMenu>
    </WrapperMenu>
  );
};

export default SelectedOptions;
