import { jsPDF } from "jspdf";
import React from "react";
import styled from "styled-components";
import MenuEditor from "./components/menu-editor/menu-editor";
import html2canvas from "html2canvas";
import ImageBase, {
  ImageBaseProps,
} from "./components/editor/components/image-base/image-base";
import {
  changeStatusMobileMenu,
  closeDownloadPDF,
  closeModalEditor,
  getCurrentImage,
  getImageCropper,
  getListImageBase,
  getListTextBase,
  getStatusDownloadPDF,
  getStatusMobileMenu,
  getStatusModalEditor,
  showDownloadPDF,
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
import { breakpoints } from "../../constants/breakpoints";
import { Settings2Outline } from "@styled-icons/evaicons-outline/Settings2Outline";
import MenuMobile from "./components/menu-editor/menu-mobile";

const ContainerEditor = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  width: 100%;
  height: 100vh;
  background-color: #e5e5f7;
  opacity: 0.8;
  background-image: linear-gradient(#ffffff 1px, transparent 1px),
    linear-gradient(to right, #ffffff 1px, #e9eaed 1px);
  background-size: 20px 20px;

  * {
    font-family: sans-serif;
    box-sizing: border-box;
  }
`;
const ContentPanelEditor = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
const ContentEditor = styled.div<{ activeSheetPanel: number }>`
  overflow: hidden;
  background: white;
  box-shadow: 0px 4px 20px 8px #a2a2a2b8;
  transition: 0.5s;

  width: ${(p) =>
    p.activeSheetPanel == 1
      ? "283.5px"
      : p.activeSheetPanel == 2
      ? "297px"
      : "400.95px"};

  height: ${(p) =>
    p.activeSheetPanel == 1
      ? "400.95px"
      : p.activeSheetPanel == 2
      ? "459px"
      : "567px"};
`;
const ContainerSheet = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  column-gap: 10px;
`;
const SheetItem = styled.div<{ active: boolean }>`
  background: ${(p) => (p.active ? "#83af44" : "white")};
  padding: 10px 20px;
  border-radius: 5px;
  color: ${(p) => (p.active ? "white" : "#83af44")};
  cursor: pointer;
  box-shadow: ${(p) => (p.active ? "0px 6px 12px 0px #a2c6718c" : "none")};
  border: 1px solid #83af44;
`;
const ContainerDownloadButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;
const ContainerModalImage = styled.div`
  position: fixed;
  background: #21212187;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContainerDownloadPDF = styled.div`
  position: fixed;
  background: #21212187;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalEditImage = styled.div`
  width: 100%;
  height: auto;
  max-width: 300px;
  margin: auto;
  background: white;
  padding: 15px;

  > svg {
    width: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
`;
const ButtonDownload = styled.button`
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
`;
const ContainerLoaded = styled.div`
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 20px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: fit-content;

  > p {
    font-family: cursive;
  }
  > img {
    width: 100%;
    max-width: 300px;
  }
`;
const ButtonApplyCropper = styled.button`
  gap: 5px;
  background-image: linear-gradient(to right, #fc4464, #fc4c3c, #fc4c2c);
  border: 2px solid #fff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 30px;
  box-shadow: 0px 4px 6px 5px #ff7f956b;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const MenuMobileEditor = styled.div`
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border-radius: 50%;
  background: #fd6e67;
  color: white;
  padding: 0;
  margin: 0;
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0px 4px 13px 4px #45454582;
  display: none;

  > svg {
    width: 25px;
  }

  ${breakpoints.tabletL} {
    display: none;
  }
  ${breakpoints.tabletS} {
    display: none;
  }
  ${breakpoints.phoneL} {
    display: flex;
  }
`;
const EditorElaminas: React.FC = () => {
  const [activeSheetPanel, setActiveSheetPanel] = React.useState(1);
  const [refCropper, setTefCropper] = React.useState<CropperRef>();
  const dispatch = useAppDispatch();
  const listImage = useAppSelector(getListImageBase);
  const statusModalEditor = useAppSelector(getStatusModalEditor);
  const statusDownloadPDF = useAppSelector(getStatusDownloadPDF);
  const imageCropper = useAppSelector(getImageCropper);
  const currentImageId = useAppSelector(getCurrentImage);
  const listText = useAppSelector(getListTextBase);
  const statusMobileMenu = useAppSelector(getStatusMobileMenu);
  const handleCloseEditCropper = () => dispatch(closeModalEditor());
  const handleShowMobile = () => {
    dispatch(changeStatusMobileMenu());
  };
  const sizeSheet = [
    [210, 297],
    [220, 340],
    [297, 420],
  ];

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

  const handleSelectSheet = (selected: number) => () =>
    setActiveSheetPanel(selected);

  const activeContentPanel = () => {
    const content = document.getElementById("contentRef");
    if (content != null) return content;
  };

  const handleDownloadPanel = () => {
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
        const imgData = canvas.toDataURL("image/png", 1.0);
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: sizeSheet[activeSheetPanel - 1],
        });
        doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        dispatch(closeDownloadPDF());
        doc.save("aa.pdf");
      });
    }
  };

  // Disabled Anticlick
  // window.addEventListener(
  //   "contextmenu",
  //   (e: any) => {
  //     e.preventDefault();
  //   },
  //   false
  // );

  return (
    <>
      <ContainerEditor>
        <MenuMobile />
        <MenuMobileEditor onClick={handleShowMobile}>
          <Settings2Outline />
        </MenuMobileEditor>
        <MenuEditor />
        <ContentPanelEditor>
          <ContainerSheet>
            <SheetItem
              active={activeSheetPanel == 1}
              onClick={handleSelectSheet(1)}
            >
              A4
            </SheetItem>
            <SheetItem
              active={activeSheetPanel == 2}
              onClick={handleSelectSheet(2)}
            >
              Oficio
            </SheetItem>
            <SheetItem
              active={activeSheetPanel == 3}
              onClick={handleSelectSheet(3)}
            >
              A3
            </SheetItem>
          </ContainerSheet>
          <ContentEditor id="contentRef" activeSheetPanel={activeSheetPanel}>
            {listImage.map((item: ImageBaseProps) => (
              <ImageBase key={item.id} id={item.id} image={item.image} />
            ))}
            {listText.map((item: TextBaseProps) => (
              <TextBase key={item.id} id={item.id} />
            ))}
          </ContentEditor>
          <ContainerDownloadButton>
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
