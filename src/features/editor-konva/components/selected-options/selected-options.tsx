import React from "react";
import styled from "styled-components";
import { customPalette } from "../../../../config/theme/theme";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  deleteObjectKonva,
  getActiveComponentKonvaID,
  updateAlignRichText,
  updateCutImageText,
  updateSizeRichText,
  updateVisilibityImageEdit,
} from "../../../../core/store/konva-editor/konva-editorSlice";
import { TextAlignLeft } from "@styled-icons/fluentui-system-filled/TextAlignLeft";
import { TextAlignCenter } from "@styled-icons/fluentui-system-filled/TextAlignCenter";
import { TextAlignJustify } from "@styled-icons/fluentui-system-filled/TextAlignJustify";
import { TextAlignRight } from "@styled-icons/fluentui-system-filled/TextAlignRight";
import { ColorPalette } from "@styled-icons/evaicons-solid/ColorPalette";
import { StrokeWidth } from "@styled-icons/zondicons/StrokeWidth";
import ColorPaletteMenu from "./color-palette-menu/color-palette-menu";
import StrokePaletteMenu from "./stroke-palette-menu/stroke-palette-menu";
import { Cut } from "@styled-icons/ionicons-sharp/Cut";
import { updateFamilyRichText } from "../../../../core/store/konva-editor/konva-editorSlice";
import { updateColorRichText } from "../../../../core/store/konva-editor/konva-editorSlice";
import { Trash } from "@styled-icons/fa-solid/Trash";

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
  padding: 2px 6px;
  cursor: pointer;
  position: relative;

  > svg {
    width: 100%;
    max-width: 15px;
  }
`;

const WrapperOptionsText = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  padding: 8px;

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
    padding: 4px;
    border-radius: 10px;
    width: 100%;
    outline: none;
    border: 0.5px solid #b4b4b4;
  }
`;
const WrapperOptionsImage = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
`;
const WrapperOptionsFigure = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
`;

const WrapperAlign = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 6px;
`;

const ContainerAlign = styled.div<{ isActive: boolean }>`
  background: ${(p) => (p.isActive ? "#b4ffbd" : "#f5f9ff")};
  border: 0.5px solid #b4b4b4;
  border-radius: 4px;
  padding: 2px 5px;
  cursor: pointer;

  svg {
    width: 15px;
    color: black;
  }
`;
const CustomTrash = styled(Trash)`
  color: #f22b2b;
  border-radius: 8px;
  width: 20px;
  height: 20px;
  margin: auto;
  margin-left: 6px;
  cursor: pointer;
`;

const SelectedOptions: React.FC = () => {
  const activeComponent = useAppSelector(getActiveComponentKonvaID);
  const [statusSubMenuColor, setStatusSubMenuColor] = React.useState(false);
  const [statusSubMenuStroke, setStatusSubMenuStroke] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleColorPaletteClick = () => {
    setStatusSubMenuStroke(false);
    setStatusSubMenuColor(!statusSubMenuColor);
  };
  const handleStrokePaletteClick = () => {
    setStatusSubMenuColor(false);
    setStatusSubMenuStroke(!statusSubMenuStroke);
  };

  const handleCutImage = () => {
    dispatch(updateCutImageText());
    dispatch(updateVisilibityImageEdit());
  };

  const handleChangeColor = (color: string) => {
    dispatch(updateColorRichText(color));
  };

  const handleChangeFamilyText = (family: string) => {
    dispatch(updateFamilyRichText(family));
  };
  const handleChangeAlignText = (align: string) => {
    dispatch(updateAlignRichText(align));
  };

  const handleDeleteCurrentObject = () => dispatch(deleteObjectKonva());

  return (
    <WrapperMenu>
      {activeComponent.includes("text") && (
        <WrapperOptionsText>
          <ItemMenu>
            <input
              type="color"
              onInput={(e: any) => handleChangeColor(e.target.value)}
            />
          </ItemMenu>
          <ItemMenu>
            <input
              type="range"
              min="6"
              max="80"
              step="1"
              onChange={(e: any) =>
                dispatch(updateSizeRichText(e!.target.value))
              }
            />
          </ItemMenu>
          <ItemMenu>
            <WrapperAlign>
              <ContainerAlign
                isActive={false}
                onClick={() => handleChangeAlignText("left")}
              >
                <TextAlignLeft />
              </ContainerAlign>
              <ContainerAlign
                isActive={false}
                onClick={() => handleChangeAlignText("center")}
              >
                <TextAlignCenter />
              </ContainerAlign>
              <ContainerAlign
                isActive={false}
                onClick={() => handleChangeAlignText("justify")}
              >
                <TextAlignJustify />
              </ContainerAlign>
              <ContainerAlign
                isActive={false}
                onClick={() => handleChangeAlignText("right")}
              >
                <TextAlignRight />
              </ContainerAlign>
            </WrapperAlign>
          </ItemMenu>
          <ItemMenu>
            <select
              onChange={(e: any) => handleChangeFamilyText(e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Arial Black">Arial Black</option>
              <option value="Verdana">Verdana</option>
              <option value="Tahoma">Tahoma</option>
              <option value="Trebuchet MS">Trebuchet MS</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
              <option value="American Typewriter">American Typewriter</option>
              <option value="Andale Mono">Andale Mono</option>
              <option value="Courier">Courier</option>
              <option value="Lucida Console">Lucida Console</option>
              <option value="Monaco">Monaco</option>
              <option value="Bradley Hand">Bradley Hand</option>
              <option value="Brush Script MT">Brush Script MT</option>
              <option value="Luminari">Luminari</option>
              <option value="Comic Sans MS">Comic Sans MS</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Cambria">Cambria</option>
            </select>
          </ItemMenu>
          <CustomTrash onClick={handleDeleteCurrentObject} />
        </WrapperOptionsText>
      )}
      {activeComponent.includes("image") && (
        <WrapperOptionsImage>
          <ItemMenu onClick={handleCutImage}>
            <Cut />
          </ItemMenu>
          <CustomTrash onClick={handleDeleteCurrentObject} />
        </WrapperOptionsImage>
      )}
      {(activeComponent.includes("circle") ||
        activeComponent.includes("triangle") ||
        activeComponent.includes("rect")) && (
        <WrapperOptionsFigure>
          <ItemMenu>
            <ColorPalette onClick={handleColorPaletteClick} />
            <ColorPaletteMenu status={statusSubMenuColor} />
          </ItemMenu>
          <ItemMenu>
            <StrokeWidth onClick={handleStrokePaletteClick} />
            <StrokePaletteMenu status={statusSubMenuStroke} />
          </ItemMenu>
          <CustomTrash onClick={handleDeleteCurrentObject} />
        </WrapperOptionsFigure>
      )}
    </WrapperMenu>
  );
};

export default SelectedOptions;
