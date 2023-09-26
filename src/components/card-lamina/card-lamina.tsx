import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid, CardActions, Skeleton } from "@mui/material";
import styled, { keyframes } from "styled-components";
import { Star } from "@styled-icons/bootstrap/Star";
import { StarFill } from "@styled-icons/bootstrap/StarFill";
import { Download } from "@styled-icons/evaicons-solid/Download";
import { Eye } from "@styled-icons/ionicons-outline/Eye";
import { Edit } from "@styled-icons/fluentui-system-filled/Edit";
import { customPalette } from "../../config/theme/theme";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";

import { ISheetDefaultProps } from "../../core/store/sheets/types/laminas-type";
import {
  updateCurrentSheetDetail,
  updateCurrentSheetEdit,
  updateCurrentSheetEditUUID,
  updateStatusModalRegister,
  updateStatusModalSheetDetail,
} from "../../core/store/app-store/appSlice";
import Cookies from "js-cookie";
import { IAuthData } from "../../core/store/auth/types/auth-types";
import { APP_CONSTANS } from "../../constants/app";
import useDataUser from "../../utils/hooks/use-data-user";
import { resetDataKonva } from "../../core/store/konva-editor/konva-editorSlice";

const WrapperNroLamina = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  margin-bottom: 10px;

  > div:nth-child(1) {
    background: #dcba44;
    color: white;
    width: fit-content;
    display: grid;
    place-items: center;
    padding: 1px 10px;
    border-radius: 20px;
  }
  > div:nth-child(2) {
    width: 100%;
    max-width: 20px;
    color: #dcba44;
    cursor: pointer;
    transition: 0.5s;

    :hover {
      transform: scale(1.2);
    }
  }
`;

const CustomButtonStyle = styled.div`
  background: ${customPalette.secondaryColor};
  color: white;
  padding: 6px 10px;
  border-radius: 20px;
  width: fit-content;
  cursor: pointer;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  column-gap: 10px;

  > svg {
    width: 100%;
    max-width: 18px;
  }
`;

const GridViewsContainer = styled(Grid)`
  > * svg {
    width: 100%;
    max-width: 20px;
  }
