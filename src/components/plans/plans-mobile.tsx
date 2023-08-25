import React from "react";
import styled from "styled-components";
import { Typography } from '@mui/material'
import HeaderPlan from './header-plan/header-plan'
import BodyPlan from './body-plan/body-plan'
import Plan01Img from '../../assets/img/plan0.png'
import Plan02Img from '../../assets/img/plan1.png'
import Plan03Img from '../../assets/img/plan2.png'
import { listPlans } from './data/plans-info'

const ContainerPlansMobile = styled.div`
  width: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  column-gap: 1rem;
  row-gap: 2rem;
  
  @media (min-width:100px){
    grid-template-columns: repeat(1, 1fr);
  }
  @media (min-width:520px){
    grid-template-columns: repeat(1, 1fr);
  }
  @media (min-width:728px){
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width:1024px){
    grid-template-columns: repeat(3, 1fr);
  }
`
const WrapperItemPlan = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  row-gap: 15px;
`
  
interface IOwnProps {
  basicAction: () => void;
  mediumAction: () => void;
  premiumAction: () => void;
}

const PlansMobile: React.FC<IOwnProps> = ({
  basicAction,
  mediumAction,
  premiumAction,
}) => {
  return (
    <ContainerPlansMobile>
      {(listPlans || []).map((plan) => (
        <WrapperItemPlan key={plan.name}>
          {plan.name == 'BASIC' && <HeaderPlan title="Básico" image={Plan01Img} animation="BASIC" isRecommended={false}/>}
          {plan.name == 'MEDIUM' && <HeaderPlan title="Intermedio" image={Plan02Img} animation="MEDIUM" isRecommended={true}/>}
          {plan.name == 'PREMIUM' && <HeaderPlan title="Premium" image={Plan03Img} animation="PREMIUM" isRecommended={false}/>}
          <BodyPlan
            bodyInfo={plan.name as ('BASIC' | 'MEDIUM' | 'PREMIUM')}
            price={plan.price}
            editor={plan.editor}
            text={plan.text}
            images={plan.images}
            arturito={plan.arturito}
            formats={plan.formats}
            downloads={plan.downloads}
            support={plan.support}
            basicAction={basicAction}
            mediumAction={mediumAction}
            premiumAction={premiumAction}
          />
        </WrapperItemPlan>
      ))}
    </ContainerPlansMobile>
  );
};

export default PlansMobile;
