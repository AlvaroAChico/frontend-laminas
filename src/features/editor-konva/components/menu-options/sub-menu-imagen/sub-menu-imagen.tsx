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

import { ISheetDefaultEditor } from "../../../../../core/store/sheets/types/laminas-type";
import SheetItem from "./sheet-item/sheet-item";
import {
  addMoreSheetsEditor,
  clearSheetsEditor,
  getCurrentPageEditor,
  getCurrentSearchWordEditor,
  getCurrentSizeEditor,
  getListSheetsEditor,
  resetCurrentPageEditor,
  updateAllSheetsEditor,
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
import axios from "axios";
import { settingsAPP } from "../../../../../config/environments/settings";

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

  const { handleGetToken } = useDataUser();

  const getBlobImage = async (sheet: string) => {
    const user = handleGetToken();
    if (user.token) {
      const response = await fetch(sheet, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 200) {
        const imageBlob = await response.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        handleAddImage(imageObjectURL);
      }
    } else {
      dispatch(updateStatusModalRegister(true));
    }
  };

  const handleAddImage = (srcImage: string) => {
    const activeID = Date.now();
    const imgAdapter = document.createElement("img");
    imgAdapter.src = srcImage;
    imgAdapter.id = "adapter-new-img";
    imgAdapter.style.width = "100%";
    imgAdapter.style.height = "100%";

    document.getElementById("root")!.appendChild(imgAdapter);
    const imgBody: HTMLImageElement = document.getElementById(
      "adapter-new-img"
    ) as HTMLImageElement;

    setTimeout(() => {
      const newHeight = (300 * imgBody!.height) / imgBody!.width;
      document.getElementById("root")!.removeChild(imgAdapter);

      dispatch(
        addItemKonva({
          id: `image${activeID}`,
          type: KonvaTypeItem.IMAGE,
          x: layerRef.current.children[0].attrs.x,
          y: layerRef.current.children[0].attrs.y,
          width: 300,
          height: newHeight,
          image: srcImage,
        } as ComponentKonvaItem)
      );
      dispatch(updateActiveIDKonva(`image${activeID}`));
    }, 100);
  };

  // LOGIC GET SHEETS
  const [urlNextPage, setUrlNextPage] = React.useState<string>("");
  // const [queryOption, setQueryOption] = React.useState<number>(1);
  const [isLoadingSheets, setIsLoadingSheets] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const currentWord = useAppSelector(getCurrentSearchWordEditor);
  const currentSize = useAppSelector(getCurrentSizeEditor);
  // const listSheets = useAppSelector(getListSheetsEditor);
  const [listSheets, setListSheets] = React.useState<ISheetDefaultEditor[]>([]);

  const getAllSheets = React.useCallback(
    (page: number, queryOption: number) => {
      setIsLoadingSheets(true);
      const filtersOptions = `?render=paginate&page=${page}${
        currentSize ? `&size=${currentSize}` : ""
      }${currentWord ? `&filter[name]=${currentWord}` : ""}`;
      axios({
        url: `${settingsAPP.api.sheets}/free-sheets/editor${filtersOptions}`,
        method: "GET",
        headers: {
          ContentType: "application/json",
          Accept: "application/json",
        },
      })
        .then((response: any) => {
          if (queryOption == 1) {
            // Update All
            setListSheets(response.data.data);
            setUrlNextPage(response.data.nextPageUrl);
          }
          if (queryOption == 2) {
            // Add More
            setListSheets([...listSheets, ...response.data.data]);
            setUrlNextPage(response.data.nextPageUrl);
          }
          setIsLoadingSheets(false);
        })
        .catch((error: any) => {
          setIsLoadingSheets(false);
          console.error("Error -> ", error);
        });
    },
    [currentPage, currentWord, currentSize, listSheets]
  );

  const handleMoreResults = () => {
    getAllSheets(currentPage + 1, 2);
    setCurrentPage(currentPage + 1);
  };

  React.useEffect(() => {
    if (listSheets != null) {
      dispatch(clearSheetsEditor());
      getAllSheets(1, 1);
    }
  }, []);

  const handleKeyUp = (e: any) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      dispatch(clearSheetsEditor());
      setCurrentPage(1);
      getAllSheets(1, 1);
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
              {listSheets.map((sheet: ISheetDefaultEditor) => {
                return (
                  <SheetItem
                    key={`${Date.now()}_${sheet.uuid}`}
                    name={sheet.name}
                    image={sheet.tiraTemporary}
                    handleAddImage={() => getBlobImage(sheet.tira)}
                  />
                );
              })}
            </WrapperItemsResults>
            {isLoadingSheets ? (
              <LoaderWrapper />
            ) : (
              urlNextPage != null &&
              urlNextPage != "" && (
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
