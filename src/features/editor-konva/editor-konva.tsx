import React from "react";
import { Stage, Layer } from "react-konva";
import styled from "styled-components";
import LayerEditor from "./components/layer-editor/layer-editor";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addItemKonva,
  changeActivePanelEditor,
  deleteObjectKonva,
  getActiveComponentKonvaID,
  getCanvasHeight,
  getCanvasWidth,
  getConfigStageZoom,
  getCurrentStylesTextArea,
  getGlobalCoord,
  getListComponentsKonva,
  getOldPropertiesTextEditing,
  getStatusApplication,
  getStatusCursorCanva,
  unselectObjectKonva,
  updateActiveIDKonva,
  updateActiveMenuOption,
  updateComponentKonva,
  updateOldTextEditing,
  updateStageZoom,
} from "../../core/store/konva-editor/konva-editorSlice";
import MenuOptions from "./components/menu-options/menu-options";
import SelectedOptions from "./components/selected-options/selected-options";
import ZoomOptions from "./components/alternative-options/zoom-options";
import GlobalItemKonva, {
  KonvaTypeItem,
} from "./components/global-item-konva/global-item-konva";
import OpenAIOptions from "./components/openai-options/openai-options";
import { Html } from "react-konva-utils";
import ModalImageKonva from "../editor/components/modal-image-konva/modal-image-konva";
import MenuBarOptions from "./components/menu-bar-options/menu-bar-options";
import downloadAnimation from "../../assets/json/download_animation.json";
import Lottie from "lottie-react";
import BottomNavigationPanel from "./components/bottom-navigation-panel/bottom-navigation-panel";

const WrapperPage = styled.div`
  position: relative;
  background-color: #e5e5f7;
  background-image: linear-gradient(#ffffff 1px, transparent 1px),
    linear-gradient(to right, #ffffff 1px, #e9eaed 1px);
  background-size: 20px 20px;
  overflow-y: hidden;
  overflow-x: hidden;

  * {
    box-sizing: border-box;
    font-family: Inter;
    font-weight: 400;
  }
`;

const MainStage = styled(Stage)<{ cursorStyle: number }>`
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  cursor: ${(p) => (p.cursorStyle == 1 ? "cursor" : "grab")};

  > canvas {
    display: block;
  }
`;
const GlobalTextArea = styled.textarea<{
  styleWidth: number;
  styleHeight: number;
  currentTextFontSize: number;
  currentTextFontFamily: string;
  currentTextColor: string;
  currentTextAlign: string;
}>`
  background: transparent;
  border: 0;
  outline: none;
  resize: unset;
  height: ${(p) => p.styleHeight + 5}px;
  width: ${(p) => p.styleWidth + 5}px;
  font-size: ${(p) => p.currentTextFontSize}px;
  color: ${(p) => p.currentTextColor};
  font-family: ${(p) => p.currentTextFontFamily};
  text-align: ${(p) => p.currentTextAlign};
`;
const BackdropDownload = styled.div`
  position: absolute;
  background: #00000061;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
const LottieContainer = styled.div`
  margin: auto;
  backdrop-filter: blur(30px);
  height: fit-content;
  width: fit-content;
  background: white;
  border-radius: 20px;
  position: relative;
  padding: 30px 15px 0;

  > p {
    position: absolute;
    text-align: center;
    z-index: 2;
    top 0;
    font-size: 14px;
  }
  ::after {
    content: "";
    position: absolute;
    background: rgb(252, 74, 65);
    background: linear-gradient(
      90deg,
      rgba(252, 74, 65, 20%) 0%,
      rgba(56, 62, 71, 20%) 100%
    );
    width: 80px;
    height: 80px;
    top: -30px;
    left: -30px;
    border-radius: 50%;
    backdrop-filter: blur(30px);
  }
  ::before {
    content: "";
    position: absolute;
    background: rgb(163, 254, 172);
    background: linear-gradient(
      90deg,
      rgba(163, 254, 172, 20%) 0%,
      rgba(111, 164, 242, 20%) 100%
    );
    width: 80px;
    height: 80px;
    bottom: -30px;
    right: -30px;
    border-radius: 50%;
    backdrop-filter: blur(30px);
  }
`;
const WrapperKeyPress = styled.div`
  position: relative;
