import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  addItemKonva,
  changeActivePanelEditor,
  getActiveGlobalSheet,
  getSizeGlobalSheet,
  getStatusPanelEditor,
  updateActiveIDKonva,
} from "../../../../core/store/konva-editor/konva-editorSlice";
import ArturitoIMG from "../../../../assets/img/arturito-openai.png";
import { usePostIAForAppMutation } from "../../../../core/store/editor/editorAPI";
import { customPalette } from "../../../../config/theme/theme";
import { KonvaTypeItem } from "../global-item-konva/global-item-konva";
import { ComponentKonvaItem } from "../../editor-konva";
import { breakpoints } from "../../../../constants/breakpoints";

const WrapperOptions = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 15px;

  ${breakpoints.tabletS} {
    bottom: 5px;
    right: 5px;
  }
`;
const ContainerButton = styled.div`
  cursor: pointer;
  border: none;
  outline: none;
  border-radius: 50%;

  > img {
    width: 100%;
    max-width: 80px;
  }
`;

const MainBoxArturito = styled.div`
  position: absolute;
  background: ${customPalette.primaryColor};
  border-radius: 20px;
  padding: 10px;
  bottom: 60px;
  left: -300px;
  right: 60px;

  ${breakpoints.tabletS} {
    left: -210px;
    bottom: 90px;
    right: 10px;
  }
`;
const BodyCardArturito = styled.div`
  width: 100%;
  height: 100%;
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
const WrapperDivider = styled.div`
  border: 1px solid #e4e4e4;
  width: 100%;
`;
const LoadingArturito = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 10px;

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
  width: 100%;
  text-align: center;
  background: ${customPalette.secondaryColor};
  color: white;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
`;
interface IOwnProps {
  canvaGlobalRef: any;
  layerGlobalRef: any;
}
const OpenAIOptions: React.FC<IOwnProps> = ({
  canvaGlobalRef,
  layerGlobalRef,
}) => {
  const [initialQuestion, setInitialQuestion] = React.useState("");
  const [statusOpenIA, setStatusOpenIA] = React.useState(false);
  const statusPanelEditor = useAppSelector(getStatusPanelEditor);
  const dispatch = useAppDispatch();

  const handleChangeText = (value: string) => setInitialQuestion(value);

  const handleKeyUp = (e: any) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      // console.log("KeyUp Arturito", initialQuestion);
      handleQuestionArturito(initialQuestion);
    }
  };

  // La pregunta "Quien gano el miss peru ?" se enseña en peru ?
  const [postIAForApp, responseOpenAi] = usePostIAForAppMutation();

  const handleQuestionArturito = (text: string) => {
    postIAForApp(text);
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
  const handleShowOpenIA = () => {
    setStatusOpenIA(!statusOpenIA);
    dispatch(changeActivePanelEditor(false));
  };
  return (
    <WrapperOptions>
      <ContainerButton onClick={handleShowOpenIA}>
        <img src={ArturitoIMG} />
      </ContainerButton>
      {statusOpenIA && !statusPanelEditor ? (
        <MainBoxArturito>
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
            </LoadingArturito>
            <WrapperResponseIA>
              {responseOpenAi.data != null &&
                responseOpenAi.data!.choices.length > 0 && (
                  <>{responseOpenAi.data!.choices[0].text}</>
                )}
            </WrapperResponseIA>
            <ButtonAddResponse
              onClick={() =>
                handleAddText(responseOpenAi.data!.choices[0].text)
              }
            >
              Agregar al editor
            </ButtonAddResponse>
          </BodyCardArturito>
        </MainBoxArturito>
      ) : null}
    </WrapperOptions>
  );
};

export default OpenAIOptions;
