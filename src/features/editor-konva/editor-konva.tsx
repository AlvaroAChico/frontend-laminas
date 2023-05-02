import React from "react";
import { Stage, Layer } from "react-konva";
import styled from "styled-components";
import LayerEditor from "./components/layer-editor/layer-editor";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getActiveComponentKonvaID,
  getCanvasHeight,
  getCanvasWidth,
  getListComponentsKonva,
  updateActiveIDKonva,
  updateActiveMenuOption,
  updateComponentKonva,
} from "../../core/store/konva-editor/konva-editorSlice";
import MenuOptions from "./components/menu-options/menu-options";
import SelectedOptions from "./components/selected-options/selected-options";
import AlternativeOptions from "./components/alternative-options/alternative-options";
import GlobalItemKonva, {
  KonvaTypeItem,
} from "./components/global-item-konva/global-item-konva";

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

export interface ComponentKonvaItem {
  id: string;
  type: KonvaTypeItem;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  component: any;
}
const EditorKonva: React.FC = () => {
  const canvasWidth = useAppSelector(getCanvasWidth);
  const canvasHeight = useAppSelector(getCanvasHeight);
  const listItemsKonva = useAppSelector(getListComponentsKonva);
  const activekonvaItem = useAppSelector(getActiveComponentKonvaID);
  const dispatch = useAppDispatch();

  const layerRef = React.useRef<any>();
  const canvaRef = React.useRef<HTMLCanvasElement>();

  return (
    <WrapperPage>
      <MainStage
        ref={canvaRef}
        width={canvasWidth}
        height={canvasHeight}
        onMouseDown={(e: any) => {
          dispatch(updateActiveMenuOption(0));
          const clickedOnEmpty = e.target === e.target.getStage();
          clickedOnEmpty ?? dispatch(updateActiveIDKonva(""));
        }}
      >
        <LayerEditor refLayer={layerRef} />
        {listItemsKonva.map((item) => (
          <Layer key={item.id}>
            <GlobalItemKonva
              id={item.id}
              type={item.type}
              initialX={item.x}
              initialY={item.y}
              initialWidth={item.width}
              initialHeight={item.height}
              initialFill={item.fill}
              canvaRef={canvaRef}
              isSelected={item.id == activekonvaItem}
              onSelect={() => {
                console.log("item.id", item.id);
                dispatch(updateActiveIDKonva(item.id));
              }}
              onChange={(newAttrs: ComponentKonvaItem) => {
                dispatch(
                  updateComponentKonva({
                    id: activekonvaItem,
                    x: newAttrs.x,
                    y: newAttrs.y,
                    width: newAttrs.width,
                    height: newAttrs.height,
                    fill: newAttrs.fill,
                  } as ComponentKonvaItem)
                );
              }}
            />
          </Layer>
        ))}
      </MainStage>
      <MenuOptions canvaGlobalRef={canvaRef} layerGlobalRef={layerRef} />
      <SelectedOptions />
      <AlternativeOptions canvaGlobalRef={canvaRef} layerGlobalRef={layerRef} />
    </WrapperPage>
  );
};

export default EditorKonva;
