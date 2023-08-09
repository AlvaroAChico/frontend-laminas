import React from "react";
import styled from "styled-components";
import CustomTitle from "../../../components/custom-title/custom-title";
import { breakpoints } from "../../../constants/breakpoints";
import { ArrowIosBackOutline } from "@styled-icons/evaicons-outline/ArrowIosBackOutline";
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline/ArrowIosForwardOutline";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { listCategories } from "../../../config/mocks/list-categories";
import CardCategory from "./components/card-category/card-category";
import SectionMax from "../../../components/section-max/section-max";
import { useGetCategoriesQuery } from "../../../core/store/categories/categoriesAPI";

const WrapperCategories = styled.div`
  height: 100%;
  width: 100%;
  padding: 50px 5px;
`;

const WrapperCategoriesMain = styled.div`
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

const SectionCategories: React.FC = () => {
  const sliderRef = React.useRef<any>(null);

  const { data } = useGetCategoriesQuery("");

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
    <WrapperCategories>
      <SectionMax>
        <CustomTitle title="Clasificación por cursos" />
      </SectionMax>
      <WrapperCategoriesMain>
        <WrapperNavigationPrev
          onClick={() => {
            sliderRef!.current!.slickPrev();
          }}
        >
          <ArrowIosBackOutline />
        </WrapperNavigationPrev>
        <Slider ref={sliderRef} {...settings}>
          {(data || []).map((category) => (
            <ItemSlick key={Date.now()}>
              <CardCategory
                id={category.id}
                image={category.image}
                name={category.name}
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
      </WrapperCategoriesMain>
    </WrapperCategories>
  );
};

export default SectionCategories;