`;

const CustomCardActions = styled(CardActions)`
  > div:nth-child(1) {
    width: 70%;
    transition: 0.5s;
  }
  > div:nth-child(2) {
    width: 15%;
    overflow: hidden;
    transition: 0.5s;

    > span {
      display: none;
    }

    :hover {
      width: 50%;

      > span {
        display: block;
      }
    }
  }
  > div:nth-child(3) {
    width: 15%;
    overflow: hidden;
    transition: 0.5s;

    > span {
      display: none;
    }

    :hover {
      width: 50%;

      > span {
        display: block;
      }
    }
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderStyle = styled.span`
  width: 25px;
  height: 25px;
  border: 3px solid #dddddd;
  border-bottom-color: ${customPalette.secondaryColor};
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotate} 1s linear infinite;
`;
const ContainerFavourite = styled.div`
  position: relative;
`;
const CustomStarFill = styled(StarFill)`
  position: absolute;
  z-index: 10;
`;
const CustomStar = styled(Star)`
  position: absolute;
  z-index: 10;
`;

interface IOwnProps {
  id?: number;
  uuid?: string;
  image: string;
  nroLamina: string;
  name: string;
  isFavourite?: boolean;
  nroDownloads: number;
  nroView: number;
  infoSheet: ISheetDefaultProps;
  handleAddFavoriteSheet?: (uuid: string) => void;
  handleDeleteFavoriteSheet?: (uuid: string) => void;
  isLoadingDelete: boolean;
  isLoadingAdd: boolean;
}
const CardLamina: React.FC<IOwnProps> = ({
  uuid = "",
  image,
  nroLamina,
  name,
  isFavourite,
  nroDownloads,
  nroView,
  infoSheet,
  handleAddFavoriteSheet = () => null,
  handleDeleteFavoriteSheet = () => null,
  isLoadingDelete,
  isLoadingAdd,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [statusLoading, setStatusLoading] = React.useState(true);

  const handleView = () => {
    dispatch(
      updateCurrentSheetDetail({
        code: infoSheet.code,
        name: infoSheet.name,
        description: infoSheet.description,
        uuid: infoSheet.uuid,
        isMostSeen: infoSheet.isMostSeen,
        isRecommended: infoSheet.isRecommended,
        isHorizontal: infoSheet.isHorizontal,
        summary: infoSheet.summary,
        status: infoSheet.status,
        isActive: infoSheet.isActive,
        createdAt: infoSheet.createdAt,
        categories: infoSheet.categories,
        tags: infoSheet.tags,
        tira: image,
      } as ISheetDefaultProps)
    );
    dispatch(updateStatusModalSheetDetail(true));
  };

  const handleLoaded = () => setStatusLoading(false);

  const { handleGetToken } = useDataUser();

  const handleEdit = React.useCallback(() => {
    const user = handleGetToken();
    if (user.token) {
      dispatch(resetDataKonva());
      dispatch(updateCurrentSheetEdit(image));
      dispatch(updateCurrentSheetEditUUID(uuid));
      navigate("/editor");
    } else {
      dispatch(updateStatusModalRegister(true));
    }
  }, [image]);

  // async function fetchBlob() {
  //   const dataUser = Cookies.get(APP_CONSTANS.AUTH_USER_DATA);
  //   let token = "";
  //   if (dataUser != null && dataUser != undefined) {
  //     const user = JSON.parse(dataUser) as IAuthData;
  //     token = user.token;
  //   }

  //   const response = await fetch(image, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   if (response.status === 200) {
  //     const imageBlob = await response.blob();
  //     const imageObjectURL = URL.createObjectURL(imageBlob);
  //     setBlobImage(imageObjectURL);
  //   }
  // }
  return (
    <>
      <Card
        sx={{
          width: "100%",
          maxWidth: 345,
          margin: "auto",
          borderRadius: "20px",
          boxSizing: "border-box",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          transition: "0.4s",
          ":hover": {
            transform: "scale(1.015)",
          },
        }}
      >
        <CardMedia
          component="img"
          image={image}
          sx={{ maxHeight: "225px", objectPosition: "top", cursor: "pointer" }}
          onLoad={handleLoaded}
          onClick={handleView}
        />
        {statusLoading && (
          <Skeleton variant="rounded" width={"100%"} height={150} />
        )}
        <CardContent onClick={handleView} sx={{ cursor: "pointer" }}>
          <WrapperNroLamina>
            <div>
              <Typography variant="caption" component="p">
                {nroLamina}
              </Typography>
            </div>
            {isFavourite != null && (
              <>
                <ContainerFavourite>
                  {isFavourite ? (
                    <>
                      {!isLoadingDelete ? (
                        <CustomStarFill
                          onClick={() => {
                            handleDeleteFavoriteSheet(uuid);
                            setTimeout(() => {
                              dispatch(updateStatusModalSheetDetail(false));
                            }, 10);
                          }}
                        />
                      ) : (
                        <LoaderStyle></LoaderStyle>
                      )}
                    </>
                  ) : (
                    <>
                      {!isLoadingAdd ? (
                        <CustomStar
                          onClick={() => {
                            handleAddFavoriteSheet(uuid);
                            setTimeout(() => {
                              dispatch(updateStatusModalSheetDetail(false));
                            }, 10);
                          }}
                        />
                      ) : (
                        <LoaderStyle></LoaderStyle>
                      )}
                    </>
                  )}
                </ContainerFavourite>
              </>
            )}
          </WrapperNroLamina>
          <Typography gutterBottom variant="h6" component="h6" fontWeight={600}>
            {name}
          </Typography>
          <GridViewsContainer
            container
            justifyContent={"left"}
            alignItems={"center"}
            sx={{ color: "#737373" }}
            fontWeight={500}
          >
            <Grid item xs={1}>
              <Download />
            </Grid>
            <Grid item xs={2}>
              <Typography variant="caption" component="p">
                {nroDownloads}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Eye />
            </Grid>
            <Grid item xs={2}>
              <Typography variant="caption" component="p">
                {nroView}
              </Typography>
            </Grid>
          </GridViewsContainer>
        </CardContent>
        <CustomCardActions sx={{ width: "100%", justifyContent: "center" }}>
          {statusLoading && (
            <>
              <Skeleton variant="rounded" width={"60%"} height={40} />
              <Skeleton variant="rounded" width={"20%"} height={40} />
              <Skeleton variant="rounded" width={"20%"} height={40} />
            </>
          )}
          {!statusLoading && (
            <>
              <CustomButtonStyle onClick={handleView}>
                <Typography variant="caption" component="span">
                  Descargar
                </Typography>
                <Download />
              </CustomButtonStyle>
              <CustomButtonStyle onClick={handleEdit}>
                <Typography variant="caption" component="span">
                  Editar
                </Typography>
                <Edit />
              </CustomButtonStyle>
              <CustomButtonStyle onClick={handleView}>
                <Typography variant="caption" component="span">
                  Ver
                </Typography>
                <Eye />
              </CustomButtonStyle>
            </>
          )}
        </CustomCardActions>
      </Card>
    </>
  );
};

export default CardLamina;
