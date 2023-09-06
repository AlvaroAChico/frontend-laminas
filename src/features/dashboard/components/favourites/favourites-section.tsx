import React from "react";
import styled from "styled-components";
import { Grid, Typography, MenuItem } from "@mui/material";
import SearchLamina from "../../../../components/search-lamina/search-lamina";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { listFavourites } from "../../../../config/mocks/list-favourites";
import CardLamina from "../../../../components/card-lamina/card-lamina";
import { ISheetDefaultProps } from "../../../../core/store/sheets/types/laminas-type";
import {
  useDeleteFavoriteSheetMutation,
  useGetAllFavoritesPaginateMutation,
  usePostAddFavoriteSheetMutation,
} from "../../../../core/store/favorites/favoritesAPI";

const WrapperFavourites = styled.div`
  position: relative;
  padding: 20px;
`;

const ListFavourites = styled.div`
  width: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;
  row-gap: 2rem;

  @media (min-width: 100px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (min-width: 520px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (min-width: 728px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FavouriteSection: React.FC = () => {
  const [favouritesNumber, setFavouritesNumber] = React.useState("");
  const [currentUUID, setCurrentUUID] = React.useState("");
  const [listFavorites, setListFavorites] = React.useState<
    ISheetDefaultProps[]
  >([]);

  const handleChange = (event: SelectChangeEvent) => {
    setFavouritesNumber(event.target.value);
  };

  const [getAllFavoritesPaginate, resultFavorites] =
    useGetAllFavoritesPaginateMutation();

  React.useEffect(() => {
    getAllFavoritesPaginate("");
  }, []);

  React.useEffect(() => {
    if (resultFavorites != null && resultFavorites != undefined) {
      if (resultFavorites.data != null) {
        setListFavorites(resultFavorites.data.data as ISheetDefaultProps[]);
      }
    }
  }, [resultFavorites]);

  const [deleteFavoriteSheet, resultDelete] = useDeleteFavoriteSheetMutation();
  const [postAddFavoriteSheet, resultAdd] = usePostAddFavoriteSheetMutation();

  const handleAddFavoriteSheet = (uuid: string) => {
    setCurrentUUID(uuid);
    postAddFavoriteSheet(uuid);
  };
  const handleDeleteFavoriteSheet = (uuid: string) => {
    setCurrentUUID(uuid);
    deleteFavoriteSheet(uuid);
  };

  React.useEffect(() => {
    if (
      resultDelete != null &&
      resultDelete != undefined &&
      resultDelete.isSuccess
    ) {
      getAllFavoritesPaginate("");
    }
  }, [resultDelete]);

  React.useEffect(() => {
    if (resultAdd != null && resultAdd != undefined && resultAdd.isSuccess) {
      getAllFavoritesPaginate("");
    }
  }, [resultAdd]);

  return (
    <WrapperFavourites>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="body2" component="p">
            Se han encontrado
            <Typography component="span" color="red" fontWeight={600}>
              {` ${resultFavorites.data?.total || 0} `}
            </Typography>
            lámina{(resultFavorites.data?.total || 0) != 1 && "s"} favorita
            {(resultFavorites.data?.total || 0) != 1 && "s"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7} marginTop={2} alignSelf={"center"}>
          <Typography
            variant="body1"
            component="span"
            fontWeight={400}
            paddingRight={2}
          >
            Mostrar
          </Typography>
          <Select
            value={favouritesNumber}
            onChange={handleChange}
            sx={{
              width: "fit-content",
              padding: "5px",
              borderRadius: "20px",
              maxHeight: "45px",
            }}
          >
            <MenuItem value={10} selected>
              10
            </MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={5} marginTop={2} alignSelf={"center"}>
          <SearchLamina
            placeHolder="Buscar"
            customStyle={`
              border-radius: 30px;
              background: #FFF;
              box-shadow: 0px 6px 20px 10px rgba(156, 156, 156, 0.25);
              backdrop-filter: blur(12.5px);
              `}
          />
        </Grid>
        <Grid item xs={12} marginTop={2}>
          <ListFavourites>
            {listFavorites.map((sheet) => {
              return (
                <CardLamina
                  key={sheet.uuid}
                  uuid={sheet.uuid}
                  image={sheet.tira}
                  nroLamina={sheet.code}
                  name={sheet.name}
                  isFavourite={sheet.isFavorite}
                  nroDownloads={200}
                  nroView={sheet.numberOfViews}
                  infoSheet={sheet}
                  handleAddFavoriteSheet={handleAddFavoriteSheet}
                  handleDeleteFavoriteSheet={handleDeleteFavoriteSheet}
                  isLoadingAdd={
                    resultAdd.isLoading && currentUUID == sheet.uuid
                  }
                  isLoadingDelete={
                    resultDelete.isLoading && currentUUID == sheet.uuid
                  }
                />
              );
            })}
          </ListFavourites>
        </Grid>
      </Grid>
    </WrapperFavourites>
  );
};

export default FavouriteSection;
