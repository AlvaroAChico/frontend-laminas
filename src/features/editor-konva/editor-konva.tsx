import React from "react";
import { Layer } from "react-konva";
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
  updateActiveIDKonva,
  updateActiveMenuOption,
  updateComponentKonva,
  updateOldTextEditing,
  updateStageZoom,
} from "../../core/store/konva-editor/konva-editorSlice";
import MenuOptions from "./components/menu-options/menu-options";
import ZoomOptions from "./components/alternative-options/zoom-options";
import GlobalItemKonva, {
  KonvaTypeItem,
} from "./components/global-item-konva/global-item-konva";
import OpenAIOptions from "./components/openai-options/openai-options";
import { Html } from "react-konva-utils";
import ModalImageKonva from "./components/modal-image-konva/modal-image-konva";
import MenuBarOptions from "./components/menu-bar-options/menu-bar-options";
import downloadAnimation from "../../assets/json/download_animation.json";
import Lottie from "lottie-react";
import BottomNavigationPanel from "./components/bottom-navigation-panel/bottom-navigation-panel";
import WebFont from "webfontloader";
import useDataUser from "../../utils/hooks/use-data-user";
import { EFuncionality, IAuthMe } from "../../core/store/auth/types/auth-types";
import {
  getCurrentSheetEdit,
  getCurrentSheetEditUUID,
  updateCurrentImageAvatar,
  updateCurrentPlan,
  updateCurrentSheetEdit,
  updateStatusModalPayment,
} from "../../core/store/app-store/appSlice";
import { APP_CONSTANS } from "../../constants/app";
import { useStartValidationMeMutation } from "../../core/store/auth/authAPI";
import {
  BackdropDownload,
  GlobalTextArea,
  LottieContainer,
  MainStage,
  WrapperKeyPress,
  WrapperPage,
} from "./editor-konva-styles";
import { Box } from "@mui/material";

export interface ComponentKonvaItem {
  id: string;
  uuid: string;
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
  const currentSheetEdit = useAppSelector(getCurrentSheetEdit);
  const currentSheetEditUUID = useAppSelector(getCurrentSheetEditUUID);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const activeID = Date.now();
    const storageImage = localStorage.getItem(APP_CONSTANS.CURRENT_IMAGE_EDIT);

    if (
      (!!currentSheetEdit && currentSheetEdit != "") ||
      (!!storageImage && storageImage != "")
    ) {
      const imgAdapter = document.createElement("img");
      imgAdapter.src = currentSheetEdit || storageImage || "";
      const newHeight = (300 * imgAdapter.height) / imgAdapter.width;
      dispatch(
        addItemKonva({
          id: `image${activeID}`,
          type: KonvaTypeItem.IMAGE,
          uuid: currentSheetEditUUID,
          x: layerRef.current.children[0].attrs.x,
          y: layerRef.current.children[0].attrs.y,
          height: newHeight,
          width: 300,
          image: currentSheetEdit || storageImage,
        } as ComponentKonvaItem)
      );
      dispatch(updateActiveIDKonva(`image${activeID}`));
      dispatch(updateCurrentSheetEdit(""));
      localStorage.removeItem(APP_CONSTANS.CURRENT_IMAGE_EDIT);
    }
  }, []);

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

  const { handleGetToken, handleGetFuncionalities } = useDataUser();

  React.useEffect(() => {
    const listFunc = handleGetFuncionalities();

    const functionalities = (listFunc || []).filter(
      (func) => func.function == EFuncionality.FUNC_LIST_FONTS
    )[0];
    if (functionalities != null && functionalities.fonts != null) {
      const fonts = functionalities.fonts;
      if (fonts != null) {
        WebFont.load({
          google: {
            families: fonts,
          },
        });
      }
    } else {
      WebFont.load({
        google: {
          families: ["Arial", "Baskerville", "Calibri", "Cambria"],
        },
      });
    }
  }, []);

  const [validationMe, resultMe] = useStartValidationMeMutation();

  React.useEffect(() => {
    if (resultMe?.data as IAuthMe) {
      dispatch(updateCurrentImageAvatar(resultMe?.data?.image || ""));
      if ((resultMe.data?.totalPlans || 0) > 0) {
        dispatch(updateCurrentPlan(true));
      } else {
        dispatch(updateCurrentPlan(false));
        dispatch(updateStatusModalPayment(true));
      }
    }
  }, [resultMe.isSuccess]);

  React.useEffect(() => {
    const user = handleGetToken();
    if (user.token != null && user.token != "") {
      validationMe(user.token);
    }
  }, []);

  return (
    <>
      <MenuBarOptions canvaGlobalRef={canvaRef} layerGlobalRef={layerRef} />
      <Box>
        {/* <WrapperPage>
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
          <ModalImageKonva />
        </WrapperPage> */}
      </Box>
      <MenuOptions canvaGlobalRef={canvaRef} layerGlobalRef={layerRef} />
      <OpenAIOptions canvaGlobalRef={canvaRef} layerGlobalRef={layerRef} />
    </>
  );
};

export default EditorKonva;
