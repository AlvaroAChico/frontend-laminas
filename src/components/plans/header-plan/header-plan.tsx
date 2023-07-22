import React from 'react'
import { Typography, Box } from '@mui/material'
import styled from 'styled-components'
import { StarFill } from '@styled-icons/bootstrap/StarFill'

const HeaderPlanStyle = styled.div`
  position: relative;
  border-radius: 15px;
  background: white;
  box-shadow: 0px 8px 6px 6px rgba(54, 54, 54, 0.17);
  padding: 15px 0;
  height: 100%;
  width: 100%;

  > img{
    max-width: 90px;
  }

  > h6 {
    text-transform: uppercase;
    font-weight: 600;
  }
`
const BarHeaderBase = styled.div`
  border-radius: 50px 50px 0 0;
  position: absolute;
  height: 15px;
  width: 100%;
  top: 0px;
`
const BarHeaderBasic = styled(BarHeaderBase)`
  background: #0066FF;
`
const BarHeaderMedium = styled(BarHeaderBase)`
  background: #55B65E;
`
const BarHeaderPremium = styled(BarHeaderBase)`
  background: #BF953F;
`

const BaseDetails = styled.div`
  > div{
    opacity: 0.5;
  }
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
        {animation == "BASIC" && (
          <>
            <BarHeaderBasic /> 
            <ListDetailsBasic>
              <div />
              <div />
              <div />
              <div />
            </ListDetailsBasic>
          </>
        )}
        {animation == "MEDIUM" && (
          <>
            <BarHeaderMedium />
            <ListDetailsMedium>
              <div />
              <div />
              <div />
              <div />
            </ListDetailsMedium>
          </>
        )}
        {animation == "PREMIUM" && (
          <>
            <BarHeaderPremium />
            <ListDetailsPremium>
              <div><StarFill /></div>
              <div><StarFill /></div>
              <div><StarFill /></div>
              <div><StarFill /></div>
            </ListDetailsPremium>
          </>
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
        {animation == "BASIC" && (<Typography variant="subtitle2" component="h6" color="#0066FF">{title}</Typography>)}
        {animation == "MEDIUM" && (<Typography variant="subtitle2" component="h6" color="#55B65E">{title}</Typography>)}
        {animation == "PREMIUM" && (<Typography variant="subtitle2" component="h6" color="#BF953F">{title}</Typography>)}
    </HeaderPlanStyle>
  )
}

export default HeaderPlan;