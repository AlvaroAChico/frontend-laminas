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
import { breakpoints } from "../../../../constants/breakpoints";

const ContainerMenu = styled.div`
  background: #001c46;
  width: 30%;
  height: 100%;
  transition: 0.5s;
  display: flex;
  flex-direction: row;

  ${breakpoints.tabletL} {
    width: 40%;
  }
  ${breakpoints.tabletS} {
    width: 40%;
  }
  ${breakpoints.phoneL} {
    width: 0%;
  }
`;
const ContainerOptionsMenu = styled.div`
  width: fit-content;
  padding: 10px 0 10px 10px;
  ${breakpoints.phoneL} {
    width: 0%;
    display: none;
  }
`;
const ContainerBodyOptions = styled.div<{ isActive: boolean }>`
  width: 100%;
  background: #ffffff;
  padding: 10px;
  display: ${(p) => (p.isActive ? "block" : "none")};

  ${breakpoints.phoneL} {
    width: 0%;
    display: none;
  }
`;
const ItemMenu = styled.div<{ isActive: boolean }>`
  padding: 8px;
  text-align: center;
  cursor: pointer;
  background: ${(p) => (p.isActive ? "#ffffff" : "#001c46")};
  color: ${(p) => (p.isActive ? "#fc4a41" : "white")};
  border-radius: 10px 0 0 10px;

  > div svg {
    max-width: 40px;
  }
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
const ButtonAddText = styled.button`
  background-image: linear-gradient(to right, #fc4464, #fc4c3c, #fc4c2c);
  padding: 10px;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;
const ContainerSearch = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerInputSearchStyle = styled.input`
  outline: none;
  border: 0;
  padding: 8px;
  border: 0.5px solid #03a9f4;
  border-radius: 8px;
  width: 100%;
  margin: 8px;
`;

const MenuEditor: React.FC = () => {
  const [statusOption, setStatusOption] = React.useState(3);
  const [initialSearch, setInitialSearch] = React.useState("");
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
    };
    dispatch(addTextBase(newText));
  };
  const handleChangeText = (value: string) => setInitialSearch(value);
  return (
    <ContainerMenu>
      <ContainerOptionsMenu>
        {/* <ItemMenu onClick={handleOption(1)} isActive={statusOption == 1}>
          <div>
            <ImageEdit />
          </div>
          <span>General</span>
        </ItemMenu> */}
        <ItemMenu onClick={handleOption(3)} isActive={statusOption == 3}>
          <div>
            <CardImage />
          </div>
          <span>Láminas</span>
        </ItemMenu>
        <ItemMenu onClick={handleOption(2)} isActive={statusOption == 2}>
          <div>
            <Text />
          </div>
          <span>Texto</span>
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
        <ButtonAddText onClick={handleAddText()}>Agregar texto</ButtonAddText>
      </ContainerBodyOptions>
      <ContainerBodyOptions isActive={statusOption == 3}>
        <ContainerSearch>
          <ContainerInputSearchStyle
            type="text"
            placeholder="Buscar lámina"
            defaultValue={initialSearch}
            onChange={(e: any) => handleChangeText(e.target.value)}
          />
        </ContainerSearch>
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
