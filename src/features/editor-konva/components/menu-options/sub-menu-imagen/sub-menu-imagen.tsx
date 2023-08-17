import React, { MutableRefObject } from "react";
import { InfoOutline } from "@styled-icons/evaicons-outline/InfoOutline";
import styled, { keyframes } from "styled-components";
import { customPalette } from "../../../../../config/theme/theme";
import { CloudUpload } from "@styled-icons/material-sharp/CloudUpload";
import { LaminaResponse } from "../../../../../core/store/editor/editorAPI";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import {
  addItemKonva,
  updateActiveIDKonva,
  updateActiveMenuOption,
} from "../../../../../core/store/konva-editor/konva-editorSlice";
import { KonvaTypeItem } from "../../global-item-konva/global-item-konva";
import { ComponentKonvaItem } from "../../../editor-konva";
import Cookies from "js-cookie";
import { updateStatusModalRegister } from "../../../../../core/store/app-store/appSlice";
import {
  EFuncionality,
  IAuthData,
  IFunctionality,
} from "../../../../../core/store/auth/types/auth-types";
import useDataUser from "../../../../../utils/hooks/use-data-user";
import toast, { Toaster } from "react-hot-toast";
import { APP_CONSTANS } from "../../../../../constants/app";
import { useGetAllSheetsPaginateMutation } from "../../../../../core/store/sheets/sheetsAPI";

import {
  ISheetDefaultProps,
  ISheetsResponse,
} from "../../../../../core/store/sheets/types/laminas-type";
import SheetItem from "./sheet-item/sheet-item";
import {
  addSheetEditor,
  getListSheetsEditor,
  updateAllSheetsEditor,
} from "../../../../../core/store/sheets/sheetsSlice";

