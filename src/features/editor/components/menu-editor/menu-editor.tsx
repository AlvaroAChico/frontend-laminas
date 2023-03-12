/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components";
import { Text } from "@styled-icons/remix-editor/Text";
import { CardImage } from "@styled-icons/bootstrap/CardImage";
import { listMockLaminas } from "./data-mock/data-mock";

import { ImageBaseProps } from "../editor/components/image-base/image-base";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  addImageBase,
  addTextBase,
  getActiveSheetPanel,
  getListImageMenu,
  updateActiveSheetPanel,
  updateAllDataLaminas,
  updateEditortext,
  updateInputColor,
  updateSizeLetterDOWN,
  updateSizeLetterUP,
  updateTypography,
} from "../../../../core/store/editor/editorSlice";
import { TextBaseProps } from "../editor/components/text-base/text-base";
import { breakpoints } from "../../../../constants/breakpoints";
import {
  LaminaDefaultProps,
  useGetListLaminasQuery,
  useGetStatusUserDownloadsQuery,
  usePostLaminasByWordMutation,
} from "../../../../core/store/editor/editorAPI";
import { ChevronUp } from "@styled-icons/bootstrap/ChevronUp";
import { ChevronDown } from "@styled-icons/bootstrap/ChevronDown";
import { Settings } from "@styled-icons/fluentui-system-filled/Settings";
import menuEditorProduction from "../../../../config/environments/production.json";
import a4IMG from "../../../../assets/img/a4.png";
import oficioIMG from "../../../../assets/img/oficio.png";
import a3IMG from "../../../../assets/img/a3.png";
import { TextLeft } from "@styled-icons/bootstrap/TextLeft";
import { TextCenter } from "@styled-icons/bootstrap/TextCenter";
import { TextRight } from "@styled-icons/bootstrap/TextRight";
import { Justify } from "@styled-icons/bootstrap/Justify";

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
  overflow: auto;
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

const ContainerTextGeneralOptions = styled.div``;

const ContainerTypography = styled.div`
  > p {
    padding: 6px;
    border-bottom: 0.5px solid #cdcdcd;
    width: 100%;
    transition: 0.5s;
    cursor: pointer;

    :hover {
      background: #f0cad3;
    }
  }
`;
const ContainerItemOption = styled.div`
  border: 0.5px solid #4949e6;
  border-radius: 4px;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: "#0020ff9e";
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  cursor: pointer;

  > svg {
    width: 15px;
    height: 15px;
  }

  > input {
    width: 13px;
    height: 13px;
    padding: 0;
    border: 0;
  }
`;
const ContainerOptionsText = styled.div`
  display: flex;
  flex-direction: row;
  jusfity-content: left;
  align-items: center;
  column-gap: 2px;
`;

const ContainerPapers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const ItemPaper = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin: 15px 10px;
  cursor: pointer;
  column-gap: 10px;
  ${(p) =>
    p.active
      ? `margin: 15px 10px;
        border: 1px solid #3dc94b;
        border-radius: 10px;
        padding: 5px;`
      : ""}

  > img {
    max-width: 60px;
  }
`;

const ContainerItem = styled.div<{ active?: boolean; customPadding?: string }>`
  border: 0.5px solid #4949e6;
  border-radius: 4px;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #6db2de61;
  color: black;
  padding: 4px;

  > svg {
    width: 12px;
  }

  > input {
    width: 13px;
    height: 13px;
    padding: 0;
    border: 0;
  }
