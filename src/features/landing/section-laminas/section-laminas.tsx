import React from "react";
import CardLamina from "../../../components/card-lamina/card-lamina";
import { useGetRecommendedSheetsQuery } from "../../../core/store/sheets/sheetsAPI";
import styled from "styled-components";
import { breakpoints } from "../../../constants/breakpoints";
import { ArrowIosBackOutline } from "@styled-icons/evaicons-outline/ArrowIosBackOutline";
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline/ArrowIosForwardOutline";
import CustomTitle from "../../../components/custom-title/custom-title";
import CustomButtom from "../../../components/custom-button/custom-button";
import PencilImg from "../../../assets/img/pencil_icon.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionMax from "../../../components/section-max/section-max";
import { settings } from "./config-slider";
import { ISheetDefaultProps } from "../../../core/store/sheets/types/laminas-type";
import SectionLaminasSkeleton from "./skeleton/section-laminas-skeleton";

const WrapperSlider = styled.div`
  height: 100%;
  width: 100%;
  padding: 50px 5px;
  position: relative;
  overflow-x: hidden;
`;

const WrapperSliderMain = styled.div`
  position: relative;
  padding: 20px 6%;
  max-width: 1200px;
  margin: auto;

  ${breakpoints.tabletLMin} {
    padding: 20px 4%;
  }
`;

const WrapperNavigation = styled.div`
  display: grid;
  place-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 3;
  color: black;
  cursor: pointer;

  > svg {
    width: 100%;
    max-width: 50px;
  }
`;

const WrapperNavigationPrev = styled(WrapperNavigation)`
  left: 10px;
`;
const WrapperNavigationNext = styled(WrapperNavigation)`
  right: 10px;
`;

const ItemSlick = styled.div`
  display: grid;
  place-items: center;
  padding: 10px 20px;
`;

const WrapperPencilImg = styled.img`
  position: absolute;
  right: -130px;
  width: 350px;
  bottom: 0;
  opacity: 0.2;
`;

const SectionLaminas: React.FC = () => {
  const sliderRef = React.useRef<any>(null);

  const { data, isLoading } = useGetRecommendedSheetsQuery("");

  return (
    <>
      {/* {(data || []).length > 0 && ( */}
      <WrapperSlider>
        <WrapperPencilImg src={PencilImg} />
        <SectionMax>
          <CustomTitle
            title="Láminas recomendadas del mes"
            primaryAction={
              <CustomButtom
                style="SECONDARY"
                borderStyle="OUTLINE"
                title="Ver todas las láminas"
                Icon={ArrowIosForwardOutline}
                to={"/laminas"}
              />
            }
          />
        </SectionMax>
        <WrapperSliderMain>
          {(data || []).length > 3 && (
            <WrapperNavigationPrev
              onClick={() => {
                sliderRef!.current!.slickPrev();
              }}
            >
              <ArrowIosBackOutline />
            </WrapperNavigationPrev>
          )}
          <Slider ref={sliderRef} {...settings}>
            {(data || []).map((sheet: ISheetDefaultProps) => {
              return (
                <ItemSlick key={sheet.code}>
                  <CardLamina
                    image={sheet.tira}
                    nroLamina={sheet.code}
                    name={sheet.name}
                    isFavourite={sheet.isFavorite}
                    uuid={sheet.uuid}
                    nroDownloads={100}
                    nroView={sheet.numberOfViews}
                    infoSheet={sheet}
                    handleAddFavoriteSheet={() => null}
                    handleDeleteFavoriteSheet={() => null}
                    isLoadingAdd={false}
                    isLoadingDelete={false}
                  />
                </ItemSlick>
              );
            })}
          </Slider>
          {(data || []).length > 3 && (
            <WrapperNavigationNext
              onClick={() => {
                sliderRef!.current!.slickNext();
              }}
            >
              <ArrowIosForwardOutline />
            </WrapperNavigationNext>
          )}
        </WrapperSliderMain>
        {isLoading && <SectionLaminasSkeleton />}
      </WrapperSlider>
      {/* )} */}
    </>
  );
};

export default SectionLaminas;
