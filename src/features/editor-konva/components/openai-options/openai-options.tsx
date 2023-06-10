import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../../app/hooks";
import {
  getActiveGlobalSheet,
  getSizeGlobalSheet,
} from "../../../../core/store/konva-editor/konva-editorSlice";
import ArturitoIMG from "../../../../assets/img/arturito-openai.png";

const WrapperOptions = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 15px;
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

interface IOwnProps {
  canvaGlobalRef: any;
  layerGlobalRef: any;
}
const OpenAIOptions: React.FC<IOwnProps> = ({
  canvaGlobalRef,
  layerGlobalRef,
}) => {
  const sizeGlobalSheet = useAppSelector(getSizeGlobalSheet);
  const activeSheet = useAppSelector(getActiveGlobalSheet);

  return (
    <WrapperOptions>
      <ContainerButton onClick={() => console.log}>
        <img src={ArturitoIMG} />
      </ContainerButton>
    </WrapperOptions>
  );
};

export default OpenAIOptions;