const WrapperMenuImagen = styled.div<{
  isVisible: boolean;
  isMobileActive?: boolean;
}>`
  width: fit-content;
  min-width: 300px;
  max-width: 600px;
  border-radius: 15px;
  left: 120%;
  top: 0;
  padding: 10px;
  z-index: 1;
  cursor: auto;

  ${(p) =>
    p.isMobileActive
      ? ""
      : `position: absolute; background: ${customPalette.grayLightColor};
  box-shadow: 0px 4px 15px 6px rgba(98, 98, 98, 0.25);`};
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
const BodyCardLamina = styled.div``;
const BodyCardImage = styled.div``;
const UploadImageContainer = styled.div<{ isDragActive: boolean }>`
  border-style: dotted;
  border-width: 1px;
  border-color: ${customPalette.secondaryColor};
  background-color: transparent;
  font-family: verdana, arial;
  font-size: 10pt;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  row-gap: 8px;
  flex-direction: column;
  padding 30px 15px;
  position: relative;

  :after{
    ${(p) => (p.isDragActive ? "content: ''" : "")};
    position: absolute;
    background: #c2f78694;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
`;
const UploadButtonImage = styled.div`
  color: #fff;
  border: 1px solid ${customPalette.secondaryColor};
  background: ${customPalette.secondaryColor};
  outline: none;
  cursor: pointer;
  width: fit-content;
  padding: 4px 8px;
  border-radius: 10px;

  > input {
    display: none;
  }
`;
const InfoTitleUpload = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5e5e5e;
  column-gap: 10px;
  max-width: 150px;

  svg {
    width: 100%;
    max-width: 30px;
    color: #b7b7b7;
  }
`;
const SearchButton = styled.input`
  border: 0.5px solid #aeaeae;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 10px;
  margin-bottom: 8px;
  outline: none;
  width: 100%;
`;
const WrapperListLaminas = styled.div`
  display: flex;
  row-gap: 5px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const WrapperItemsResults = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;
  height: 100%;
  max-height: 250px;
  overflow-x: hidden;
`;

const ButtonMoreResults = styled.div`
  width: 100%;
  border-radius: 12px;
  color: white;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  background: ${customPalette.secondaryColor};
`;
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const LoaderWrapper = styled.div`
  border: 6px solid #f3f3f3; /* Light grey */
  border-top: 6px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 0.8s linear infinite;
`;
interface IOwnProps {
  isVisible: boolean;
  canvaRef: MutableRefObject<HTMLCanvasElement | undefined>;
  layerRef: MutableRefObject<any>;
  isMobileActive?: boolean;
}
const SubMenuImagen: React.FC<IOwnProps> = ({
  isVisible,
  layerRef,
  isMobileActive = false,
}) => {
  const [stepActive, setStepActive] = React.useState(1);
  const [activeDragImage, setActiveDragImage] = React.useState(false);
  const [dataPostResult, setDataPostResult] = React.useState<ISheetsResponse>();
  const [optionQuery, setOptionQuery] = React.useState<number>(1);
  const [wordSearch, setWordSearch] = React.useState<string>("");
  const [pageSearch, setPageSearch] = React.useState<number>(1);
  const [funcUploadImage, setFuncUploadImage] = React.useState<IFunctionality>(
    {} as IFunctionality
  );
  const listSheets = useAppSelector(getListSheetsEditor);
  const dispatch = useAppDispatch();
  const sizeSearch = "2";

  const { handleGetFuncionalities } = useDataUser();

  React.useEffect(() => {
    const listFunc = handleGetFuncionalities();
    setFuncUploadImage(
      (listFunc || []).filter(
        (func) => func.function == EFuncionality.FUNC_UPLOAD_IMAGE
      )[0]
    );
  }, []);

  const handleUpdateStep = (step: number) => () => setStepActive(step);
  const handleDragImage = () => {
    document.getElementById("input-file-image")?.click();
  };
  const handleChangeText = (word: string) => {
    setWordSearch(word);
  };
  const handleMoreResults = () => {
    setOptionQuery(2);
    setPageSearch(pageSearch + 1);
    handleGetSheets();
  };

  const [getAllSheetsPaginate, resultSheets] =
    useGetAllSheetsPaginateMutation();

  const handleKeyUp = (e: any) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      setOptionQuery(1);
      handleGetSheets();
    }
  };

  const handleGetSheets = React.useCallback(() => {
    getAllSheetsPaginate({
      page: pageSearch,
      size: sizeSearch,
      word: wordSearch,
    });
  }, []);

  React.useEffect(() => {
    if (resultSheets != null && resultSheets.data != null) {
      if (resultSheets!.data) {
        setDataPostResult(resultSheets!.data);
        if (optionQuery == 1) {
          // Replace list
          clearSheetsEditor();
          ((resultSheets!.data!.data as ISheetDefaultProps[]) || []).map(
            (dataSheet) => {
              updateDataWithBlob(dataSheet);
            }
          );
        }
        if (optionQuery == 2) {
          // Update list
          ((resultSheets!.data!.data as ISheetDefaultProps[]) || []).map(
            (dataSheet) => {
              updateDataWithBlob(dataSheet);
            }
          );
        }
      }
    }
  }, [resultSheets]);

  const clearSheetsEditor = () =>
    dispatch(updateAllSheetsEditor([] as ISheetDefaultProps[]));

  const updateDataWithBlob = async (data: ISheetDefaultProps) => {
    const token = verifyAuth();

    const image = data.tira || "";
    const response = await fetch(image, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const imageBlob = await response.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      const newData = { ...data, tira: imageObjectURL };
      dispatch(addSheetEditor(newData));
    }
  };

  React.useEffect(() => {
    handleGetFuncionalities();
    dispatch(updateAllSheetsEditor([] as ISheetDefaultProps[]));
    handleGetSheets();
  }, []);

  const verifyAuth = React.useCallback(() => {
    const dataUser = Cookies.get(APP_CONSTANS.AUTH_USER_DATA);
    if (dataUser != null && dataUser != undefined) {
      const user = JSON.parse(dataUser) as IAuthData;
      return user.token;
    }
    return null;
  }, []);

  const handleAddImage = (srcImage: string) => {
    const activeID = Date.now();
    dispatch(
      addItemKonva({
        id: `image${activeID}`,
        type: KonvaTypeItem.IMAGE,
        x: layerRef.current.children[0].attrs.x,
        y: layerRef.current.children[0].attrs.y,
        height: 200,
        width: 300,
        image: srcImage,
      } as ComponentKonvaItem)
    );
    dispatch(updateActiveIDKonva(`image${activeID}`));
  };

  return (
    <WrapperMenuImagen
      id="menuImagenes"
      isVisible={isVisible}
      isMobileActive={isMobileActive}
    >
      <HeaderText>
        <ContainerSteps stepActive={stepActive}>
          <div onClick={handleUpdateStep(1)}>Láminas</div>
          <div onClick={handleUpdateStep(2)}>Imagenes</div>
        </ContainerSteps>
        <p>
          {stepActive == 1
            ? "Recuerda seleccionar la imagen para poder agregarla al pane de edición"
            : "Para agregar una nueva imagen haz click en el botón o arrastra una imagen hacía el recuadro"}
        </p>
        <IconInfo />
      </HeaderText>
      {stepActive == 1 && (
        <BodyCardLamina>
          <SearchButton
            placeholder="Buscar láminas"
            type="text"
            onKeyUp={handleKeyUp}
            onChange={(e: any) => handleChangeText(e.target.value)}
            defaultValue={wordSearch}
          />
          <WrapperListLaminas>
            <WrapperItemsResults>
              {listSheets.map((sheet) => {
                return (
                  <SheetItem
                    key={`${Date.now()}_${sheet.name}`}
                    name={sheet.name}
                    image={sheet.tira}
                    handleAddImage={handleAddImage}
                  />
                );
              })}
            </WrapperItemsResults>
            {resultSheets.isLoading ? (
              <LoaderWrapper />
            ) : (
              dataPostResult?.nextPageUrl != null && (
                <ButtonMoreResults onClick={handleMoreResults}>
                  Más resultados
                </ButtonMoreResults>
              )
            )}
          </WrapperListLaminas>
        </BodyCardLamina>
      )}
      {stepActive == 2 && (
        <BodyCardImage>
          <UploadImageContainer
            isDragActive={activeDragImage}
            onDragOver={(e: any) => {
              e.stopPropagation();
              e.preventDefault();
              setActiveDragImage(true);
            }}
            onDrop={(e: any) => {
              e.stopPropagation();
              e.preventDefault();
              setActiveDragImage(false);
              const reader = new FileReader();

              reader.onload = function (e) {
                if (typeof e!.target!.result === "string") {
                  const ext = e!
                    .target!.result.split(";")[0]
                    .split("/")
                    .pop()
                    ?.toLowerCase();
                  if (verifyAuth()) {
                    if (
                      (funcUploadImage.formats || []).includes(
                        ext!.toUpperCase()
                      )
                    ) {
                      handleAddImage(e!.target!.result);
                      dispatch(updateActiveMenuOption(0));
                    } else {
                      toast.error("Extensión no permitida");
                    }
                  } else {
                    dispatch(updateStatusModalRegister(true));
                  }
                }
              };
              reader.readAsDataURL(e.dataTransfer.files[0]);
              return false;
            }}
            onDragEnter={(e: any) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onDragLeave={(e: any) => {
              e.stopPropagation();
              e.preventDefault();
              setActiveDragImage(false);
            }}
          >
            <InfoTitleUpload>
              <CloudUpload />
              <div>Agregar nueva imagen</div>
            </InfoTitleUpload>
            <UploadButtonImage onClick={handleDragImage}>
              Seleccionar imagen
              <input
                id="input-file-image"
                type="file"
                multiple={false}
                onInput={(e: any) => {
                  if (e!.target!.files && e!.target!.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function (evt: any) {
                      const ext = e!
                        .target!.files[0].name.split(".")
                        .pop()
                        .toLowerCase();
                      if (verifyAuth()) {
                        if (
                          (funcUploadImage.formats || []).includes(
                            ext!.toUpperCase()
                          )
                        ) {
                          handleAddImage(evt!.target!.result);
                          dispatch(updateActiveMenuOption(0));
                        } else {
                          toast.error("Extensión no permitida");
                        }
                      } else {
                        dispatch(updateStatusModalRegister(true));
                      }
                    };
                    reader.readAsDataURL(e!.target!.files[0]);
                  }
                }}
              />
            </UploadButtonImage>
          </UploadImageContainer>
        </BodyCardImage>
      )}
      <Toaster />
    </WrapperMenuImagen>
  );
};

export default SubMenuImagen;
