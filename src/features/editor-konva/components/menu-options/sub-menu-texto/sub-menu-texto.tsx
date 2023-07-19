import React, { MutableRefObject } from "react";
import { InfoOutline } from "@styled-icons/evaicons-outline/InfoOutline";
import styled from "styled-components";
import { customPalette } from "../../../../../config/theme/theme";
import { TextAlignLeft } from "@styled-icons/fluentui-system-filled/TextAlignLeft";
import { TextAlignCenter } from "@styled-icons/fluentui-system-filled/TextAlignCenter";
import { TextAlignJustify } from "@styled-icons/fluentui-system-filled/TextAlignJustify";
import { TextAlignRight } from "@styled-icons/fluentui-system-filled/TextAlignRight";
import { useAppDispatch } from "../../../../../app/hooks";
import {
  addItemKonva,
  updateActiveIDKonva,
} from "../../../../../core/store/konva-editor/konva-editorSlice";
import { KonvaTypeItem } from "../../global-item-konva/global-item-konva";
import { ComponentKonvaItem } from "../../../editor-konva";
import ArturitoIMG from "../../../../../assets/img/arturito-openai.png";
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline/ArrowIosForwardOutline";
import { usePostIAForAppMutation } from "../../../../../core/store/editor/editorAPI";

const WrapperMenuTexto = styled.div<{ isVisible: boolean }>`
  background: ${customPalette.grayLightColor};
  box-shadow: 0px 4px 15px 6px rgba(98, 98, 98, 0.25);
  position: absolute;
  width: fit-content;
  min-width: 350px;
  max-width: 600px;
  border-radius: 15px;
  left: 120%;
  top: 0;
  padding: 10px;
  z-index: 1;
  cursor: auto;
  ${(p) => (p.isVisible ? "" : `display: none; width: 0; height: 0;`)};
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
const IconInfo = styled(InfoOutline)`
  position: absolute;
  width: 15px;
  top: 0;
  right: 12px;
  color: black;
`;
const BodyCardTexto = styled.div`
  background: white;
  border-radius: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-around;
  padding: 10px;
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
const WrapperDivider = styled.div`
  border: 1px solid #e4e4e4;
  width: 100%;
`;

const ArturitoAdsWrapper = styled.div`
  background: white;
  border: 0.2px solid #0066ff;
  box-shadow: 0px 2px 6px 2px rgba(213, 207, 207, 0.25);
  border-radius: 10px;
  width: 100%;
  padding: 8px;
  display: flex;
  flex-warp: wrap;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    column-gap: 10px;
  }
  > div div img {
    width: 100%;
    max-width: 50px;
  }
  > div div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  > div div p:nth-child(1) {
    color: #0066ff;
    margin: 0;
    font-size: 12px;
  }
  > div div p:nth-child(2) {
    color: #5e5e5e;
    margin: 0;
    font-size: 11px;
  }
  > div:nth-child(2) svg {
    width: 20px;
  }
`;

const ButtonAddText = styled.div`
  background: ${customPalette.secondaryColor};
  color: white;
  text-align: center;
  width: 100%;
  border-radius: 8px;
  padding: 6px;
  margin-top: 10px;
  cursor: pointer;
`;
const ContainerSteps = styled.div<{ stepActive: number }>`
  color: #bdbdbd;
  border: 1px solid #f5f9ff;
  background: #f5f9ff;
  width: fit-content;
  text-align: center;
  display: flex; column-gap: 10px;
  justify-content: left;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;

  div:nth-child(${(p) => p.stepActive}) {
    padding 4px 8px;
    border-radius: 10px;
    color: #fff;
    border: 1px solid ${customPalette.secondaryColor};
    background: ${customPalette.secondaryColor};
  }
`;
interface IOwnProps {
  isVisible: boolean;
  canvaRef: MutableRefObject<HTMLCanvasElement | undefined>;
  layerRef: MutableRefObject<any>;
}
const SubMenuTexto: React.FC<IOwnProps> = ({ isVisible, layerRef }) => {
  const [initialQuestion, setInitialQuestion] = React.useState("");
  const [stepActive, setStepActive] = React.useState(1);
  const dispatch = useAppDispatch();

  const handleUpdateStep = (step: number) => () => setStepActive(step);
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
        x: layerRef.current.children[0].attrs.x,
        y: layerRef.current.children[0].attrs.y,
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
    <WrapperMenuTexto id="menuTexto" isVisible={isVisible}>
      <HeaderText>
        <ContainerSteps stepActive={stepActive}>
          <div onClick={handleUpdateStep(1)}>Texto</div>
          <div onClick={handleUpdateStep(2)}>Arturito</div>
        </ContainerSteps>
        <p>
          {stepActive == 1
            ? "Recuerda seleccionar la imagen para poder agregarla al pane de edición"
            : "Para agregar una nueva imagen haz click en el botón o arrastra una imagen hacía el recuadro"}
        </p>
        <IconInfo />
      </HeaderText>
      {stepActive == 1 && (
        <BodyCardTexto>
          <ArturitoAdsWrapper onClick={handleUpdateStep(2)}>
            <div>
              <div>
                <img src={ArturitoIMG} />
              </div>
              <div>
                <p>Necesitas ayuda con tu tarea ?</p>
                <p>Preguntale sobre tu tarea a Arturito</p>
              </div>
            </div>
            <div>
              <ArrowIosForwardOutline />
            </div>
          </ArturitoAdsWrapper>
          <ButtonAddText onClick={() => handleAddText()}>
            Agregar texto
          </ButtonAddText>
        </BodyCardTexto>
      )}
      {stepActive == 2 && (
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
              <p>Arturito no se encuentra bien, podrías consultar de nuevo ?</p>
            )}
          </LoadingArturito>
          <WrapperResponseIA>
            {responseOpenAi.data != null &&
              responseOpenAi.data!.choices.length > 0 && (
                <>{responseOpenAi.data!.choices[0].text}</>
              )}
          </WrapperResponseIA>
          <ButtonAddResponse
            onClick={() => handleAddText(responseOpenAi.data!.choices[0].text)}
          >
            Agregar al editor
          </ButtonAddResponse>
        </BodyCardArturito>
      )}
    </WrapperMenuTexto>
  );
};

export default SubMenuTexto;
