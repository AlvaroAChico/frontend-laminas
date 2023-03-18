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
  getDataCurrentImage,
  getListImageMenu,
  getSizeLetterText,
  updateActiveSheetPanel,
  updateAllDataLaminas,
  updateDataCurrentImage,
  updateEditortext,
  updateInputColor,
  updateMoreLaminas,
  updateSizeLetterText,
  updateTypography,
} from "../../../../core/store/editor/editorSlice";
import { TextBaseProps } from "../editor/components/text-base/text-base";
import { breakpoints } from "../../../../constants/breakpoints";
import {
  LaminaDefaultProps,
  useGetListLaminasMutation,
  useGetVerifyPlanQuery,
  usePostLaminasByWordMutation,
  usePostLaminasPerPageMutation,
} from "../../../../core/store/editor/editorAPI";
import { Settings } from "@styled-icons/fluentui-system-filled/Settings";
import menuEditorProduction from "../../../../config/environments/production.json";
import a4IMG from "../../../../assets/img/a4.png";
import oficioIMG from "../../../../assets/img/oficio.png";
import a3IMG from "../../../../assets/img/a3.png";
import { TextLeft } from "@styled-icons/bootstrap/TextLeft";
import { TextCenter } from "@styled-icons/bootstrap/TextCenter";
import { TextRight } from "@styled-icons/bootstrap/TextRight";
import { Justify } from "@styled-icons/bootstrap/Justify";
import { CaretBack } from "@styled-icons/ionicons-sharp/CaretBack";
import productionJSON from "../../../../config/environments/production.json";

const ContainerMenu = styled.div`
  background: #001c46;
  width: 110px;
  height: 100%;
  transition: 0.5s;
  display: flex;
  flex-direction: row;

  ${breakpoints.tabletL} {
    width: 110px;
  }
  ${breakpoints.tabletS} {
    width: 110px;
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
  width: fit-content;
  max-width: 500px;
  height: fit-content;
  max-height: 500px;
  background: #ffffff;
  padding: 15px;
  overflow: auto;
  display: ${(p) => (p.isActive ? "block" : "none")};
  visibility: ${(p) => (p.isActive ? "inherit" : "hidden")};
  position: absolute;
  top: 0;
  left: 110px;
  z-index: 1;
  margin-top: 20px;
  border: 1px solid #c5c5c5;
  border-radius: 10px;
  box-shadow: 0px 4px 10px 4px #bcbcbc82;

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
  border-radius: 10px;

  > div svg {
    max-width: 40px;
  }
`;
const ItemMenuBack = styled.div<{ isActive: boolean }>`
  padding: 8px;
  text-align: center;
  cursor: pointer;
  background: white;
  color: #fc4a41;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 70px;
  height: 70px;
  margin: auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  > div svg {
    width: 100%;
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

  ${breakpoints.phoneLMin}{
    width: 100%;
  }
  ${breakpoints.tabletSMin}{
    width: 45%;
  }
  ${breakpoints.tabletLMin}{
    width: 30%;
  }
`;
const ButtonAddText = styled.button`
  background-image: linear-gradient(to right, #fc4464, #fc4c3c, #fc4c2c);
  padding: 10px;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
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
  justify-content: space-between;
  align-items: center;
  background: "#0020ff9e";
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  cursor: pointer;
  padding: 5px 10px;
  column-gap: 10px;

  > div svg {
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
  justify-content: space-between;
  align-items: center;
  column-gap: 2px;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
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

const ContainerListLaminas = styled.div`
  display: flex;
  padding: 10px;
  text-align: center;
  color: #e76161;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: inherit;
`;

const ContainerTitle = styled.div`
  > h3 {
    color: #fc4a41;
  }
  > p {
    font-size: 13px;
  }
`;
const AlertNullResult = styled.div`
  padding: 10px;
  text-align: center;
  color: #e76161;
  margin-top: 10px;
