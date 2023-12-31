import React from "react";
import HeaderSearch from "../../components/header-search/header-search";
import CustomTitle from "../../components/custom-title/custom-title";
import SectionMax from "../../components/section-max/section-max";
import CardLamina from "../../components/card-lamina/card-lamina";
import { customPalette } from "../../config/theme/theme";
import {
  Chip,
  Grid,
  Select,
  Drawer,
  MenuItem,
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { Filter } from "@styled-icons/feather/Filter";
import { ArrowIosDownward } from "@styled-icons/evaicons-solid/ArrowIosDownward";
import styled from "styled-components";
import {
  useGetAllSheetsPaginateMutation,
  useGetPopularSheetsQuery,
} from "../../core/store/sheets/sheetsAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  clearAllDataSheets,
  getCurrentPage,
  getCurrentSearchCategory,
  getCurrentSearchWord,
  getCurrentSize,
  getListSheets,
  updateAddFavoriteSheet,
  updateAllSheets,
  updateCurrentPage,
  updateCurrentSearchCategory,
  updateCurrentSearchWord,
  updateCurrentSize,
  updateDeleteFavoriteSheet,
} from "../../core/store/sheets/sheetsSlice";
import { ISheetDefaultProps } from "../../core/store/sheets/types/laminas-type";
import CustomButton from "../../components/custom-button/custom-button";
import CardLaminaSkeleton from "../../components/card-lamina/card-lamina-skeleton";
import { APP_CONSTANS } from "../../constants/app";
import {
  useDeleteFavoriteSheetMutation,
  usePostAddFavoriteSheetMutation,
} from "../../core/store/favorites/favoritesAPI";
import { Toaster, toast } from "react-hot-toast";
import Lottie from "lottie-react";
import NoResultAnimation from "../../assets/json/no_results_animation.json";
import { useGetCategoriesQuery } from "../../core/store/categories/categoriesAPI";

const WrapperLaminasPage = styled.div`
  padding: 20px;
  width: 100%;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px auto;

  > div:nth-child(1){
    display: inherit;
    justify-content; center;
    align-items: center;
    
    > div:nth-child(1){
      background: ${customPalette.primaryColor};
      border-radius: 30px;
      padding: 10px 20px;
      display: inherit;
      cursor: pointer;
      color: white;
      margin-right: 10px;
      
      > svg{
        width: 15px;
      }
    }
  }
  > div:nth-child(2){
    display: inherit;
    justify-content; center;
    align-items: center;
  }
`;

const ListLaminas = styled.div`
  width: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
    grid-template-columns: repeat(3, 1fr);
  }
`;
const WrapperFilterMenu = styled.div`
  max-width: 250px;
  min-width: 250px;
  background: #082f76;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  position: relative;
  overflow: hidden;
`;
const ItemCourse = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid gray;
  border-radius: 10px;
  align-items: center;
  padding: 4px 8px;
  margin: 6px 0;
  transition: 0.5s;
  cursor: pointer;

  > div {
    background: ${customPalette.secondaryColor};
    color: white;
  }

  :hover {
    background: #d6e6fd;
  }
`;
const BaseAccordion = styled(Accordion)`
  border: 1px solid ${customPalette.secondaryColor};
  border-radius: 10px;
  margin: 6px;

  > svg {
    width: 15px;
  }
`;
const SerchAccordion = styled(BaseAccordion)``;
const CoursesAccordion = styled(BaseAccordion)``;

const NoResultContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 20px;
  gap: 8px;

  > h5 {
    color: ${customPalette.primaryColor};
  }
  > h6 {
    color: ${customPalette.secondaryColor};
  }
`;

