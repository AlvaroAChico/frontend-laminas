import React from "react";
import CardLamina from "../../../components/card-lamina/card-lamina";
import { listLaminas } from "../../../config/mocks/list-laminas";
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
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
              action={() => console.log}
              Icon={ArrowIosForwardOutline}
            />
          }
        />
      </SectionMax>
      <WrapperSliderMain>
        <WrapperNavigationPrev
          onClick={() => {
            sliderRef!.current!.slickPrev();
          }}
        >
          <ArrowIosBackOutline />
        </WrapperNavigationPrev>
        <Slider ref={sliderRef} {...settings}>
          {listLaminas.map((lamina) => (
            <ItemSlick key={Date.now()}>
              <CardLamina
                id={lamina.id}
                image={lamina.image}
                nroLamina={lamina.nroLamina}
                name={lamina.name}
                isFavourite={lamina.isFavourite}
                nroDownloads={lamina.nroDownloads}
                nroView={lamina.nroView}
              />
            </ItemSlick>
          ))}
        </Slider>
        <WrapperNavigationNext
          onClick={() => {
            sliderRef!.current!.slickNext();
          }}
        >
          <ArrowIosForwardOutline />
        </WrapperNavigationNext>
      </WrapperSliderMain>
    </WrapperSlider>
  );
};

export default SectionLaminas;
