import React from "react";
import { Stage, Layer, Text } from "react-konva";
import styled from "styled-components";
import LayerEditor from "./components/layer-editor/layer-editor";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getActiveComponentKonvaID,
  getCanvasHeight,
  getCanvasWidth,
  getConfigStageZoom,
  getCurrentStylesTextArea,
  getGlobalCoord,
  getListComponentsKonva,
  updateActiveIDKonva,
  updateActiveMenuOption,
  updateComponentKonva,
  updateStageZoom,
} from "../../core/store/konva-editor/konva-editorSlice";
import MenuOptions from "./components/menu-options/menu-options";
import SelectedOptions from "./components/selected-options/selected-options";
import AlternativeOptions from "./components/alternative-options/alternative-options";
import GlobalItemKonva, {
  KonvaTypeItem,
} from "./components/global-item-konva/global-item-konva";
import OpenAIOptions from "./components/openai-options/openai-options";
import { Html } from "react-konva-utils";
import ModalImageKonva from "../editor/components/modal-image-konva/modal-image-konva";

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

const MainStage = styled(Stage)`
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
  height: ${(p) => p.styleWidth}px;
  width: ${(p) => p.styleHeight}px;
  font-size: ${(p) => p.currentTextFontSize}px;
  color: ${(p) => p.currentTextColor};
  font-family: ${(p) => p.currentTextFontFamily};
  text-align: ${(p) => p.currentTextAlign};
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

  return (
    <WrapperPage>
      <MainStage
        ref={canvaRef}
        width={canvasWidth}
        height={canvasHeight}
        onWheel={handleWheel}
        scaleX={valueZoom.scale}
        scaleY={valueZoom.scale}
        x={valueZoom.x}
        y={valueZoom.y}
        onMouseDown={(e: any) => {
          dispatch(updateActiveMenuOption(0));
          const clickedOnEmpty = e.target === e.target.getStage();
          clickedOnEmpty ?? dispatch(updateActiveIDKonva(""));
        }}
      >
        <LayerEditor refLayer={layerRef} />
        {listItemsKonva.map((item) => {
          return (
            <Layer key={item.id}>
              <GlobalItemKonva
                id={item.id}
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
            </Layer>
          );
        })}
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
                console.log("Blur edit");
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
      <SelectedOptions />
      <AlternativeOptions canvaGlobalRef={canvaRef} layerGlobalRef={layerRef} />
      <OpenAIOptions canvaGlobalRef={canvaRef} layerGlobalRef={layerRef} />
      <ModalImageKonva />
    </WrapperPage>
  );
};

export default EditorKonva;
