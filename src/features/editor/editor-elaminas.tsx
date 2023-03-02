import { jsPDF } from "jspdf";
import React from "react";
import styled from "styled-components";
import MenuEditor from "./components/menu-editor/menu-editor";
import html2canvas from "html2canvas";
import ImageBase, {
  ImageBaseProps,
} from "./components/editor/components/image-base/image-base";
import {
  closeModalEditor,
  getCurrentImage,
  getImageCropper,
  getListImageBase,
  getListTextBase,
  getStatusModalEditor,
} from "../../core/store/editor/editorSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import TextBase, {
  TextBaseProps,
} from "./components/editor/components/text-base/text-base";
import { CropperRef, Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

const ContainerEditor = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  width: 100%;
  height: 100vh;
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
const SheetItem = styled.div`
  background: purple;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
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
const ModalEditImage = styled.div`
  width: 100%;
  height: auto;
  max-width: 300px;
  margin: auto;
  background: white;
  padding: 15px;
`;

const EditorElaminas: React.FC = () => {
  const [activeSheetPanel, setActiveSheetPanel] = React.useState(1);
  const [refCropper, setTefCropper] = React.useState<CropperRef>();
  const dispatch = useAppDispatch();
  const listImage = useAppSelector(getListImageBase);
  const statusModalEditor = useAppSelector(getStatusModalEditor);
  const imageCropper = useAppSelector(getImageCropper);
  const currentImageId = useAppSelector(getCurrentImage);
  const listText = useAppSelector(getListTextBase);
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
        doc.save("aa.pdf");
      });
    }
  };
  return (
    <>
      <ContainerEditor>
        <MenuEditor />
        <ContentPanelEditor>
          <ContainerSheet>
            <SheetItem onClick={handleSelectSheet(1)}>A4</SheetItem>
            <SheetItem onClick={handleSelectSheet(2)}>Oficio</SheetItem>
            <SheetItem onClick={handleSelectSheet(3)}>A3</SheetItem>
          </ContainerSheet>
          <ContentEditor id="contentRef" activeSheetPanel={activeSheetPanel}>
            {listImage.map((item: ImageBaseProps) => (
              <ImageBase key={item.id} id={item.id} image={item.image} />
            ))}
            {listText.map((item: TextBaseProps) => (
              <TextBase key={item.id} id={item.id} text={item.text} />
            ))}
          </ContentEditor>
          <ContainerDownloadButton>
            <button onClick={handleDownloadPanel}>Download</button>
          </ContainerDownloadButton>
        </ContentPanelEditor>
      </ContainerEditor>
      {statusModalEditor && (
        <ContainerModalImage>
          <ModalEditImage>
            <Cropper
              src={imageCropper}
              onChange={onChange}
              className={"cropper"}
            />
            <button onClick={handleApplyCropper()}>Aplicar</button>
          </ModalEditImage>
        </ContainerModalImage>
      )}
    </>
  );
};

export default EditorElaminas;
