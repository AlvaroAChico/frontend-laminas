import React from "react";
import styled from "styled-components";
import { Typography } from '@mui/material'
import HeaderPlan from './header-plan/header-plan'
import Plan01Img from '../../assets/img/plan0.png'
import Plan02Img from '../../assets/img/plan1.png'
import Plan03Img from '../../assets/img/plan2.png'

const TableStylesMain = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 20px 10px;
`;
const ContainerHeadTable = styled.thead`
  > tr th{
    padding: 20px;
  }

 > tr th:nth-child(3) > div img {
   max-width: 95px !important;
  }
  > tr th:nth-child(4) > div img {
    max-width: 110px !important;
  }
`

const ContainerBodyTable = styled.tbody`
  > tr {
    background: #f3f3f3;
    border-radius: 20px;
  }
  
  > tr:nth-child(10){
    background: white !important;

    > td {
      border: none !important;
    }
  }

  > tr td:nth-child(1){
    padding: 0 10px;
  }
  > tr td:nth-child(n+2){
    text-align: center;
    padding: 10px;
    max-width: 150px;
  }
  > tr td:nth-child(2){
    border-top: 0.5px solid #0066FF;
    border-bottom: 0.5px solid #0066FF;
  }
  > tr td:nth-child(3){
    border-top: 0.5px solid #55B65E;
    border-bottom: 0.5px solid #55B65E;
  }
  > tr td:nth-child(4){
    border-top: 0.5px solid #BF953F;
    border-bottom: 0.5px solid #BF953F;
  }
`

const ButtonBase = styled.div`
  box-shadow: 0px 6px 12px 10px rgba(182, 182, 182, 0.25);
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  color: white;
  width: 100%;
`
const CustomButtonBasic = styled(ButtonBase)`
  background: #6FA4F2;
`
const CustomButtonMedium = styled(ButtonBase)`
  background: #55B65E;
`
const CustomButtonPremium = styled(ButtonBase)`
  background:linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
`

const ContainerButtonsPay = styled.tr`
  background: white !important;

  > td {
    border: none !important;
  }
  > td:nth-child(2){
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-width: 400px !important;
  }
`

interface IOwnProps {
  basicAction: () => void;
  mediumAction: () => void;
  premiumAction: () => void;
}

const Plans: React.FC<IOwnProps> = ({
  basicAction,
  mediumAction,
  premiumAction,
}) => {
  return (
    <TableStylesMain>
      <ContainerHeadTable>
        <tr>
          <th />
          <th><HeaderPlan title="Básico" image={Plan01Img} animation="BASIC" isRecommended={false}/></th>
          <th><HeaderPlan title="Intermedio" image={Plan02Img} animation="MEDIUM" isRecommended={true}/></th>
          <th><HeaderPlan title="Premium" image={Plan03Img} animation="PREMIUM" isRecommended={false}/></th>
        </tr>
      </ContainerHeadTable>
      <ContainerBodyTable>
        <tr>
          <td><Typography variant="caption" component="span" fontWeight={"600"}>Precio</Typography></td>
          <td><Typography variant="h4" component="h4" fontWeight={"600"} color="#0066FF">Free</Typography></td>
          <td><Typography variant="h4" component="h4" fontWeight={"600"} color="#55B65E"><Typography variant="caption" component="span" fontWeight={600}>s/</Typography> 19.90</Typography></td>
          <td><Typography variant="h4" component="h4" fontWeight={"600"} color="#BF953F"><Typography variant="caption" component="span" fontWeight={600}>s/</Typography> 29.90</Typography></td>
        </tr>
        <tr>
          <td><Typography variant="caption" component="span" fontWeight={"600"}>Editor</Typography></td>
          <td><Typography variant="caption" component="span">Acceso parcial al Editor</Typography></td>
          <td><Typography variant="caption" component="span">Acceso parcial al Editor</Typography></td>
          <td><Typography variant="caption" component="span">Acceso completo al Editor</Typography></td>
        </tr>
        <tr>
          <td><Typography variant="caption" component="span" fontWeight={"600"}>Texto</Typography></td>
          <td><Typography variant="caption" component="span">Acceso a fuentes gratuitas de texto</Typography></td>
          <td><Typography variant="caption" component="span">Acceso a fuentes basicas de texto</Typography></td>
          <td><Typography variant="caption" component="span">Acceso a fuentes premium de texto</Typography></td>
        </tr>
        <tr>
          <td><Typography variant="caption" component="span" fontWeight={"600"}>Imagenes</Typography></td>
          <td><Typography variant="caption" component="span">Sube imagenes solo en JPG</Typography></td>
          <td><Typography variant="caption" component="span">Sube imagenes en JPG y PNG</Typography></td>
          <td><Typography variant="caption" component="span">Sube imagenes en JPG, PNG y JPEG</Typography></td>
        </tr>
        <tr>
          <td><Typography variant="caption" component="span" fontWeight={"600"}>Arturito</Typography></td>
          <td><Typography variant="caption" component="span">Consulta con Arturito hasta 10 veces</Typography></td>
          <td><Typography variant="caption" component="span">Consulta con Arturito hasta 30 veces</Typography></td>
          <td><Typography variant="caption" component="span">Consultas ilimitadas a Arturito</Typography></td>
        </tr>
        <tr>
          <td><Typography variant="caption" component="span" fontWeight={"600"}>Formatos</Typography></td>
          <td><Typography variant="caption" component="span">Descargas en A4 con marca de agua</Typography></td>
          <td><Typography variant="caption" component="span">Descargas en A4, A3 y Oficio</Typography></td>
          <td><Typography variant="caption" component="span">Descargas en A4, A3 y Oficio</Typography></td>
        </tr>
        <tr>
          <td><Typography variant="caption" component="span" fontWeight={"600"}>Descargas</Typography></td>
          <td><Typography variant="caption" component="span">5 Descargas / mes</Typography></td>
          <td><Typography variant="caption" component="span">50 Descargas</Typography></td>
          <td><Typography variant="caption" component="span">100 Descargas</Typography></td>
        </tr>
        <tr>
          <td><Typography variant="caption" component="span" fontWeight={"600"}>Soporte</Typography></td>
          <td><Typography variant="caption" component="span">Sin soporte</Typography></td>
          <td><Typography variant="caption" component="span">Soporte comercial</Typography></td>
          <td><Typography variant="caption" component="span">Soporte 24/7</Typography></td>
        </tr>
        <ContainerButtonsPay>
          <td />
          <td>
            <CustomButtonBasic>Registrarme</CustomButtonBasic>
          </td>
          <td><CustomButtonMedium>Comprar</CustomButtonMedium></td>
          <td><CustomButtonPremium>Comprar</CustomButtonPremium></td>
        </ContainerButtonsPay>
        <tr>
          <td />
          <td>
            <Typography fontSize={8} variant="caption" component="p" padding={0} sx={{ marginTop: "-15px"}}>
              Solo debes registrarte y tus beneficios serán cargados cada mes
            </Typography>
          </td>
          <td />
          <td />
        </tr  >
      </ContainerBodyTable>
    </TableStylesMain>
  );
};

export default Plans;
