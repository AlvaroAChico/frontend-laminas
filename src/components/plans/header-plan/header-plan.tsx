import React from 'react'
import { Typography, Box } from '@mui/material'
import styled from 'styled-components'
import { StarFill } from '@styled-icons/bootstrap/StarFill'

const HeaderPlanStyle = styled.div`
  position: relative;
  border-radius: 20px;
  background: white;
  box-shadow: 0px 8px 6px 6px rgba(54, 54, 54, 0.17);
`
const BarHeader = styled.div`
  position: absolute;
  border-radius: 20px 20px 0 0;
  height: 10px;
`

const BaseDetails = styled.div`
  > div:nth-child(1){
    top: 30px;
    left: 25px;
  }
  > div:nth-child(2){
    top: 20px;
    right: 30px;
  }
  > div:nth-child(3){
    bottom: 35px;
    left: 65px;
  }
  > div:nth-child(4){
    bottom: 22px;
    right: 35px;
  }
`
const ListDetailsBasic = styled(BaseDetails)`
  > div {
    position: absolute;
    background: #0066FF;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
`
const ListDetailsMedium = styled(BaseDetails)`
  > div {
    position: absolute;
    background: #55B65E;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
`
const ListDetailsPremium = styled(BaseDetails)`
  > div {
    position: absolute;
    
    > svg{
      width: 100%;
      max-width: 15px;
      color: #BF953F;
    }
  }
`

interface IOwnProps{
    title: string;
    image: string;  
    animation: "BASIC" | "MEDIUM" | "PREMIUM";
    isRecommended: boolean;
}
const HeaderPlan: React.FC<IOwnProps> = ({ title, image, animation, isRecommended }) => {
  return (
    <HeaderPlanStyle>
        <BarHeader /> 
        {animation == "BASIC" && (
          <ListDetailsBasic>
            <div />
            <div />
            <div />
            <div />
          </ListDetailsBasic>
        )}
        {animation == "MEDIUM" && (
          <ListDetailsMedium>
            <div />
            <div />
            <div />
            <div />
          </ListDetailsMedium>
        )}
        {animation == "PREMIUM" && (
          <ListDetailsPremium>
            <div><StarFill /></div>
            <div><StarFill /></div>
            <div><StarFill /></div>
            <div><StarFill /></div>
          </ListDetailsPremium>
        )}
        <Box
          component="img"
          sx={{
            padding: "4px",
            maxWidth: { xs: 160, sm: 140, md: 160 },
            marginBottom: "15px",
          }}
          alt="Logo de Elaminas"
          src={image}
        />
        <Typography>{title}</Typography>
    </HeaderPlanStyle>
  )
}

export default HeaderPlan