/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { MutableRefObject } from "react";
import { CloudUpload } from "@styled-icons/material-sharp/CloudUpload";
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

import {
  ISheetDefaultProps,
  ISheetsResponse,
} from "../../../../../core/store/sheets/types/laminas-type";
import SheetItem from "./sheet-item/sheet-item";
import {
  addSheetEditor,
  clearSheetsEditor,
  getCurrentPageEditor,
  getCurrentSearchWordEditor,
  getCurrentSizeEditor,
  getListSheetsEditor,
  updateCurrentPageEditor,
  updateCurrentSearchWordEditor,
} from "../../../../../core/store/sheets/sheetsSlice";
import {
  BodyCardImage,
  BodyCardLamina,
  ButtonMoreResults,
  ContainerSteps,
  HeaderText,
  IconInfo,
  InfoTitleUpload,
  LoaderWrapper,
  SearchButton,
  UploadButtonImage,
  UploadImageContainer,
  WrapperItemsResults,
  WrapperListLaminas,
  WrapperMenuImagen,
} from "./sub-menu-image-style";
import { useGetAllSheetsPaginateMutation } from "../../../../../core/store/sheets/sheetsAPI";
import useLogger, { ELog } from "../../../../../utils/hooks/use-logger";

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
  const [funcUploadImage, setFuncUploadImage] = React.useState<IFunctionality>(
    {} as IFunctionality
  );
  const dispatch = useAppDispatch();

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

  React.useEffect(() => {
    handleGetFuncionalities();
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
    const imgAdapter = document.createElement("img");
    imgAdapter.src = srcImage;
    const newHeight = (300 * imgAdapter.height) / imgAdapter.width;
    dispatch(
      addItemKonva({
        id: `image${activeID}`,
        type: KonvaTypeItem.IMAGE,
        x: layerRef.current.children[0].attrs.x,
        y: layerRef.current.children[0].attrs.y,
        height: newHeight,
        width: 300,
        image: srcImage,
      } as ComponentKonvaItem)
    );
    dispatch(updateActiveIDKonva(`image${activeID}`));
  };

  // LOGIC GET SHEETS
  const [dataPostResult, setDataPostResult] = React.useState<ISheetsResponse>();
  const [queryOption, setQueryOption] = React.useState<number>(1);
  const currentPage = useAppSelector(getCurrentPageEditor);
  const currentWord = useAppSelector(getCurrentSearchWordEditor);
  const currentSize = useAppSelector(getCurrentSizeEditor);
  const listSheets = useAppSelector(getListSheetsEditor);

  const [getAllSheetsEditor, resultSheets] = useGetAllSheetsPaginateMutation();
  const { Logger } = useLogger();

  const getAllSheets = React.useCallback(() => {
    getAllSheetsEditor({
      page: currentPage,
      size: currentSize,
      word: currentWord,
    });
  }, [currentPage, currentWord, currentSize]);

  const handleMoreResults = () => {
    dispatch(updateCurrentPageEditor());
    setQueryOption(2);
    getAllSheets();
  };

  React.useEffect(() => {
    if (listSheets) {
      setQueryOption(1);
      dispatch(updateCurrentPageEditor());
      getAllSheets();
    }
  }, []);

  React.useEffect(() => {
    Logger("List Sheets", JSON.stringify(listSheets));
  }, [listSheets]);

  React.useEffect(() => {
    if (resultSheets != null && resultSheets!.data != null) {
      Logger("Opcion", queryOption);
      if (queryOption == 1) {
        Logger("Opcion 1");
        // Update All
        (resultSheets!.data!.data || []).forEach((sheet) => {
          getBlobImage(sheet);
        });
        setDataPostResult(resultSheets!.data!);
      }
      if (queryOption == 2) {
        Logger("Opcion 2");
        // Add More
        (resultSheets!.data!.data || []).forEach((sheet) => {
          getBlobImage(sheet);
        });
        setDataPostResult(resultSheets!.data!);
      }
    }
  }, [resultSheets]);

  const getBlobImage = async (sheet: ISheetDefaultProps) => {
    const dataUser = Cookies.get(APP_CONSTANS.AUTH_USER_DATA);
    let token = "";
    if (dataUser != null && dataUser != undefined) {
      const user = JSON.parse(dataUser) as IAuthData;
      token = user.token;
    }

    const response = await fetch(sheet.tira, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const imageBlob = await response.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      const newSheet = { ...sheet };
      newSheet.tira = imageObjectURL;
      dispatch(addSheetEditor(newSheet));
    }
  };

  const handleKeyUp = (e: any) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      dispatch(clearSheetsEditor());
      dispatch(updateCurrentPageEditor());
      setQueryOption(1);
      getAllSheets();
    }
  };

  const handleChangeText = (word: string) => {
    dispatch(updateCurrentSearchWordEditor(word));
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
            defaultValue={currentWord}
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