const LaminasPage: React.FC = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [optionQuery, setOptionQuery] = React.useState<number>(1);
  const [statusFilter, setStatusFilter] = React.useState(false);
  const [currentUUID, setCurrentUUID] = React.useState("");
  const currentSearchWord = useAppSelector(getCurrentSearchWord);
  const currentSearchCategory = useAppSelector(getCurrentSearchCategory);
  const currentSize = useAppSelector(getCurrentSize);
  const currentPage = useAppSelector(getCurrentPage);
  const listSheets = useAppSelector(getListSheets);
  const dispatch = useAppDispatch();

  const [getAllSheetsPaginate, resultSheets] =
    useGetAllSheetsPaginateMutation();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleMoreSheets = () => {
    setOptionQuery(2);
    dispatch(updateCurrentPage(currentPage + 1));
    getAllSheetsPaginate({
      page: currentPage + 1,
      size: currentSize,
      word: currentSearchWord,
    });
  };

  const handleUpdateSearchWord = (value: string) => {
    dispatch(updateCurrentSearchWord(value));
    localStorage.setItem(APP_CONSTANS.PENDING_SEARCH_WORD, value);
  };

  const handleChangeSize = (e: any) => {
    dispatch(updateCurrentSize(e.target.value));
    setOptionQuery(1);
    getAllSheetsPaginate({
      page: currentPage,
      size: e.target.value,
      word: currentSearchWord,
    });
  };

  const handleGetSheets = React.useCallback(() => {
    setOptionQuery(1);
    dispatch(clearAllDataSheets());
    const newWord = localStorage.getItem(APP_CONSTANS.PENDING_SEARCH_WORD);
    getAllSheetsPaginate({
      page: currentPage,
      size: currentSize,
      word: newWord || "",
    });
  }, []);

  React.useEffect(() => {
    getAllSheetsPaginate({
      page: currentPage,
      size: currentSize,
      word: currentSearchWord,
      category: currentSearchCategory,
    });
  }, []);

  React.useEffect(() => {
    if (resultSheets != null && resultSheets.data != null) {
      if (optionQuery == 1) {
        // replace list
        dispatch(updateAllSheets(resultSheets!.data.data || []));
      }
      if (optionQuery == 2) {
        // update list
        const newList: ISheetDefaultProps[] = [
          ...listSheets,
          ...resultSheets!.data.data,
        ];
        dispatch(updateAllSheets(newList));
      }
    }
  }, [resultSheets]);

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
      dispatch(updateDeleteFavoriteSheet(currentUUID));
      toast.success("Se quitó la lámina de favoritos");
    }
  }, [resultDelete]);

  React.useEffect(() => {
    if (resultAdd != null && resultAdd != undefined && resultAdd.isSuccess) {
      dispatch(updateAddFavoriteSheet(currentUUID));
      toast.success("Se agregó la lámina a favoritos");
    }
  }, [resultAdd]);

  const { data: dataCategories, isLoading: isLoadingCategories } =
    useGetCategoriesQuery("");
  const { data: dataPopularSearch, isLoading: isLoadingPopularSearch } =
    useGetPopularSheetsQuery("");

  const handleSearchCategory = (category: string) => {
    dispatch(updateCurrentSearchWord(""));
    dispatch(updateCurrentSearchCategory(category));
    handleCustomGetSheets(currentPage, currentSize, "", category);
  };

  const handleSearchPopular = (word: string) => {
    dispatch(updateCurrentSearchCategory(""));
    dispatch(updateCurrentSearchWord(word));
    handleCustomGetSheets(currentPage, currentSize, word, "");
  };

  const handleClearFilter = () => {
    dispatch(updateCurrentSearchCategory(""));
    dispatch(updateCurrentSearchWord(""));
    dispatch(updateCurrentPage(1));
    handleCustomGetSheets(1, "10", "", "");
  };

  const handleCustomGetSheets = (
    customPage: number,
    customSize: string,
    customWord: string,
    customCategory: string
  ) => {
    getAllSheetsPaginate({
      page: customPage,
      size: customSize,
      word: customWord,
      category: customCategory,
    });
    setStatusFilter(false);
  };
  return (
    <>
      <Toaster />
      <HeaderSearch
        title="Láminas"
        handleSetData={handleUpdateSearchWord}
        handleKeyUp={handleGetSheets}
        isLoading={resultSheets.isLoading}
      />
      <WrapperLaminasPage>
        <SectionMax>
          {resultSheets.isSuccess && resultSheets.data.total > 0 && (
            <FilterContainer>
              <div>
                <div onClick={() => setStatusFilter(true)}>
                  <Filter />
                  <Typography variant="caption" component="span">
                    Filtros
                  </Typography>
                </div>
                <div>
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
                      value={currentSize}
                      onChange={handleChangeSize}
                      sx={{
                        width: "fit-content",
                        padding: "5px",
                        borderRadius: "20px",
                        maxHeight: "45px",
                      }}
                    >
                      <MenuItem value={10} selected={currentSize == "10"}>
                        10
                      </MenuItem>
                      <MenuItem value={15} selected={currentSize == "15"}>
                        15
                      </MenuItem>
                      <MenuItem value={20} selected={currentSize == "20"}>
                        20
                      </MenuItem>
                    </Select>
                  </Grid>
                </div>
              </div>
              {!!resultSheets.data && resultSheets.data.total > 0 && (
                <div>
                  {!!resultSheets.data && (
                    <Typography>
                      Se han encontrado{" "}
                      <strong>{resultSheets.data.total}</strong> láminas
                    </Typography>
                  )}
                </div>
              )}
            </FilterContainer>
          )}
          {resultSheets.isSuccess && resultSheets.data.total <= 0 && (
            <NoResultContainer>
              <div>
                <Lottie
                  animationData={NoResultAnimation}
                  loop={true}
                  width={100}
                />
              </div>
              <Typography variant="h5" component="h5">
                No se encontraron resultados para esta búsqueda
              </Typography>
              <Typography variant="h6" component="h6">
                Te invitamos a intentar otra búsqueda
              </Typography>
            </NoResultContainer>
          )}
          <ListLaminas>
            {(listSheets || []).map((sheet: ISheetDefaultProps) => (
              <div key={sheet.uuid}>
                <CardLamina
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
              </div>
            ))}
            {resultSheets.isLoading && (
              <>
                <CardLaminaSkeleton />
                <CardLaminaSkeleton />
                <CardLaminaSkeleton />
              </>
            )}
          </ListLaminas>
          {resultSheets.isSuccess && resultSheets.data.nextPageUrl != null && (
            <div>
              <CustomButton
                title="Más resultados"
                style="SECONDARY"
                borderStyle="NONE"
                Icon={ArrowIosDownward}
                action={handleMoreSheets}
                isLoading={false}
                customStyle={`
                border-color: white;
                color: white;
                width: fit-content;
                padding: 12px 30px;
                margin: 40px auto 20px;
                `}
              />
            </div>
          )}
        </SectionMax>
      </WrapperLaminasPage>
      <Drawer
        anchor={"left"}
        open={statusFilter}
        onClose={() => setStatusFilter(false)}
        sx={{ maxWidth: "250px" }}
      >
        <WrapperFilterMenu>
          <div>
            <CoursesAccordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary expandIcon={<ArrowIosDownward />}>
                <Typography sx={{ maxWidth: 200, flexShrink: 0 }}>
                  Categorias
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {(dataCategories || []).map((category) => (
                  <ItemCourse
                    key={category.id}
                    onClick={() => handleSearchCategory(category.name)}
                  >
                    <Typography variant="caption" component="span">
                      {category.name}
                    </Typography>
                    {/* <Chip label="999" /> */}
                  </ItemCourse>
                ))}
              </AccordionDetails>
            </CoursesAccordion>
            <SerchAccordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary expandIcon={<ArrowIosDownward />}>
                <Typography sx={{ maxWidth: 200, flexShrink: 0 }}>
                  Más buscados
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {(dataPopularSearch || []).map((popular) => (
                  <ItemCourse
                    key={popular.id}
                    onClick={() => handleSearchPopular(popular.name)}
                  >
                    <Typography variant="caption" component="span">
                      {popular.name}
                    </Typography>
                    {/* <Chip label="999" /> */}
                  </ItemCourse>
                ))}
              </AccordionDetails>
            </SerchAccordion>
          </div>
          <div>
            <Typography
              color={"white"}
              textAlign="right"
              sx={{
                cursor: "pointer",

                ":hover": {
                  textDecoration: "underline",
                  textDecorationThickness: "1px",
                },
              }}
              onClick={handleClearFilter}
            >
              Limpiar fitros
            </Typography>
          </div>
        </WrapperFilterMenu>
      </Drawer>
    </>
  );
};

export default LaminasPage;
