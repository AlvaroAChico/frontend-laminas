import React from "react";
import styled from "styled-components";
import { Cut } from "@styled-icons/ionicons-solid/Cut";
import { Resize100Percent } from "@styled-icons/entypo/Resize100Percent";
import { RotateRight } from "@styled-icons/boxicons-regular/RotateRight";
import { ImageEdit } from "@styled-icons/fluentui-system-regular/ImageEdit";
import { Text } from "@styled-icons/remix-editor/Text";
import { CardImage } from "@styled-icons/bootstrap/CardImage";
import { listMockLaminas } from "./data-mock/data-mock";

import ImageBase, {
  ImageBaseProps,
} from "../editor/components/image-base/image-base";
import { useAppDispatch } from "../../../../app/hooks";
import {
  addImageBase,
  addTextBase,
} from "../../../../core/store/editor/editorSlice";
import { TextBaseProps } from "../editor/components/text-base/text-base";

const ContainerMenu = styled.div`
  background: green;
  width: 30%;
  height: 100%;
  transition: 0.5s;
  display: flex;
  flex-direction: row;
`;
const ContainerOptionsMenu = styled.div`
  width: fit-content;
  padding: 10px;
`;
const ItemMenu = styled.div<{ isActive: boolean }>`
  padding: 6px;
  text-align: center;
  cursor: pointer;
  background: ${(p) => (p.isActive ? "yellow" : "orange")};

  > div svg {
    max-width: 40px;
  }
`;
const ContainerBodyOptions = styled.div<{ isActive: boolean }>`
  width: 100%;
  background: blue;
  padding: 10px;
  display: ${(p) => (p.isActive ? "block" : "none")};
`;
const ContainerGeneralItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left
  align-items: center;
  background: white;
  padding: 5px;
  cursor: pointer;
  transition: .5s;

  :hover{
    background: red;
  }

  > div svg {
    max-width: 35px;
    width: 100%;
  }
  > span{
    font-size: 20px;
    font-weight: regular;
    margin: auto;
  }
`;

const ContainerLamina = styled.div`
  width: 100%;
  text-align: center;
  padding: 8px;
  box-sizing: border-box;

  > img {
    max-width 100px;
    width: 100%;
    cursor: pointer;
    transition: .5s;

    :hover{
      transform: scale(1.05);
    }
  }
`;

const MenuEditor: React.FC = () => {
  const [statusOption, setStatusOption] = React.useState(3);
  const handleOption = (option: number) => () => setStatusOption(option);
  const dispatch = useAppDispatch();

  const handleSelectImage = (image: string) => () => {
    const newImage: ImageBaseProps = {
      id: Date.now(),
      image: image,
    };
    dispatch(addImageBase(newImage));
  };

  const handleAddText = () => () => {
    const newText: TextBaseProps = {
      id: Date.now(),
      text: "prueba",
    };
    dispatch(addTextBase(newText));
  };
  return (
    <ContainerMenu>
      <ContainerOptionsMenu>
        <ItemMenu onClick={handleOption(1)} isActive={statusOption == 1}>
          <div>
            <ImageEdit />
          </div>
          <span>General</span>
        </ItemMenu>
        <ItemMenu onClick={handleOption(2)} isActive={statusOption == 2}>
          <div>
            <Text />
          </div>
          <span>Texto</span>
        </ItemMenu>
        <ItemMenu onClick={handleOption(3)} isActive={statusOption == 3}>
          <div>
            <CardImage />
          </div>
          <span>Láminas</span>
        </ItemMenu>
      </ContainerOptionsMenu>
      <ContainerBodyOptions isActive={statusOption == 1}>
        <ContainerGeneralItem>
          <div>
            <Cut />
          </div>
          <span>Cortar</span>
        </ContainerGeneralItem>
        <ContainerGeneralItem>
          <div>
            <Resize100Percent />
          </div>
          <span>Rotar</span>
        </ContainerGeneralItem>
        <ContainerGeneralItem>
          <div>
            <RotateRight />
          </div>
          <span>Resize</span>
        </ContainerGeneralItem>
      </ContainerBodyOptions>
      <ContainerBodyOptions isActive={statusOption == 2}>
        <button onClick={handleAddText()}>Agregar texto</button>
      </ContainerBodyOptions>
      <ContainerBodyOptions isActive={statusOption == 3}>
        {listMockLaminas.map((lamina) => (
          <ContainerLamina key={lamina.id}>
            <img src={lamina.image} onClick={handleSelectImage(lamina.image)} />
          </ContainerLamina>
        ))}
      </ContainerBodyOptions>
    </ContainerMenu>
  );
};

export default MenuEditor;
