import React, { MutableRefObject } from "react";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import useDataUser from "../../../../../../utils/hooks/use-data-user";
import { updateStatusModalLogin } from "../../../../../../core/store/app-store/appSlice";
import { useAppDispatch } from "../../../../../../app/hooks";
import {
  addItemKonva,
  updateActiveIDKonva,
} from "../../../../../../core/store/konva-editor/konva-editorSlice";
import { KonvaTypeItem } from "../../../global-item-konva/global-item-konva";
import { ComponentKonvaItem } from "../../../../editor-konva";
import axios from "axios";
import toast from "react-hot-toast";

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

interface IOwnProps {
  name: string;
  image: string;
  uuidImage: string;
  displayImage: string;
  layerRef: MutableRefObject<any>;
  handleAddImage: (blobImage: any) => void;
}
const SheetItem: React.FC<IOwnProps> = ({
  name,
  image,
  layerRef,
  uuidImage,
  displayImage,
  handleAddImage,
}) => {
  const [statusLoadImage, setStatusLoadImage] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { handleGetToken } = useDataUser();

  const getAuthorizedTokenImage = () => {
    const user = handleGetToken();
    if (user.token) {
      handleAddImageEditor(user.token);
    } else {
      dispatch(updateStatusModalLogin(true));
    }
  };

  const handleAddImageEditor = async (token: string) => {
    const loadImageToast = toast.loading("Cargando");
    axios({
      url: displayImage,
      method: "GET",
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response: any) => {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        // setBlobImage(url);
        generateImageEditor(url, loadImageToast);
      })
      .catch(async (error: any) => {
        let errorString = error.response.data;
        errorString = JSON.parse(await error.response.data.text());
        console.log(errorString.message);
      });
  };

  const generateImageEditor = (url: string, toastLoading: any) => {
    const imageID = `adapter-new-img_${Date.now()}`;
    const imgAdapter = document.createElement("img");
    imgAdapter.crossOrigin = "Anonymous";
    imgAdapter.src = url;
    imgAdapter.id = imageID;
    document.getElementById("root")!.appendChild(imgAdapter);
    const imgBody: HTMLImageElement = document.getElementById(
      imageID
    ) as HTMLImageElement;
    imgBody.onload = () => {
      toast.dismiss(toastLoading);
      const newHeight = (300 * imgBody!.height) / imgBody!.width;
      document.getElementById("root")!.removeChild(imgAdapter);
      const activeID = Date.now();
      dispatch(
        addItemKonva({
          id: `image${activeID}`,
          type: KonvaTypeItem.IMAGE,
          x: layerRef.current.children[0].attrs.x,
          y: layerRef.current.children[0].attrs.y,
          width: 300,
          height: newHeight,
          image: url,
          uuid: uuidImage || "",
        } as ComponentKonvaItem)
      );
      dispatch(updateActiveIDKonva(`image${activeID}`));
    };
  };

  return (
    <LaminaItem key={`${Date.now()}${name}`} onClick={getAuthorizedTokenImage}>
      <img src={image} onLoad={() => setStatusLoadImage(true)} />
      {!statusLoadImage && (
        <Skeleton variant="rounded" width={"100%"} height={50} />
      )}
    </LaminaItem>
  );
};

export default SheetItem;
