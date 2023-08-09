import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import {
  deleteObjectKonva,
  getCurrentPropertiesKonva,
  updateAlignRichText,
  updateColorRichText,
  updateFamilyRichText,
  updateSizeRichText,
} from "../../../../../core/store/konva-editor/konva-editorSlice";
import { TextAlignLeft } from "@styled-icons/fluentui-system-filled/TextAlignLeft";
import { TextAlignCenter } from "@styled-icons/fluentui-system-filled/TextAlignCenter";
import { TextAlignJustify } from "@styled-icons/fluentui-system-filled/TextAlignJustify";
import { TextAlignRight } from "@styled-icons/fluentui-system-filled/TextAlignRight";
import { Trash } from "@styled-icons/fa-solid/Trash";
import { ChevronUp } from "@styled-icons/boxicons-regular/ChevronUp";
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { breakpoints } from "../../../../../constants/breakpoints";
import { Tooltip } from "@mui/material";

const baseCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

    ${breakpoints.tabletS} {
      min-width: 100px;
    }
  }

  ${breakpoints.tabletS} {
    max-width: 160px;
    overflow: hidden;
    flex-wrap: nowrap;
    overflow-x: scroll;
  }
`;

const BoxEditSizeText = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 5px;
  justify-content: center;
  align-items: center;

  > div input {
    width: 42px;
    height: 100%;
    outline: none;
    border: none;
    padding: 5px;
    border-radius: 5px;
  }
  > div svg {
    width: 100%;
    max-width: 18px;
    width: 25px;
    height: 100%;
    color: black;
  }
`;
const WrapperArrowsText = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    background: white;
    transition: 0.2s;
    width: 30px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
      background: #919191;
    }
  }
  > div:nth-child(1) {
    border-radius: 6px 6px 0 0;
  }
  > div:nth-child(2) {
    border-radius: 0 0 6px 6px;
  }
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

  ${breakpoints.tabletS} {
    width: 40px;
  }
`;

const OptionsText: React.FC = () => {
  const currentPropertiesKonva = useAppSelector(getCurrentPropertiesKonva);
  const dispatch = useAppDispatch();

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

  const isFontFamilySelected = (fontFamily: string): boolean => {
    return currentPropertiesKonva.customFamily == fontFamily;
  };

  return (
    <WrapperOptionsText>
      <Tooltip title="Color">
        <ItemMenu>
          <input
            type="color"
            defaultValue={currentPropertiesKonva.customFill || "#ffffff"}
            onInput={(e: any) => handleChangeColor(e.target.value)}
          />
        </ItemMenu>
      </Tooltip>
      <Tooltip title="Tamaño" arrow>
        <ItemMenu>
          <BoxEditSizeText>
            <div>
              <input
                type="number"
                value={currentPropertiesKonva.customFontSize}
                onChange={(e: any) =>
                  dispatch(updateSizeRichText(e!.target.value))
                }
              />
            </div>
            <WrapperArrowsText>
              <div>
                <ChevronUp
                  onClick={() =>
                    dispatch(
                      updateSizeRichText(
                        (currentPropertiesKonva.customFontSize || 0) + 1
                      )
                    )
                  }
                />
              </div>
              <div>
                <ChevronDown
                  onClick={() =>
                    dispatch(
                      updateSizeRichText(
                        (currentPropertiesKonva.customFontSize || 1) <= 1
                          ? 1
                          : (currentPropertiesKonva.customFontSize || 1) - 1
                      )
                    )
                  }
                />
              </div>
            </WrapperArrowsText>
          </BoxEditSizeText>
        </ItemMenu>
      </Tooltip>
      <ItemMenu>
        <WrapperAlign>
          <ContainerAlign
            isActive={currentPropertiesKonva.customAlign == "left"}
            onClick={() => handleChangeAlignText("left")}
          >
            <Tooltip title="Izquierda" arrow>
              <TextAlignLeft />
            </Tooltip>
          </ContainerAlign>
          <ContainerAlign
            isActive={currentPropertiesKonva.customAlign == "center"}
            onClick={() => handleChangeAlignText("center")}
          >
            <Tooltip title="Centrado" arrow>
              <TextAlignCenter />
            </Tooltip>
          </ContainerAlign>
          <ContainerAlign
            isActive={currentPropertiesKonva.customAlign == "justify"}
            onClick={() => handleChangeAlignText("justify")}
          >
            <Tooltip title="Justificado" arrow>
              <TextAlignJustify />
            </Tooltip>
          </ContainerAlign>
          <ContainerAlign
            isActive={currentPropertiesKonva.customAlign == "right"}
            onClick={() => handleChangeAlignText("right")}
          >
            <Tooltip title="Derecha" arrow>
              <TextAlignRight />
            </Tooltip>
          </ContainerAlign>
        </WrapperAlign>
      </ItemMenu>
      <Tooltip title="Fuente" arrow>
        <ItemMenu>
          <select onChange={(e: any) => handleChangeFamilyText(e.target.value)}>
            <option selected={isFontFamilySelected("Arial")} value="Arial">
              Arial
            </option>
            <option
              selected={isFontFamilySelected("Arial Black")}
              value="Arial Black"
            >
              Arial Black
            </option>
            <option selected={isFontFamilySelected("Verdana")} value="Verdana">
              Verdana
            </option>
            <option selected={isFontFamilySelected("Tahoma")} value="Tahoma">
              Tahoma
            </option>
            <option
              selected={isFontFamilySelected("Trebuchet MS")}
              value="Trebuchet MS"
            >
              Trebuchet MS
            </option>
            <option
              selected={isFontFamilySelected("Times New Roman")}
              value="Times New Roman"
            >
              Times New Roman
            </option>
            <option selected={isFontFamilySelected("Georgia")} value="Georgia">
              Georgia
            </option>
            <option
              selected={isFontFamilySelected("American Typewriter)")}
              value="American Typewriter"
            >
              American Typewriter
            </option>
            <option
              selected={isFontFamilySelected("Andale Mono")}
              value="Andale Mono"
            >
              Andale Mono
            </option>
            <option selected={isFontFamilySelected("Courier")} value="Courier">
              Courier
            </option>
            <option
              selected={isFontFamilySelected("Lucida Console")}
              value="Lucida Console"
            >
              Lucida Console
            </option>
            <option selected={isFontFamilySelected("Monaco")} value="Monaco">
              Monaco
            </option>
            <option
              selected={isFontFamilySelected("Bradley Hand")}
              value="Bradley Hand"
            >
              Bradley Hand
            </option>
            <option
              selected={isFontFamilySelected("Brush Script MT")}
              value="Brush Script MT"
            >
              Brush Script MT
            </option>
            <option
              selected={isFontFamilySelected("Luminari")}
              value="Luminari"
            >
              Luminari
            </option>
            <option
              selected={isFontFamilySelected("Comic Sans MS")}
              value="Comic Sans MS"
            >
              Comic Sans MS
            </option>
            <option
              selected={isFontFamilySelected("Helvetica")}
              value="Helvetica"
            >
              Helvetica
            </option>
            <option selected={isFontFamilySelected("Cambria")} value="Cambria">
              Cambria
            </option>
          </select>
        </ItemMenu>
      </Tooltip>
      <div>
        <Tooltip title="Borrar" arrow>
          <CustomTrash onClick={handleDeleteCurrentObject} />
        </Tooltip>
      </div>
    </WrapperOptionsText>
  );
};

export default OptionsText;
