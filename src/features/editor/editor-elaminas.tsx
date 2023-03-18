/* eslint-disable @typescript-eslint/no-explicit-any */
import { jsPDF } from "jspdf";
import React from "react";
import MenuEditor from "./components/menu-editor/menu-editor";
import html2canvas from "html2canvas";
import ImageBase, {
  ImageBaseProps,
} from "./components/editor/components/image-base/image-base";
import {
  addImageBase,
  addMoreZoom,
  changeStatusMobileMenu,
  closeDownloadPDF,
  closeModalEditor,
  getActiveSheetPanel,
  getCurrentImage,
  getImageCropper,
  getListImageBase,
  getListTextBase,
  getStatusDownloadPDF,
  getStatusModalEditor,
  getValueScaleZoom,
  hiddenStatusControls,
  reduceZoom,
  resetZoom,
  showDownloadPDF,
  showStatusControls,
} from "../../core/store/editor/editorSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import TextBase, {
  TextBaseProps,
} from "./components/editor/components/text-base/text-base";
import { CropperRef, Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { ArrowDownload } from "@styled-icons/fluentui-system-filled/ArrowDownload";
import downloadLoadingImage from "../../assets/gif/painting_download_load.gif";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { Edit } from "@styled-icons/fluentui-system-filled/Edit";
import MenuMobile from "./components/menu-editor/menu-mobile";
import { ZoomIn } from "@styled-icons/bootstrap/ZoomIn";
import { ZoomOut } from "@styled-icons/bootstrap/ZoomOut";
import Cookies from "js-cookie";
import {
  usePostLaminasByUUIDMutation,
  usePostUpdateDownloadBySheetMutation,
} from "../../core/store/editor/editorAPI";
import envProduction from "../../config/environments/production.json";
import {
  ContainerEditor,
  ContentPanelEditor,
  ContentEditor,
  WrapperTransformScale,
  HiddenWrapper,
  ContainerDownloadButton,
  ButtonZoom,
  ContainerModalImage,
  ContainerDownloadPDF,
  ModalEditImage,
  ButtonDownload,
  ContainerLoaded,
  ButtonApplyCropper,
  MenuMobileEditor,
} from "./editor-laminas.styles";
import productionJSON from "../../config/environments/production.json";

const EditorElaminas: React.FC = () => {
  React.useEffect(() => {
    if (envProduction.app.blocked) {
      const token = Cookies.get("jwt_token");
      if (token == "" || token == null) {
        window.location.href = "https://elaminas.com";
      }
    }
  }, [Cookies.get("jwt_token")]);
  const [refCropper, setTefCropper] = React.useState<CropperRef>();
  const [activeDownload, setActiveDownload] = React.useState(false);
  const dispatch = useAppDispatch();
  const listImage = useAppSelector(getListImageBase);
  const statusModalEditor = useAppSelector(getStatusModalEditor);
  const statusDownloadPDF = useAppSelector(getStatusDownloadPDF);
  const imageCropper = useAppSelector(getImageCropper);
  const currentImageId = useAppSelector(getCurrentImage);
  const listText = useAppSelector(getListTextBase);
  const activeSheetPanel = useAppSelector(getActiveSheetPanel);
  const valueScale = useAppSelector(getValueScaleZoom);

  const handleCloseEditCropper = () => dispatch(closeModalEditor());

  const handleShowMobile = () => {
    dispatch(changeStatusMobileMenu());
  };
  const sizeSheet = [
    [210, 297],
    [215, 340],
    [297, 420],
  ];

  React.useEffect(() => {
    const laminaCode = Cookies.get("e_co");
    if (laminaCode) {
      searchLaminaByUUID(laminaCode);
    }
  }, []);

  const [searchLaminaByUUID, resultSearch] = usePostLaminasByUUIDMutation();

  React.useEffect(() => {
    const currentImageView: ImageBaseProps = {
      id: Date.now(),
      image: resultSearch?.data?.data[0]?.tbllmnaimgo || "",
    };
    if (currentImageView.image != "") {
      dispatch(addImageBase(currentImageView));
    }
  }, [resultSearch]);

  const onChange = (cropper: CropperRef) => {
    setTefCropper(cropper);
  };

  const handleApplyCropper = () => () => {
    const canva = refCropper?.getCanvas();
    if (canva) {
      const currentImage: HTMLImageElement | any =
        document.getElementById(currentImageId);
      currentImage.src = canva.toDataURL();
    }
    dispatch(closeModalEditor());
  };

  const activeContentPanel = () => {
    const content = document.getElementById("contentRef");
    if (content != null) return content;
  };

  const [postUpdateDownloadBySheet, responseDownload] =
    usePostUpdateDownloadBySheetMutation();

  const handleDownloadPanel = () => {
    setActiveDownload(true);
    postUpdateDownloadBySheet(
      activeSheetPanel == 1 ? "A4" : activeSheetPanel == 2 ? "Oficio" : "A3"
    );
  };

  React.useEffect(() => {
    if (!responseDownload.isLoading) {
      if (responseDownload.isError) {
        if (productionJSON.app.blocked) {
          document.getElementById("root")!.innerHTML = `
        <div style="width: 100%; background: #b5b5b5; height: 100vh; position: absolute;
        margin: 0; top: 0; display: flex; flex-direction: column; gap: 20px; justify-content: center;
        align-items: center;"> <p>Al parecer se ha agotado tu cantidad de descargas por día o no se ha encontrado una sesión activa.</p>
        <p>Por favor vuelve a iniciar sesión o comunicate con tu administrador</p>
        <a style=" display: flex; align-items: center; justify-content: center; gap: 5px;
        background-image: linear-gradient(to right, #fc4464, #fc4c3c, #fc4c2c); border: 2px solid #fff;
        color: #fff; padding: 10px 20px; border-radius: 30px; box-shadow: 0px 4px 6px 5px #ff7f956b;
        cursor: pointer; max-width: 300px; text-decoration: none;" href="https://test.elaminas.com">Ir a la pagina principal</a>
        </div>
      `;
          if (productionJSON.app.blocked) {
            setTimeout(() => {
              window.open("", "_parent", "");
              window.close();
            }, 2000);
          }
        }
      } else {
        if (activeDownload) {
          dispatch(hiddenStatusControls());
          dispatch(resetZoom());
          setTimeout(() => downloadPanel(), 800);
          setActiveDownload(false);
        }
      }
    }
  }, [responseDownload]);

  const downloadPanel = () => {
    dispatch(showDownloadPDF());
    const content = activeContentPanel();
    if (content != null) {
      html2canvas(content, {
        logging: true,
        useCORS: true,
        scale: 12,
      }).then((canvas) => {
        const imgWidth = sizeSheet[activeSheetPanel - 1][0];
        const imgHeight = sizeSheet[activeSheetPanel - 1][1];
        const imgData = canvas.toDataURL("image/png");
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: sizeSheet[activeSheetPanel - 1],
        });
        doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        dispatch(closeDownloadPDF());
        doc.save("elaminas.pdf");
      });
    }
    dispatch(showStatusControls());
  };
  // Disabled Anticlick
  if (envProduction.app.blocked) {
    window.addEventListener(
      "contextmenu",
      (e: any) => {
        e.preventDefault();
      },
      false
    );
  }

  const handleDownZoom = () => {
    dispatch(reduceZoom());
  };
  const handleUpZoom = () => {
    dispatch(addMoreZoom());
  };

  return (
    <>
      <ContainerEditor>
        <MenuMobile />
        <MenuMobileEditor onClick={handleShowMobile}>
          <Edit />
        </MenuMobileEditor>
        <MenuEditor />
        <ContentPanelEditor>
          <HiddenWrapper>
            <WrapperTransformScale valueScale={valueScale}>
              <ContentEditor
                id="contentRef"
                activeSheetPanel={activeSheetPanel}
              >
                {listImage.map((item: ImageBaseProps) => (
                  <ImageBase key={item.id} id={item.id} image={item.image} />
                ))}
                {listText.map((item: TextBaseProps) => (
                  <TextBase
                    key={item.id}
                    id={item.id}
                    inputColor={item.inputColor}
                    typography={item.typography}
                    sizeLetter={item.sizeLetter}
                    textAlign={item.textAlign}
                  />
                ))}
              </ContentEditor>
            </WrapperTransformScale>
          </HiddenWrapper>
          <ContainerDownloadButton>
            <ButtonZoom onClick={handleDownZoom}>
              <ZoomOut />
            </ButtonZoom>
            <ButtonZoom onClick={handleUpZoom}>
              <ZoomIn />
            </ButtonZoom>
            <ButtonDownload onClick={handleDownloadPanel}>
              Descargar
              <ArrowDownload />
            </ButtonDownload>
          </ContainerDownloadButton>
        </ContentPanelEditor>
      </ContainerEditor>
      {statusModalEditor && (
        <ContainerModalImage>
          <ModalEditImage>
            <CloseOutline onClick={handleCloseEditCropper} />
            <Cropper
              src={imageCropper}
              onChange={onChange}
              className={"cropper"}
            />
            <ButtonApplyCropper onClick={handleApplyCropper()}>
              Aplicar
            </ButtonApplyCropper>
          </ModalEditImage>
        </ContainerModalImage>
      )}
      {statusDownloadPDF && (
        <ContainerDownloadPDF>
          <ContainerLoaded>
            <p>Estamos trabajando en tu descarga ...</p>
            <img src={downloadLoadingImage} />
          </ContainerLoaded>
        </ContainerDownloadPDF>
      )}
    </>
  );
};

export default EditorElaminas;
