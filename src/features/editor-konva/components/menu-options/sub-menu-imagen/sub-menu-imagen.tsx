import React, { MutableRefObject } from "react";
import { InfoOutline } from "@styled-icons/evaicons-outline/InfoOutline";
import styled, { keyframes } from "styled-components";
import { customPalette } from "../../../../../config/theme/theme";
import { CloudUpload } from "@styled-icons/material-sharp/CloudUpload";
import {
  LaminaDefaultProps,
  LaminaResponse,
  usePostLaminasByWordMutation,
} from "../../../../../core/store/editor/editorAPI";
import { useAppDispatch } from "../../../../../app/hooks";
import {
  addItemKonva,
  updateActiveIDKonva,
  updateActiveMenuOption,
} from "../../../../../core/store/konva-editor/konva-editorSlice";
import { KonvaTypeItem } from "../../global-item-konva/global-item-konva";
import { ComponentKonvaItem } from "../../../editor-konva";
import Cookies from "js-cookie";
import { updateStatusModalLogin } from "../../../../../core/store/app-store/appSlice";
import {
  EFuncionality,
  IFunctionality,
} from "../../../../../core/store/auth/types/auth-types";
import useDataUser from "../../../../../utils/hooks/use-data-user";
import toast, { Toaster } from "react-hot-toast";

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
const LaminaItem = styled.div`
  width: 30%;
  max-width: 100px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    margin: auto;
    text-align: center;
    padding: 2px;
  }
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
  const [pageGetLaminas, setPageGetLaminas] = React.useState(1);
  const [dataPostResult, setDataPostResult] = React.useState<LaminaResponse>();
  const [listLaminas, setListLaminas] = React.useState<LaminaDefaultProps[]>(
    []
  );
  const [funcUploadImage, setFuncUploadImage] = React.useState<IFunctionality>(
    {} as IFunctionality
  );
  const [initialSearch, setInitialSearch] = React.useState({
    page: pageGetLaminas,
    word: "",
  });
  const dispatch = useAppDispatch();

  const { handleGetDataUser } = useDataUser();

  React.useEffect(() => {
    const dataUser = handleGetDataUser();
    setFuncUploadImage(
      (dataUser.functionalities || []).filter(
        (func) => func.function == EFuncionality.FUNC_UPLOAD_IMAGE
      )[0]
    );
  }, []);

  const handleUpdateStep = (step: number) => () => setStepActive(step);
  const handleDragImage = () => {
    document.getElementById("input-file-image")?.click();
  };
  const handleChangeText = (word: string) =>
    setInitialSearch({
      page: pageGetLaminas,
      word,
    });

  const [searchLaminaByWord, resultSearch] = usePostLaminasByWordMutation();

  const handleKeyUp = (e: any) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      searchLaminaByWord(initialSearch);
    }
  };

  const handleMoreResults = () => {
    setPageGetLaminas(pageGetLaminas + 1);
  };

  React.useEffect(() => {
    searchLaminaByWord(initialSearch);
  }, [pageGetLaminas]);

  React.useEffect(() => {
    if (resultSearch.data != null) {
      setDataPostResult(resultSearch.data);
      const newData: LaminaDefaultProps[] = [];
      resultSearch.data.data.map((item) => newData.push(item));
      setListLaminas(newData);
    }
  }, [resultSearch]);

  React.useEffect(() => {
    searchLaminaByWord(initialSearch);
  }, []);

  const handleAddImage = (srcImage: string) => () => {
    const token = Cookies.get("auth_user");
    if (!token) {
      dispatch(updateStatusModalLogin(true));
      return null;
    }
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
            defaultValue={initialSearch.word}
          />
          <WrapperListLaminas>
            <WrapperItemsResults>
              {listLaminas.map((lamina) => (
                <LaminaItem
                  key={`${Date.now()}${lamina.tbllmnanomb}`}
                  onClick={handleAddImage(lamina.tbllmnaimgo)}
                >
                  <img src={lamina.tbllmnaimgo} />
                </LaminaItem>
              ))}
            </WrapperItemsResults>
            {resultSearch.isLoading ? (
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
                  if ((funcUploadImage.formats || []).includes(ext!)) {
                    handleAddImage(e!.target!.result)();
                    dispatch(updateActiveMenuOption(0));
                  } else {
                    toast.error("Extensión no permitida");
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
                      if ((funcUploadImage.formats || []).includes(ext!)) {
                        handleAddImage(evt!.target!.result)();
                        dispatch(updateActiveMenuOption(0));
                      } else {
                        toast.error("Extensión no permitida");
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
