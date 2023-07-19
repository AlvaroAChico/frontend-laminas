import React, { ComponentElement } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { customPalette } from "../../config/theme/theme";

const CustomButtonStyle = styled.button<{
  bgColor: string;
  txtColor: string;
  borderColor: string;
  customStyle: string;
}>`
  border: 1px solid ${(p) => p.borderColor};
  background: ${(p) => p.bgColor};
  color: ${(p) => p.txtColor};
  padding: 6px 10px;
  border-radius: 20px;
  width: 100%;
  cursor: pointer;
  display: flex;
  column-gap: 6px;
  justify-content: center;
  align-items: center;

  > svg {
    width: 100%;
    max-width: 20px;
  }

  ${(p) => p.customStyle}
`;
const CustomButtonStyleLink = styled(Link)``;

interface IColorsButton {
  borderColor: string;
  backgroundColor: string;
  textColor: string;
}

interface IOwnProps {
  title: string;
  to?: string;
  link?: string;
  Icon?: React.ComponentType<any>;
  style: "PRIMARY" | "SECONDARY";
  borderStyle: "NONE" | "OUTLINE";
  loading?: boolean;
  action?: () => void;
  customStyle?: string;
}

const CustomButtom: React.FC<IOwnProps> = ({
  title,
  to = "",
  link = "",
  Icon,
  style = "PRIMARY",
  loading = false,
  borderStyle = "NONE",
  customStyle = "",
  action,
}) => {
  const [listColors, setListColors] = React.useState<IColorsButton>({
    backgroundColor: "",
    borderColor: "",
    textColor: "",
  });

  React.useEffect(() => {
    if (style == "PRIMARY") {
      setListColors({
        backgroundColor: customPalette.primaryColor,
        borderColor: customPalette.primaryColor,
        textColor: "white",
      });
    }
    if (style == "SECONDARY") {
      setListColors({
        backgroundColor: customPalette.secondaryColor,
        borderColor: customPalette.secondaryColor,
        textColor: "white",
      });
    }
    if (borderStyle == "OUTLINE") {
      setListColors({
        backgroundColor: "transparent",
        borderColor:
          style == "PRIMARY"
            ? customPalette.primaryColor
            : customPalette.secondaryColor,
        textColor:
          style == "PRIMARY"
            ? customPalette.primaryColor
            : customPalette.secondaryColor,
      });
    }
  }, [style, borderStyle]);

  if (action != null) {
    return (
      <CustomButtonStyle
        bgColor={listColors.backgroundColor}
        txtColor={listColors.textColor}
        borderColor={listColors.borderColor}
        customStyle={customStyle}
      >
        {title}
        {!!Icon && <Icon />}
      </CustomButtonStyle>
    );
  }

  if (to != "") {
    return <CustomButtonStyleLink to={to}>{title}</CustomButtonStyleLink>;
  }

  return null;
};

export default CustomButtom;
