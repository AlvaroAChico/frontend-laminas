import styled from "styled-components";
import { breakpoints } from "../../constants/breakpoints";

export const ContainerEditor = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 100vh;
  background-color: #e5e5f7;
  background-image: linear-gradient(#ffffff 1px, transparent 1px),
    linear-gradient(to right, #ffffff 1px, #e9eaed 1px);
  background-size: 20px 20px;

  * {
    font-family: sans-serif;
    box-sizing: border-box;
  }
`;
export const ContentPanelEditor = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
export const ContentEditor = styled.div<{
  activeSheetPanel: number;
}>`
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
export const WrapperTransformScale = styled.div<{ valueScale: number }>`
  background: white;
  transition: 0.5s;
  transform: ${(p) =>
    p.valueScale < 1.6
      ? `scale(${p.valueScale}) translate(0%, 0%)`
      : `scale(${p.valueScale}) translate(30%, 30%)`};
  overflow: ${(p) => (p.valueScale < 0.5 ? "inherit" : "auto")};
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e5f7;
  background-image: linear-gradient(#ffffff 1px, transparent 1px),
    linear-gradient(to right, #ffffff 1px, #e9eaed 1px);
  background-size: 20px 20px;
`;

export const HiddenWrapper = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
  background-color: #e5e5f7;
  background-image: linear-gradient(#ffffff 1px, transparent 1px),
    linear-gradient(to right, #ffffff 1px, #e9eaed 1px);
  background-size: 20px 20px;
`;

export const ContainerSheet = styled.div`
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
  z-index: 6;
`;
export const SheetItem = styled.div<{ active: boolean }>`
  background: ${(p) => (p.active ? "#83af44" : "white")};
  padding: 10px 20px;
  border-radius: 5px;
  color: ${(p) => (p.active ? "white" : "#83af44")};
  cursor: pointer;
  box-shadow: ${(p) => (p.active ? "0px 6px 12px 0px #a2c6718c" : "none")};
  border: 1px solid #83af44;
`;
export const ContainerDownloadButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 6;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;
export const ButtonZoom = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-image: linear-gradient(to right, #fc4464, #fc4c3c, #fc4c2c);
  border-radius: 50%;
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
export const ContainerModalImage = styled.div`
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
  z-index: 9;
`;
export const ContainerDownloadPDF = styled.div`
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
  z-index: 10;
`;
export const ModalEditImage = styled.div`
  width: 100%;
  height: auto;
  max-width: 700px;
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
export const ButtonDownload = styled.button`
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
export const ContainerLoaded = styled.div`
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
export const ButtonApplyCropper = styled.button`
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
export const MenuMobileEditor = styled.div`
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
