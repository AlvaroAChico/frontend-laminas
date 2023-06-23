import React from "react";
import styled from "styled-components";
import { customPalette } from "../../../../../config/theme/theme";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import {
  getCurrentPropertiesKonva,
  getStatusPanelEditor,
  updateColorFillFigure,
} from "../../../../../core/store/konva-editor/konva-editorSlice";

const WrapperColorOption = styled.div<{ status: boolean }>`
  position: absolute;
  top: 40px;
  border-radius: 15px;
  background: #f5f9ff;
  box-shadow: 0px 4px 15px 6px rgba(98, 98, 98, 0.25);
  width: fit-content;
  min-width: 150px;
  padding: 8px 10px;
  z-index: 1;

  > div:nth-child(2) {
    color: white;
    background: ${customPalette.errorColor};
    width: 100%;
    border-radius: 20px;
    margin: 8px 0 5px;
    padding: 4px;
    cursor: pointer;
  }

  ${(p) => (p.status ? "" : "display: none;")}
`;

const ItemMenu = styled.div`
  input[type="color"] {
    -webkit-appearance: none;
    border-radius: 6px;
    border: none;
    width: 35px;
    height: 22px;
  }
  input[type="color"]::-webkit-color-swatch-wrapper {
    border-radius: 6px;
    padding: 0;
  }
  input[type="color"]::-webkit-color-swatch {
    border-radius: 6px;
    border: none;
  }
  select {
    margin-left: 5px;
    padding: 2px;
    border-radius: 10px;
    width: 100%;
    outline: none;
    border: 0.5px solid #b4b4b4;
  }
`;
const WrapperOptionStrokeColor = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: cemter;
  row-gap: 5px;
  padding: 4px;

  > p {
    margin: 0;
  }
`;
interface IOwnProps {
  status: boolean;
}
const ColorPaletteMenu: React.FC<IOwnProps> = ({ status }) => {
  const currentPropertiesKonva = useAppSelector(getCurrentPropertiesKonva);
  const statusPanelEditor = useAppSelector(getStatusPanelEditor);
  const dispatch = useAppDispatch();

  const handleChangeColor = (color: string) => {
    dispatch(updateColorFillFigure(color));
  };

  if (statusPanelEditor) return null;

  return (
    <WrapperColorOption status={status}>
      <WrapperOptionStrokeColor>
        <p>Color</p>
        <div>
          <ItemMenu>
            <input
              type="color"
              defaultValue={currentPropertiesKonva.color || "black"}
              onInput={(e: any) => handleChangeColor(e.target.value)}
            />
          </ItemMenu>
        </div>
      </WrapperOptionStrokeColor>
      <div onClick={() => handleChangeColor("transparent")}>Quitar color</div>
    </WrapperColorOption>
  );
};

export default ColorPaletteMenu;
