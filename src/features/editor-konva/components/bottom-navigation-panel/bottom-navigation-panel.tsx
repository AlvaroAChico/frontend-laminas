import React from "react";
import styled from "styled-components";
import { SettingsOutline } from "@styled-icons/evaicons-outline/SettingsOutline";
import { CardImage } from "@styled-icons/bootstrap/CardImage";
import { Text } from "@styled-icons/evaicons-solid/Text";
import { Shapes } from "@styled-icons/ionicons-solid/Shapes";
import { breakpoints } from "../../../../constants/breakpoints";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { customPalette } from "../../../../config/theme/theme";
import { NavigateNext } from "@styled-icons/material-outlined/NavigateNext";
import { InfoOutline } from "@styled-icons/evaicons-outline/InfoOutline";
import { menuSizeSheet } from "../menu-options/data-menu/data-menu";
import {
  addItemKonva,
  getActiveGlobalSheet,
  updateActiveGlobalSheet,
  updateActiveIDKonva,
} from "../../../../core/store/konva-editor/konva-editorSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import SubMenuImagen from "../menu-options/sub-menu-imagen/sub-menu-imagen";
import SubMenuFiguras from "../menu-options/sub-menu-figuras/sub-menu-figuras";
import { usePostIAForAppMutation } from "../../../../core/store/openAi/openAiAPI";
import { KonvaTypeItem } from "../global-item-konva/global-item-konva";
import { ComponentKonvaItem } from "../../editor-konva";
import ArturitoIMG from "../../../../assets/img/arturito-openai.png";
import useLogger from "../../../../utils/hooks/use-logger";
import {
  EFuncionality,
  IFunctionality,
} from "../../../../core/store/auth/types/auth-types";
import useDataUser from "../../../../utils/hooks/use-data-user";
import useValidToken from "../../../../utils/hooks/use-valid-token";
import { updateStatusModalLogin } from "../../../../core/store/app-store/appSlice";

const WrapperBottomNavigation = styled.div`
  width: 100%;
  z-index: 3;

  ${breakpoints.tabletSMin} {
    display: none;
  }
`;

const BottomNavigation = styled.div`
  height: 60px;
  background: #383e47;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;
const ItemNavigation = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  display: flex;
  flex-direction: column;
  row-gap: 2px;

  > svg {
    width: 20px;
  }
  > span {
    font-size: 12px;
  }
`;
const WrapperBodySettings = styled.div<{ isImage: boolean }>`
  padding: 15px;

  ${(p) => (p.isImage ? "display: flex; justify-content: center;" : "")}
`;
const HeaderText = styled.div`
  position: relative;
  margin-bottom: 15px;

  > h3 {
    color: ${customPalette.secondaryColor};
    margin-bottom: 10px;
  }

  > p {
    margin: 0;
    color: ${customPalette.grayDarkColor};
    font-size: 13px;
  }
`;

