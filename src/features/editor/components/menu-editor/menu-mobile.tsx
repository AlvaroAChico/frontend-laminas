import React from "react";
import styled from "styled-components";
import { CardImage } from "@styled-icons/bootstrap/CardImage";
import { Text } from "@styled-icons/remix-editor/Text";
import { listMockLaminas } from "./data-mock/data-mock";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  addImageBase,
  addTextBase,
  changeStatusMobileMenu,
  getStatusMobileMenu,
} from "../../../../core/store/editor/editorSlice";
import { TextBaseProps } from "../editor/components/text-base/text-base";
import { ImageBaseProps } from "../editor/components/image-base/image-base";

const ContainerBackdrop = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  background: #00000085;
  width: ${(p) => (p.active ? "100%" : "0%")};
  height: 100%;
  z-index: 12;
  transition: 0.5s;
`;

const ContainerMenuMobile = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  background: #fd6e67;
  width: ${(p) => (p.active ? "80%" : "0%")};
  height: 100%;
  z-index: 15;
  display: ${(p) => (p.active ? "block" : "none")};
`;

const ContainerMenu = styled.div`
  background: #001c46;
  width: 100%;
  height: 100%;
  transition: 0.5s;
  display: flex;
  flex-direction: row;
`;
const ContainerOptionsMenu = styled.div<{ active: boolean }>`
  width: ${(p) => (p.active ? "fit-content" : "0%")};
  padding: 10px 0 10px 10px;
`;
const ContainerBodyOptions = styled.div<{
  isActive: boolean;
  activeMobile: boolean;
}>`
  width: ${(p) => (p.activeMobile ? "100%" : "0%")};
  background: #ffffff;
  padding: 10px;
  display: ${(p) => (p.isActive ? "block" : "none")};
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

const ContainerClose = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  background: red;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: ${(p) => (p.active ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  color: white;
  right: -10%;
  cursor: pointer;
`;

const MenuMobile: React.FC = () => {
  const [statusOption, setStatusOption] = React.useState(3);
  const [initialSearch, setInitialSearch] = React.useState("");
  const handleOption = (option: number) => () => setStatusOption(option);
  const statusMenuMobile = useAppSelector(getStatusMobileMenu);
  const dispatch = useAppDispatch();

  const handleAddText = () => () => {
    const newText: TextBaseProps = {
      id: Date.now(),
    };
    dispatch(addTextBase(newText));
  };

  const handleSelectImage = (image: string) => () => {
    const newImage: ImageBaseProps = {
      id: Date.now(),
      image: image,
    };
    dispatch(addImageBase(newImage));
  };

  const handleChangeText = (value: string) => setInitialSearch(value);

  const handleCloseMenuMobile = () => dispatch(changeStatusMobileMenu());

  return (
    <ContainerBackdrop active={statusMenuMobile}>
      <ContainerMenuMobile active={statusMenuMobile}>
        <ContainerClose
          onClick={handleCloseMenuMobile}
          active={statusMenuMobile}
        >
          x
        </ContainerClose>
        <ContainerMenu>
          <ContainerOptionsMenu active={statusMenuMobile}>
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
          <ContainerBodyOptions
            isActive={statusOption == 2}
            activeMobile={statusMenuMobile}
          >
            <ButtonAddText onClick={handleAddText()}>
              Agregar texto
            </ButtonAddText>
          </ContainerBodyOptions>
          <ContainerBodyOptions
            isActive={statusOption == 3}
            activeMobile={statusMenuMobile}
          >
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
                <img
                  src={lamina.image}
                  onClick={handleSelectImage(lamina.image)}
                />
              </ContainerLamina>
            ))}
          </ContainerBodyOptions>
        </ContainerMenu>
      </ContainerMenuMobile>
    </ContainerBackdrop>
  );
};

export default MenuMobile;
