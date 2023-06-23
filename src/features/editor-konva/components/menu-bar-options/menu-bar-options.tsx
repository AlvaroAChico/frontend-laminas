import React from "react";
import styled from "styled-components";
import { customPalette } from "../../../../config/theme/theme";
import {
  changeActivePanelEditor,
  changeStatusApplication,
  changeStatusCursorCanva,
  deleteObjectKonva,
  getActiveComponentKonvaID,
  getActiveGlobalSheet,
  getListComponentsKonva,
  getSizeGlobalSheet,
  getStatusCursorCanva,
  unselectObjectKonva,
  updateActiveMenuOption,
  updateCutImageText,
  updateDownActiveKonva,
  updateFullDownActiveKonva,
  updateFullUpActiveKonva,
  updateStageZoom,
  updateUpActiveKonva,
  updateVisilibityImageEdit,
} from "../../../../core/store/konva-editor/konva-editorSlice";
import jsPDF from "jspdf";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { ArrowDownload } from "@styled-icons/fluentui-system-filled/ArrowDownload";
import OptionsText from "./options-text/options-text";
import { Trash } from "@styled-icons/fa-solid/Trash";
import { ColorPalette } from "@styled-icons/evaicons-solid/ColorPalette";
import ColorPaletteMenu from "../selected-options/color-palette-menu/color-palette-menu";
import { Cut } from "@styled-icons/ionicons-sharp/Cut";
import { StrokeWidth } from "@styled-icons/zondicons/StrokeWidth";
import StrokePaletteMenu from "../selected-options/stroke-palette-menu/stroke-palette-menu";
import { Layers } from "@styled-icons/ionicons-solid/Layers";
import { ArrowheadUpOutline } from "@styled-icons/evaicons-outline/ArrowheadUpOutline";
import { ArrowheadDownOutline } from "@styled-icons/evaicons-outline/ArrowheadDownOutline";
import { ArrowIosUpward } from "@styled-icons/evaicons-solid/ArrowIosUpward";
import { ArrowIosDownward } from "@styled-icons/evaicons-solid/ArrowIosDownward";
import { Hand } from "@styled-icons/fa-solid/Hand";
import { Cursor } from "@styled-icons/fluentui-system-filled/Cursor";
import LogoElaminas from "../../../../assets/img/logo.svg";

const baseCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuBarWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
  background: #383e47;
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
const CustomTrash = styled(Trash)`
  color: #f22b2b;
  border-radius: 8px;
  width: 20px;
  height: 20px;
  margin: auto;
  margin-left: 6px;
  cursor: pointer;
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
    color: white;
  }
`;
const ItemMenuOption = styled.div`
  min-width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;

  > div:nth-child(1) img {
    width: 100px;
    margin-right: 20px;
  }
`;

const ItemGeneralMenu = styled.div`
  position: relative;
`;

const WrapperPosition = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  background: #0c7dab;
  padding: 5px 10px;
  border-radius: 20px;
  color: white;
  cursor: pointer;

  > svg {
    width: 15px;
  }
`;
const DropdownPosition = styled.div`
  position: absolute;
  top: 38px;
  left: -60%;
  right: 0;
  background: white;
  border-radius: 10px;
  z-index: 3;
  outline: none;
  border: 0;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
`;
const ItemPosition = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  width: 100%;
  padding: 8px 10px;
  cursor: pointer;
  column-gap: 6px;
  border-radius: 10px;
  transition: 0.2s;

  :hover {
    background: ${customPalette.primaryColor};
    color: white;
  }

  > svg {
    width: 15px;
  }
`;

