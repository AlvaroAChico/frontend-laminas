import React from "react";
import styled from "styled-components";
import { ArrowIosBackOutline } from "@styled-icons/evaicons-outline/ArrowIosBackOutline";
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline/ArrowIosForwardOutline";

const ContainerPages = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
`;
const Page = styled.div`
  background: red;
  padding: 4px;
  border-radius: 10px;
  color: white;
`;
const ContainerPrev = styled.div``;
const ContainerNext = styled.div``;

interface IOwnProps {
  total: number;
}

const PaginatedComponent: React.FC<IOwnProps> = ({ total }) => {
  const pages = total / 15;

  const listPages = [];
  for (let i = 1; i <= pages; i++) {
    listPages.push(i);
  }

  return (
    <>
      <ContainerPages>
        <ContainerPrev>
          <ArrowIosBackOutline />
        </ContainerPrev>
        {listPages.map((item) => {
          if (item) return <Page key={Date.now()}>{item}</Page>;
        })}
        <ContainerNext>
          <ArrowIosForwardOutline />
        </ContainerNext>
      </ContainerPages>
    </>
  );
};

export default PaginatedComponent;
