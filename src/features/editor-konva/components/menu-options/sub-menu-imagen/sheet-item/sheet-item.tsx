import React from "react";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import { IAuthData } from "../../../../../../core/store/auth/types/auth-types";
import { ISheetDefaultEditor } from "../../../../../../core/store/sheets/types/laminas-type";
import useDataUser from "../../../../../../utils/hooks/use-data-user";

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
  handleAddImage: (blobImage: any) => void;
}
const SheetItem: React.FC<IOwnProps> = ({ name, image, handleAddImage }) => {
  const [statusLoadImage, setStatusLoadImage] = React.useState<boolean>(false);

  return (
    <LaminaItem key={`${Date.now()}${name}`} onClick={handleAddImage}>
      <img src={image} onLoad={() => setStatusLoadImage(true)} />
      {!statusLoadImage && (
        <Skeleton variant="rounded" width={"100%"} height={50} />
      )}
    </LaminaItem>
  );
};

export default SheetItem;
