import React from "react";
import {
  BackdropDownload,
  GlobalTextArea,
  LottieContainer,
  MainStage,
  WrapperKeyPress,
  WrapperPage,
} from "./page-editor-styles";
import LayerEditor from "../../components/layer-editor/layer-editor";
import { useAppDispatch } from "../../../../app/hooks";

const PageEditor: React.FC = () => {
  const canvaRef = React.useRef<HTMLCanvasElement>();
  const layerRef = React.useRef<any>();
  const dispatch = useAppDispatch();

  const handleReadKeyDown = (e: any) => {
    if (activekonvaItem != "" && (e.keyCode == 8 || e.keyCode == 46)) {
      dispatch(deleteObjectKonva());
    }
  };

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
                  uuid={item.uuid || ""}
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
        <ZoomOptions canvaGlobalRef={canvaRef} layerGlobalRef={layerRef} />
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

export default PageEditor;