const ItemSheet = styled.div<{ isActive: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: ${(p) => (p.isActive ? customPalette.successColor : "white")};
  border-radius: 15px;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
`;
const ImageSheet = styled.div`
  > div {
    background: ${customPalette.grayLightColor};
    border: 1px solid ${customPalette.grayDarkColor};
    border-radius: 10px;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const WrapperIcon = styled.div`
  > svg {
    width: 100%;
    max-width: 35px;
  }
`;
const IconInfo = styled(InfoOutline)`
  position: absolute;
  width: 15px;
  top: 0;
  right: 12px;
  color: black;
`;
const InfoSheet = styled.div`
  width: 100%;
  margin-left: 10px;

  > h5 {
    margin: 0;
    color: ${customPalette.grayDarkColor};
    font-weight: 500;
    margin-bottom: 5px;
  }
  > p {
    margin: 0;
    font-size: 12px;
    color: ${customPalette.grayDarkColor};
    font-weight: 200;
    margin-left: 5px;
  }
`;
const SpecialButtonText = styled.div`
  background: ${customPalette.secondaryColor};
  color: white;
  text-align: center;
  width: 100%;
  border-radius: 20px;
  padding: 12px;
  margin-top: 10px;
  cursor: pointer;
`;
const BodyCardArturito = styled.div`
  background: white;
  border-radius: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: left;
  padding: 10px;
  flex-direction: column;

  > p {
    color: #0066ff;
    font-size: 12px;
    margin: 0;
  }

  > input {
    width: 100%;
    border-radius: 12px;
    padding: 8px 15px;
    outline: none;
    border: 0.2px solid #0066ff;
  }
`;
const LoadingArturito = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
  position: relative;

  > p {
    color: #5e5e5e;
    margin: 0;
    font-size: 12px;
  }
  > img {
    width: 100%;
    max-width: 20px;
  }
`;

const WrapperResponseIA = styled.div`
  background: #ffffff;
  border: 0.2px solid #0066ff;
  border-radius: 8px;
  min-height: 100px;
  max-height: 100px;
  overflow: auto;
  color: black;
  font-size: 12px;
  padding: 8px;
`;
const ButtonAddResponse = styled.div`
  width: 100px;
  text-align: center;
  background: ${customPalette.infoColor};
  color: white;
  padding: 4px;
  border-radius: 20px;
  cursor: pointer;
  position: absolute;
  right: 0;
`;
const WrapperDivider = styled.div`
  border: 1px solid #e4e4e4;
  width: 100%;
`;
interface IOwnProps {
  canvaGlobalRef: any;
  layerGlobalRef: any;
}
const BottomNavigationPanel: React.FC<IOwnProps> = ({
  canvaGlobalRef,
  layerGlobalRef,
}) => {
  const [statusSettings, setStatusSettings] = React.useState(false);
  const [statusImage, setStatusImage] = React.useState(false);
  const [statusText, setStatusText] = React.useState(false);
  const [statusShapes, setStatusShapes] = React.useState(false);
  const [initialQuestion, setInitialQuestion] = React.useState("");
  const sheetActive = useAppSelector(getActiveGlobalSheet);
  const [funcSize, setFuncSize] = React.useState<IFunctionality>(
    {} as IFunctionality
  );
  const { existToken } = useValidToken();
  const dispatch = useAppDispatch();

  const { handleGetFuncionalities } = useDataUser();

  React.useEffect(() => {
    const listFunc = handleGetFuncionalities();
    setFuncSize(
      (listFunc || []).filter(
        (func) => func.function == EFuncionality.FUNC_DOWNLOAD_SIZE
      )[0]
    );
  }, []);

  const handleUpdateGlobalSheet = (option: number) => () =>
    dispatch(updateActiveGlobalSheet(option));

  const onDismissSettings = () => setStatusSettings(false);
  const onDismissSImage = () => setStatusImage(false);
  const onDismissText = () => setStatusText(false);
  const onDismissShapes = () => setStatusShapes(false);

  const [postIAForApp, responseOpenAi] = usePostIAForAppMutation();
  const handleQuestionArturito = (text: string) => {
    postIAForApp(text);
  };

  const handleChangeText = (value: string) => setInitialQuestion(value);

  const handleKeyUp = (e: any) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      // Logger("KeyUp Arturito", initialQuestion);
      if (existToken) {
        handleQuestionArturito(initialQuestion);
      } else {
        dispatch(updateStatusModalLogin(true));
      }
    }
  };

  const handleAddText = (text?: string) => {
    const activeID = Date.now();
    const txtComponent = document.createElement("div");
    txtComponent.innerText = text?.trim() || "Doble click para editar";
    txtComponent.style.width = "fit-content";
    txtComponent.style.maxWidth = "300px";
    txtComponent.style.height = "100%";
    document.getElementById("root")!.appendChild(txtComponent);
    const txtComponentWidth = txtComponent.clientWidth;
    const txtComponentHeight = txtComponent.clientHeight;
    const txtValue = txtComponent.innerText;
    txtComponent.style.display = "none";
    document.getElementById("root")!.removeChild(txtComponent);
    dispatch(
      addItemKonva({
        id: `text${activeID}`,
        type: KonvaTypeItem.TEXT,
        x: layerGlobalRef.current.children[0].attrs.x,
        y: layerGlobalRef.current.children[0].attrs.y,
        height: txtComponentHeight,
        width: txtComponentWidth + 10,
        fill: "black",
        customFill: "black",
        customFontSize: 14,
        customAlign: "left",
        customFamily: "arial",
        text: txtValue || "Doble click para editar",
      } as ComponentKonvaItem)
    );
    dispatch(updateActiveIDKonva(`text${activeID}`));
  };

  return (
    <WrapperBottomNavigation>
      <BottomNavigation>
        <ItemNavigation onClick={() => setStatusSettings(true)}>
          <SettingsOutline />
          <span>General</span>
        </ItemNavigation>
        <ItemNavigation onClick={() => setStatusImage(true)}>
          <CardImage />
          <span>Imagen</span>
        </ItemNavigation>
        <ItemNavigation onClick={() => setStatusText(true)}>
          <Text />
          <span>Texto</span>
        </ItemNavigation>
        <ItemNavigation onClick={() => setStatusShapes(true)}>
          <Shapes />
          <span>Figuras</span>
        </ItemNavigation>
      </BottomNavigation>
      <BottomSheet
        open={statusSettings}
        onDismiss={onDismissSettings}
        defaultSnap={({ snapPoints, lastSnap }) =>
          lastSnap ?? Math.min(...snapPoints)
        }
        snapPoints={({ maxHeight }) => [
          maxHeight - maxHeight / 5,
          maxHeight * 0.6,
        ]}
      >
        <WrapperBodySettings isImage={false}>
          <HeaderText>
            <h3>Panel General</h3>
            <p>Selecciona el tamaño de la descarga del documento</p>
            <IconInfo />
          </HeaderText>
          {funcSize &&
            funcSize.formats &&
            menuSizeSheet.map((sheet) => {
              if (funcSize.formats) {
                if ((funcSize.formats || []).includes(sheet.name)) {
                  return (
                    <ItemSheet
                      key={sheet.idActive}
                      isActive={sheet.idActive == sheetActive}
                      onClick={handleUpdateGlobalSheet(sheet.idActive)}
                    >
                      <ImageSheet>
                        <div>{sheet.name}</div>
                      </ImageSheet>
                      <InfoSheet>
                        <h5>Medidas:</h5>
                        <p>Ancho: {sheet.width}mm</p>
                        <p>Alto: {sheet.height}mm</p>
                      </InfoSheet>
                      <WrapperIcon>
                        <NavigateNext />
                      </WrapperIcon>
                    </ItemSheet>
                  );
                }
              }
              return null;
            })}
        </WrapperBodySettings>
      </BottomSheet>
      <BottomSheet
        open={statusImage}
        onDismiss={onDismissSImage}
        defaultSnap={({ snapPoints, lastSnap }) =>
          lastSnap ?? Math.min(...snapPoints)
        }
        snapPoints={({ maxHeight }) => [
          maxHeight - maxHeight / 5,
          maxHeight * 0.6,
        ]}
      >
        <WrapperBodySettings isImage={true}>
          <SubMenuImagen
            isVisible={statusImage}
            canvaRef={canvaGlobalRef}
            layerRef={layerGlobalRef}
            isMobileActive={statusImage}
          />
        </WrapperBodySettings>
      </BottomSheet>
      <BottomSheet
        open={statusText}
        onDismiss={onDismissText}
        defaultSnap={({ snapPoints, lastSnap }) =>
          lastSnap ?? Math.min(...snapPoints)
        }
        snapPoints={({ maxHeight }) => [
          maxHeight - maxHeight / 5,
          maxHeight * 0.6,
        ]}
        footer={
          <SpecialButtonText onClick={() => handleAddText("")}>
            Agregar Texto
          </SpecialButtonText>
        }
      >
        <WrapperBodySettings isImage={false}>
          <BodyCardArturito>
            <p>Pide a Arturito lo que necesites para tu tarea</p>
            <input
              placeholder="Escribe aquí"
              onKeyUp={handleKeyUp}
              onChange={(e: any) => handleChangeText(e.target.value)}
            />
            <WrapperDivider />
            <LoadingArturito>
              <img src={ArturitoIMG} />
              {responseOpenAi.isUninitialized && <p>Conversa con Arturito</p>}
              {responseOpenAi.isLoading && <p>Arturito esta pensando ...</p>}
              {responseOpenAi.isSuccess && <p>Arturito responde</p>}
              {responseOpenAi.isError && (
                <p>
                  Arturito no se encuentra bien, podrías consultar de nuevo ?
                </p>
              )}
              <ButtonAddResponse
                onClick={() => handleAddText(responseOpenAi.data!.message)}
              >
                Agregar
              </ButtonAddResponse>
            </LoadingArturito>
            <WrapperResponseIA>
              {responseOpenAi.data != null &&
                !!responseOpenAi.data!.message && (
                  <>{responseOpenAi.data!.message}</>
                )}
            </WrapperResponseIA>
          </BodyCardArturito>
        </WrapperBodySettings>
      </BottomSheet>
      <BottomSheet
        open={statusShapes}
        onDismiss={onDismissShapes}
        defaultSnap={({ snapPoints, lastSnap }) =>
          lastSnap ?? Math.min(...snapPoints)
        }
        snapPoints={({ maxHeight }) => [
          maxHeight - maxHeight / 5,
          maxHeight * 0.6,
        ]}
      >
        <WrapperBodySettings isImage={false}>
          <SubMenuFiguras
            isVisible={statusShapes}
            canvaRef={canvaGlobalRef}
            layerRef={layerGlobalRef}
            isMobileActive={statusShapes}
          />
        </WrapperBodySettings>
      </BottomSheet>
    </WrapperBottomNavigation>
  );
};

export default BottomNavigationPanel;