`;

const WrapperMoreResults = styled.div`
  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    background-image: linear-gradient(to right, #fc4464, #fc4c3c, #fc4c2c);
    border: 2px solid #fff;
    color: #fff;
    padding: 10px 20px;
    border-radius: 30px;
    box-shadow: 0px 4px 6px 5px #ff7f956b;
    cursor: pointer;

    > svg {
      width: 15px;
    }
  }
`;
const ContainerInputRangeText = styled.input`
  width: 100% !important;
  height: auto;
`;

const ContainerItemOptionTextRange = styled(ContainerItemOption)`
  > p {
    width: 40%;
  }
`;
const ContainerSelectTypography = styled.select`
  padding: 8px;
  border-radius: 10px;
  width: 100%;
  margin-top: 20px;
  outline: none;
  border: 1px solid #acacac;
  margin-bottom: 20px;
`;

const MenuEditor: React.FC = () => {
  const [statusOption, setStatusOption] = React.useState(1);
  const [initialSearch, setInitialSearch] = React.useState("");
  const dispatch = useAppDispatch();
  const laminas: LaminaDefaultProps[] = useAppSelector(getListImageMenu);
  const activeSheetPanel = useAppSelector(getActiveSheetPanel);
  const currentDataImage = useAppSelector(getDataCurrentImage);
  const sizeLetter = useAppSelector(getSizeLetterText);

  const handleOption = (option: number) => () => {
    if (option == statusOption) {
      setStatusOption(0);
    } else {
      setStatusOption(option);
    }
  };

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

  const { data, isError, isLoading, isSuccess } = useGetVerifyPlanQuery("");
  const [getStatusPlan, statusResponsePlan] = useGetListLaminasMutation();

  React.useEffect(() => {
    if (!isLoading && productionJSON.app.blocked) {
      if (isError) {
        window.location.href = "https://elaminas.com";
      }
      if (isSuccess) {
        getStatusPlan("");
      }
    }
  }, [isLoading, isError, data, isSuccess]);

  const [searchLaminaByWord, resultSearch] = usePostLaminasByWordMutation();
  const [searchLaminasPerPage, resultPerPage] = usePostLaminasPerPageMutation();

  const handleMoreResults = () =>
    searchLaminasPerPage((currentDataImage?.currentPage || 0) + 1);

  React.useEffect(() => {
    if (!statusResponsePlan.isLoading) {
      if (isSuccess) {
        dispatch(updateAllDataLaminas(statusResponsePlan.data!.data || []));
        dispatch(updateDataCurrentImage(statusResponsePlan.data!));
      }
    }
  }, [statusResponsePlan]);

  React.useEffect(() => {
    dispatch(updateAllDataLaminas(resultSearch?.data?.data || []));
    dispatch(updateDataCurrentImage(resultSearch!.data!));
  }, [resultSearch]);

  React.useEffect(() => {
    dispatch(updateMoreLaminas(resultPerPage?.data?.data || []));
    dispatch(updateDataCurrentImage(resultPerPage!.data!));
  }, [resultPerPage]);

  const handleKeyUp = (e: any) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      searchLaminaByWord({ word: initialSearch });
    }
  };

  const handleInputColor = (e: any) => {
    dispatch(updateInputColor(e.target.value));
  };

  const handleChangeSizeLetter = (e: any) => {
    dispatch(updateSizeLetterText(e.target.value));
  };

  const handleSelectSheet = (selected: number) => () =>
    dispatch(updateActiveSheetPanel(selected));

  const handleArrowBack = () => {
    if (history.length > 0) {
      history.back();
    } else {
      window.location.href = "https://elaminas.com";
    }
  };

  const handleDispatchEditorText = (align: string) => {
    dispatch(updateEditortext(align));
  };

  const handleSelectTypography = (e: any) =>
    dispatch(updateTypography(e.target.value));

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
        <ItemMenuBack onClick={handleArrowBack} isActive={statusOption == 2}>
          <div>
            <CaretBack />
          </div>
          <span>Atrás</span>
        </ItemMenuBack>
      </ContainerOptionsMenu>
      <ContainerBodyOptions isActive={statusOption == 1}>
        <ContainerTitle>
          <h3>Tamaños de hoja</h3>
          <p>Selecciona el tamaño de tu panel editable</p>
        </ContainerTitle>
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
        <ContainerTitle>
          <h3>Panel de texto</h3>
          <p>Aquí puedes agregar un nuevo texto y personalizarlo a tu gusto</p>
        </ContainerTitle>
        <ButtonAddText onClick={handleAddText()}>Agregar texto</ButtonAddText>
        <ContainerTextGeneralOptions>
          <ContainerOptionsText>
            <ContainerItemOption>
              <div>color</div>
              <div>
                <input
                  id="input_color_main"
                  type="color"
                  onInput={handleInputColor}
                />
              </div>
            </ContainerItemOption>
            <ContainerItemOptionTextRange>
              <p>Tamaño de texto</p>
              <ContainerInputRangeText
                type="range"
                min="5"
                max="60"
                defaultValue={sizeLetter}
                onInput={handleChangeSizeLetter}
              />
            </ContainerItemOptionTextRange>
            <ContainerItem onClick={() => handleDispatchEditorText("left")}>
              <TextLeft />
            </ContainerItem>
            <ContainerItem onClick={() => handleDispatchEditorText("center")}>
              <TextCenter />
            </ContainerItem>
            <ContainerItem onClick={() => handleDispatchEditorText("right")}>
              <TextRight />
            </ContainerItem>
            <ContainerItem onClick={() => handleDispatchEditorText("justify")}>
              <Justify />
            </ContainerItem>
          </ContainerOptionsText>
          <ContainerTypography>
            <ContainerSelectTypography onChange={handleSelectTypography}>
              <option value="Arial">Arial</option>
              <option value="Arial Black">Arial Black</option>
              <option value="Verdana">Verdana</option>
              <option value="Tahoma">Tahoma</option>
              <option value="Trebuchet MS">Trebuchet MS</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
              <option value="American Typewriter">American Typewriter</option>
              <option value="Andale Mono">Andale Mono</option>
              <option value="Courier">Courier</option>
              <option value="Lucida Console">Lucida Console</option>
              <option value="Monaco">Monaco</option>
              <option value="Bradley Hand">Bradley Hand</option>
              <option value="Brush Script MT">Brush Script MT</option>
              <option value="Luminari">Luminari</option>
              <option value="Comic Sans MS">Comic Sans MS</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Cambria">Cambria</option>
            </ContainerSelectTypography>
          </ContainerTypography>
        </ContainerTextGeneralOptions>
      </ContainerBodyOptions>
      <ContainerBodyOptions isActive={statusOption == 3}>
        <ContainerTitle>
          <h3>Panel de Láminas</h3>
          <p>Selecciona nuevas láminas</p>
        </ContainerTitle>
        <ContainerSearch>
          <ContainerInputSearchStyle
            type="text"
            placeholder="Buscar lámina"
            defaultValue={initialSearch}
            onKeyUp={handleKeyUp}
            onChange={(e: any) => handleChangeText(e.target.value)}
          />
        </ContainerSearch>
        <ContainerListLaminas>
          {menuEditorProduction.app.mocks &&
            listMockLaminas.map((image) => (
              <ContainerLamina key={image.id}>
                <img
                  src={image.image}
                  onClick={handleSelectImage(image.image)}
                />
              </ContainerLamina>
            ))}
          {isLoading || resultSearch.isLoading || resultSearch.isLoading ? (
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
          {currentDataImage?.data.length == 0 && (
            <AlertNullResult>No se encontraron resultados</AlertNullResult>
          )}
          {isError && (
            <p>
              Al parecer ocurrio un error, comunicate con el administrador del
              sistema
            </p>
          )}
          {currentDataImage?.nextPageUrl != null && (
            <WrapperMoreResults>
              <button
                disabled={resultPerPage.isLoading}
                onClick={handleMoreResults}
              >
                Mostrar más resultados
              </button>
            </WrapperMoreResults>
          )}
        </ContainerListLaminas>
      </ContainerBodyOptions>
    </ContainerMenu>
  );
};

export default MenuEditor;