const WrapperDownload = styled.div`
  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
    border: none;
    outline: none;
    border-radius: 15px;
    padding: 6px 15px;
    cursor: pointer;
    color: white;
    background: ${customPalette.secondaryColor};

    > svg {
      width: 15px;
    }
  }
`;
const WrapperOptionsCanva = styled.div<{ isActiveCursor: number }>`
  color: white;
  display: flex;
  column-gap: 10px;

  > div {
    border: 1px solid white;
    padding: 4px;
    border-radius: 10px;
    outine: none;
    cursor: pointer;
  }
  > div:nth-child(1) {
    background: ${(p) =>
      p.isActiveCursor == 1 ? customPalette.successColor : ""};
  }
  > div:nth-child(2) {
    background: ${(p) =>
      p.isActiveCursor == 2 ? customPalette.successColor : ""};
  }
  > div svg {
    width: 20px;
  }
`;
interface IOwnProps {
  canvaGlobalRef: any;
  layerGlobalRef: any;
}
const MenuBarOptions: React.FC<IOwnProps> = ({
  canvaGlobalRef,
  layerGlobalRef,
}) => {
  const activeComponent = useAppSelector(getActiveComponentKonvaID);
  const [statusSubMenuColor, setStatusSubMenuColor] = React.useState(false);
  const [statusSubMenuStroke, setStatusSubMenuStroke] = React.useState(false);
  const [statusMenuPosition, setStatusMenuPosition] = React.useState(false);
  const sizeGlobalSheet = useAppSelector(getSizeGlobalSheet);
  const activeSheet = useAppSelector(getActiveGlobalSheet);
  const listComponentsKonva = useAppSelector(getListComponentsKonva);
  const statusCursor = useAppSelector(getStatusCursorCanva);
  const dispatch = useAppDispatch();

  const handleResetGlobalZoom = () => {
    dispatch(
      updateStageZoom({
        scale: 1,
        x: 0,
        y: 0,
      })
    );
  };

  const handleColorPaletteClick = () => {
    dispatch(changeActivePanelEditor(false));
    setStatusSubMenuStroke(false);
    setStatusSubMenuColor(!statusSubMenuColor);
  };
  const handleStrokePaletteClick = () => {
    dispatch(changeActivePanelEditor(false));
    setStatusSubMenuColor(false);
    setStatusSubMenuStroke(!statusSubMenuStroke);
  };

  const handleCutImage = () => {
    dispatch(updateCutImageText());
    dispatch(updateVisilibityImageEdit());
  };

  const handleDeleteCurrentObject = () => dispatch(deleteObjectKonva());

  const downloadActivePanel = () => {
    dispatch(unselectObjectKonva());
    handleResetGlobalZoom();
    dispatch(updateActiveMenuOption(0));
    dispatch(changeStatusApplication(true));
    setTimeout(() => {
      if (canvaGlobalRef != null) {
        const imgToImage = document.createElement("img");
        imgToImage.src = layerGlobalRef.current!.toDataURL({
          pixelRatio: 6,
        });
        imgToImage.onload = async function () {
          const canvaCut = document.createElement("canvas");
          canvaCut.width = layerGlobalRef.current!.children[0].attrs.width * 6;
          canvaCut.height =
            layerGlobalRef.current!.children[0].attrs.height * 6;
          const ctx = canvaCut.getContext("2d")!;
          ctx.scale(6, 6);
          ctx!.drawImage(
            imgToImage,
            layerGlobalRef.current!.children[0].attrs.x * 6,
            layerGlobalRef.current!.children[0].attrs.y * 6,
            layerGlobalRef.current!.children[0].attrs.width * 6,
            layerGlobalRef.current!.children[0].attrs.height * 6,
            0,
            0,
            layerGlobalRef.current!.children[0].attrs.width,
            layerGlobalRef.current!.children[0].attrs.height
          );
          const newImage = document.createElement("img");
          newImage.src = canvaCut.toDataURL("image/png");
          // Create PDF download
          const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: sizeGlobalSheet[activeSheet - 1],
          });
          const imgWidth = sizeGlobalSheet[activeSheet - 1][0];
          const imgHeight = sizeGlobalSheet[activeSheet - 1][1];
          doc.addImage(newImage, "PNG", 0, 0, imgWidth, imgHeight);
          await doc.save("elaminas.pdf");
          dispatch(changeStatusApplication(false));
        };
      }
    }, 100);
  };
  const handleShowPosition = () => {
    setStatusMenuPosition(true);
    setTimeout(() => {
      document.getElementById("drop-menu-position")?.focus();
    }, 100);
  };

  const handleFullUpPosition = () => dispatch(updateFullUpActiveKonva());
  const handleUpPosition = () => dispatch(updateUpActiveKonva());
  const handleDownPosition = () => dispatch(updateDownActiveKonva());
  const handleFullDownPosition = () => dispatch(updateFullDownActiveKonva());

  return (
    <MenuBarWrapper>
      <ItemMenuOption>
        <div>
          <img src={LogoElaminas} />
        </div>
        {activeComponent.includes("text") && <OptionsText />}
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
      </ItemMenuOption>
      <ItemMenuOption>
        <ItemGeneralMenu>
          <WrapperOptionsCanva isActiveCursor={statusCursor}>
            <div onClick={() => dispatch(changeStatusCursorCanva(1))}>
              <Cursor />
            </div>
            <div onClick={() => dispatch(changeStatusCursorCanva(2))}>
              <Hand />
            </div>
          </WrapperOptionsCanva>
        </ItemGeneralMenu>
        <ItemGeneralMenu>
          {listComponentsKonva.length > 0 && activeComponent != "" && (
            <WrapperPosition onClick={handleShowPosition}>
              <Layers />
              Position
            </WrapperPosition>
          )}
          {statusMenuPosition && (
            <DropdownPosition
              id="drop-menu-position"
              onBlur={() => setStatusMenuPosition(false)}
              tabIndex={0}
            >
              <ItemPosition onClick={handleFullUpPosition}>
                <ArrowheadUpOutline />
                Traer Adelante
              </ItemPosition>
              <ItemPosition onClick={handleUpPosition}>
                <ArrowIosUpward />
                Adelante
              </ItemPosition>
              <ItemPosition onClick={handleDownPosition}>
                <ArrowIosDownward />
                Atras
              </ItemPosition>
              <ItemPosition onClick={handleFullDownPosition}>
                <ArrowheadDownOutline />
                Enviar Atras
              </ItemPosition>
            </DropdownPosition>
          )}
        </ItemGeneralMenu>
        <ItemGeneralMenu>
          <WrapperDownload>
            <button onClick={downloadActivePanel}>
              Descargar
              <ArrowDownload />
            </button>
          </WrapperDownload>
        </ItemGeneralMenu>
      </ItemMenuOption>
    </MenuBarWrapper>
  );
};

export default MenuBarOptions;