`;
export interface ComponentKonvaItem {
  id: string;
  type: KonvaTypeItem;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  text?: string;
  fontSize?: number;
  align?: string;
  image?: string;
  component: any;
  color?: string;
  stroke?: string;
  customFill?: string;
  customFontSize?: number;
  customAlign?: string;
  customFamily?: string;
  sizeStroke?: number;
}
const EditorKonva: React.FC = () => {
  const canvasWidth = useAppSelector(getCanvasWidth);
  const canvasHeight = useAppSelector(getCanvasHeight);
  const listItemsKonva = useAppSelector(getListComponentsKonva);
  const activekonvaItem = useAppSelector(getActiveComponentKonvaID);
  const globalCoord = useAppSelector(getGlobalCoord);
  const valueZoom = useAppSelector(getConfigStageZoom);
  const textAreaStyles = useAppSelector(getCurrentStylesTextArea);
  const oldPropertiesText = useAppSelector(getOldPropertiesTextEditing);
  const statusApplication = useAppSelector(getStatusApplication);
  const statusCursorCanva = useAppSelector(getStatusCursorCanva);
  const dispatch = useAppDispatch();

  const layerRef = React.useRef<any>();
  const canvaRef = React.useRef<HTMLCanvasElement>();

  const handleWheel = (e: any) => {
    e.evt.preventDefault();

    const scaleBy = 1.02;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    dispatch(
      updateStageZoom({
        scale: newScale,
        x:
          (stage.getPointerPosition().x / newScale - mousePointTo.x) * newScale,
        y:
          (stage.getPointerPosition().y / newScale - mousePointTo.y) * newScale,
      })
    );
  };
  const handleReadKeyDown = (e: any) => {
    if (activekonvaItem != "" && (e.keyCode == 8 || e.keyCode == 46)) {
      dispatch(deleteObjectKonva());
    }
  };

  return (
    <WrapperPage>
      <MenuBarOptions canvaGlobalRef={canvaRef} layerGlobalRef={layerRef} />
      <WrapperKeyPress tabIndex={1} onKeyDown={handleReadKeyDown}>
        <MainStage
          ref={canvaRef}
          width={canvasWidth}
          height={canvasHeight}
          onWheel={handleWheel}
          scaleX={valueZoom.scale}
          scaleY={valueZoom.scale}
          x={valueZoom.x}
          y={valueZoom.y}
          draggable={statusCursorCanva == 2}
          onMouseDown={(e: any) => {
            dispatch(updateActiveMenuOption(0));
            dispatch(changeActivePanelEditor(true));
            const clickedOnEmpty = e.target === e.target.getStage();
            clickedOnEmpty && dispatch(updateActiveIDKonva(""));
          }}
          cursorStyle={statusCursorCanva}
        >
          <LayerEditor refLayer={layerRef}>
            {listItemsKonva.map((item) => {
              return (
                <GlobalItemKonva
                  id={item.id}
                  key={item.id}
                  type={item.type}
                  initialX={item.x}
                  initialY={item.y}
                  initialWidth={item.width}
                  initialHeight={item.height}
                  initialFill={item.fill}
                  initialText={item.text || ""}
                  initialImage={item.image || ""}
                  color={item.color || ""}
                  stroke={item.stroke || ""}
                  sizeStroke={item.sizeStroke || 0}
                  customFill={item.customFill || "black"}
                  customFontSize={item.customFontSize || 14}
                  customAlign={item.customAlign || "left"}
                  customFamily={item.customFamily || "arial"}
                  canvaRef={canvaRef}
                  isSelected={item.id == activekonvaItem}
                  onSelect={() => dispatch(updateActiveIDKonva(item.id))}
                  onChange={(newAttrs: ComponentKonvaItem) => {
                    dispatch(
                      updateComponentKonva({
                        id: activekonvaItem,
                        x: newAttrs.x,
                        y: newAttrs.y,
                        width: newAttrs.width,
                        height: newAttrs.height,
                        fill: newAttrs.fill,
                        text: newAttrs.text,
                      } as ComponentKonvaItem)
                    );
                  }}
                />
              );
            })}
          </LayerEditor>
          <Layer>
            <Html
              groupProps={{
                x: globalCoord.x,
                y: globalCoord.y,
                width: globalCoord.width,
                height: globalCoord.height,
              }}
              divProps={{ style: { opacity: 1 } }}
            >
              <GlobalTextArea
                id="global-text-editor"
                onBlur={() => {
                  // Add new component
                  const activeID = Date.now();
                  const textArea: HTMLTextAreaElement | any =
                    document.getElementById("global-text-editor")!;
                  dispatch(
                    addItemKonva({
                      id: `text${activeID}`,
                      type: KonvaTypeItem.TEXT,
                      text: textArea.value,
                      x: oldPropertiesText.x,
                      y: oldPropertiesText.y,
                      height: oldPropertiesText.height,
                      width: oldPropertiesText.width,
                      fill: oldPropertiesText.customFill,
                      customFill: oldPropertiesText.customFill,
                      customFontSize: oldPropertiesText.customFontSize,
                      customAlign: oldPropertiesText.customAlign,
                      customFamily: oldPropertiesText.customFamily,
                    } as ComponentKonvaItem)
                  );
                  dispatch(updateActiveIDKonva(`text${activeID}`));
                  dispatch(updateOldTextEditing());
                }}
                styleWidth={globalCoord.width}
                styleHeight={globalCoord.height}
                currentTextFontSize={textAreaStyles.currentTextFontSize}
                currentTextFontFamily={textAreaStyles.currentTextFontFamily}
                currentTextColor={textAreaStyles.currentTextColor}
                currentTextAlign={textAreaStyles.currentTextAlign}
              />
            </Html>
          </Layer>
        </MainStage>
        <MenuOptions canvaGlobalRef={canvaRef} layerGlobalRef={layerRef} />
        <ZoomOptions canvaGlobalRef={canvaRef} layerGlobalRef={layerRef} />
        <OpenAIOptions canvaGlobalRef={canvaRef} layerGlobalRef={layerRef} />
      </WrapperKeyPress>
      <BottomNavigationPanel
        canvaGlobalRef={canvaRef}
        layerGlobalRef={layerRef}
      />
      {/* <SelectedOptions /> */}
      <ModalImageKonva />
      {statusApplication && (
        <BackdropDownload>
          <LottieContainer>
            <p>Un momento, estamos configurando la descarga</p>
            <Lottie animationData={downloadAnimation} loop={true} />
          </LottieContainer>
        </BackdropDownload>
      )}
    </WrapperPage>
  );
};

export default EditorKonva;