`;

const MenuEditor: React.FC = () => {
  const [statusOption, setStatusOption] = React.useState(1);
  const [initialSearch, setInitialSearch] = React.useState("");
  const handleOption = (option: number) => () => setStatusOption(option);
  const dispatch = useAppDispatch();
  const laminas: LaminaDefaultProps[] = useAppSelector(getListImageMenu);
  const activeSheetPanel = useAppSelector(getActiveSheetPanel);

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
      inputColor: "#000000",
      sizeLetter: 10,
      typography: "Arial",
      textAlign: "left",
    };
    dispatch(addTextBase(newText));
  };
  const handleChangeText = (value: string) => setInitialSearch(value);

  const { data, isLoading } = useGetListLaminasQuery("");
  const {
    data: dataDownload,
    error: isErrorDownload,
    isLoading: isLoadingDownload,
  } = useGetStatusUserDownloadsQuery("");
  const [searchLaminaByWord, resultSearch] = usePostLaminasByWordMutation();

  React.useEffect(() => {
    dispatch(updateAllDataLaminas(data?.data || []));
  }, [data]);

  React.useEffect(() => {
    dispatch(updateAllDataLaminas(dataDownload?.data || []));
  }, [dataDownload]);

  React.useEffect(() => {
    dispatch(updateAllDataLaminas(resultSearch?.data?.data || []));
  }, [resultSearch]);

  const handleKeyUp = (e: any) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      searchLaminaByWord(initialSearch);
    }
  };

  const handleSelectNewTypography = (fontFamily: string) => () => {
    dispatch(updateTypography(fontFamily));
  };

  const handleInputColor = (e: any) => {
    dispatch(updateInputColor(e.target.value));
  };

  const handleUpClick = () => dispatch(updateSizeLetterUP());
  const handleDownClick = () => dispatch(updateSizeLetterDOWN());

  const handleSelectSheet = (selected: number) => () =>
    dispatch(updateActiveSheetPanel(selected));

  return (
    <ContainerMenu>
      <ContainerOptionsMenu>
        <ItemMenu onClick={handleOption(1)} isActive={statusOption == 1}>
          <div>
            <Settings />
          </div>
          <span>General</span>
        </ItemMenu>
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
        <ContainerPapers>
          <ItemPaper
            active={activeSheetPanel == 1}
            onClick={handleSelectSheet(1)}
          >
            <img src={a4IMG} />
            <p>Tamaño A4</p>
          </ItemPaper>
          <ItemPaper
            active={activeSheetPanel == 2}
            onClick={handleSelectSheet(2)}
          >
            <img src={oficioIMG} />
            <p>Tamaño Oficio</p>
          </ItemPaper>
          <ItemPaper
            active={activeSheetPanel == 3}
            onClick={handleSelectSheet(3)}
          >
            <img src={a3IMG} />
            <p>Tamaño A3</p>
          </ItemPaper>
        </ContainerPapers>
      </ContainerBodyOptions>
      <ContainerBodyOptions isActive={statusOption == 2}>
        <ButtonAddText onClick={handleAddText()}>Agregar texto</ButtonAddText>
        <ContainerTextGeneralOptions>
          <ContainerOptionsText>
            <ContainerItemOption>
              <input
                id="input_color_main"
                type="color"
                onInput={handleInputColor}
              />
            </ContainerItemOption>
            <ContainerItemOption onClick={handleUpClick}>
              <ChevronUp />
            </ContainerItemOption>
            <ContainerItemOption onClick={handleDownClick}>
              <ChevronDown />
            </ContainerItemOption>
            {/* ------------------------------------------------------------ */}
            <ContainerItem
              onClick={() => {
                console.log("1");
                dispatch(updateEditortext("left"));
              }}
            >
              <TextLeft />
            </ContainerItem>
            <ContainerItem
              onClick={() => {
                console.log("2");
                dispatch(updateEditortext("center"));
              }}
            >
              <TextCenter />
            </ContainerItem>
            <ContainerItem
              onClick={() => {
                console.log("3");
                dispatch(updateEditortext("right"));
              }}
            >
              <TextRight />
            </ContainerItem>
            <ContainerItem
              onClick={() => {
                console.log("4");
                dispatch(updateEditortext("justify"));
              }}
            >
              <Justify />
            </ContainerItem>
            {/* ------------------------------------------------------------ */}
          </ContainerOptionsText>
          <ContainerTypography>
            <p onClick={handleSelectNewTypography("Arial")}>Arial</p>
            <p onClick={handleSelectNewTypography("Arial Black")}>
              Arial Black
            </p>
            <p onClick={handleSelectNewTypography("Verdana")}>Verdana</p>
            <p onClick={handleSelectNewTypography("Tahoma")}>Tahoma</p>
            <p onClick={handleSelectNewTypography("Trebuchet MS")}>
              Trebuchet MS
            </p>
            <p onClick={handleSelectNewTypography("Impact")}>Impact</p>
            <p onClick={handleSelectNewTypography("Times New Roman")}>
              Times New Roman
            </p>
            <p onClick={handleSelectNewTypography("Georgia")}>Georgia</p>
            <p onClick={handleSelectNewTypography("American Typewriter")}>
              American Typewriter
            </p>
            <p onClick={handleSelectNewTypography("Andale Mono")}>
              Andale Mono
            </p>
            <p onClick={handleSelectNewTypography("Courier")}>Courier</p>
            <p onClick={handleSelectNewTypography("Lucida Console")}>
              Lucida Console
            </p>
            <p onClick={handleSelectNewTypography("Monaco")}>Monaco</p>
            <p onClick={handleSelectNewTypography("Bradley Hand")}>
              Bradley Hand
            </p>
            <p onClick={handleSelectNewTypography("Brush Script MT")}>
              Brush Script MT
            </p>
            <p onClick={handleSelectNewTypography("Luminari")}>Luminari</p>
            <p onClick={handleSelectNewTypography("Comic Sans MS")}>
              Comic Sans MS
            </p>
            <p onClick={handleSelectNewTypography("Helvetica")}>Helvetica</p>
            <p onClick={handleSelectNewTypography("Cambria")}>Cambria</p>
          </ContainerTypography>
        </ContainerTextGeneralOptions>
      </ContainerBodyOptions>
      <ContainerBodyOptions isActive={statusOption == 3}>
        <ContainerSearch>
          <ContainerInputSearchStyle
            type="text"
            placeholder="Buscar lámina"
            defaultValue={initialSearch}
            onKeyUp={handleKeyUp}
            onChange={(e: any) => handleChangeText(e.target.value)}
          />
        </ContainerSearch>
        {menuEditorProduction.app.mocks &&
          listMockLaminas.map((image) => (
            <ContainerLamina key={image.id}>
              <img src={image.image} onClick={handleSelectImage(image.image)} />
            </ContainerLamina>
          ))}
        {isLoading ? (
          <>Buscando láminas...</>
        ) : (
          (laminas || []).map((lamina) => (
            <ContainerLamina key={lamina.tbllmnanomb}>
              <img
                src={lamina.tbllmnaimgo}
                onClick={handleSelectImage(lamina.tbllmnaimgo)}
              />
            </ContainerLamina>
          ))
        )}
      </ContainerBodyOptions>
    </ContainerMenu>
  );
};

export default MenuEditor;
