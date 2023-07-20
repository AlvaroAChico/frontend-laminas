import React from "react";
import styled from "styled-components";
import HeaderPlan from './header-plan/header-plan'
import Plan01Img from '../../assets/img/plan0.png'
import Plan02Img from '../../assets/img/plan1.png'
import Plan03Img from '../../assets/img/plan2.png'

const TableStylesMain = styled.table`
  width: 100%;
`;

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
      <thead>
        <tr>
          <th />
          <th><HeaderPlan title="Básico" image={Plan01Img} animation="BASIC" isRecommended={false}/></th>
          <th><HeaderPlan title="Intermedio" image={Plan02Img} animation="MEDIUM" isRecommended={true}/></th>
          <th><HeaderPlan title="Premium" image={Plan03Img} animation="PREMIUM" isRecommended={false}/></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Precio</td>
          <td>Free</td>
          <td>19.90</td>
          <td>29.90</td>
        </tr>
        <tr>
          <td>Editor</td>
          <td>Acceso parcial al Editor</td>
          <td>Acceso parcial al Editor</td>
          <td>Acceso completo al Editor</td>
        </tr>
        <tr>
          <td>Texto</td>
          <td>Acceso a fuentes gratuitas de texto</td>
          <td>Acceso a fuentes basicas de texto</td>
          <td>Acceso a fuentes premium de texto</td>
        </tr>
        <tr>
          <td>Imagenes</td>
          <td>Sube imagenes solo en JPG</td>
          <td>Sube imagenes en JPG y PNG</td>
          <td>Sube imagenes en JPG, PNG y JPEG</td>
        </tr>
        <tr>
          <td>Arturito</td>
          <td>Consulta con Arturito hasta 10 veces</td>
          <td>Consulta con Arturito hasta 30 veces</td>
          <td>Consultas ilimitadas a Arturito</td>
        </tr>
        <tr>
          <td>Formatos</td>
          <td>Descargas en A4 con marca de agua</td>
          <td>Descargas en A4, A3 y Oficio</td>
          <td>Descargas en A4, A3 y Oficio</td>
        </tr>
        <tr>
          <td>Descargas</td>
          <td>5 Descargas / mes</td>
          <td>50 Descargas</td>
          <td>100 Descargas</td>
        </tr>
        <tr>
          <td>Soporte</td>
          <td>Sin soporte</td>
          <td>Soporte comercial</td>
          <td>Soporte 24/7</td>
        </tr>
        <tr>
          <td />
          <td>Registrarme</td>
          <td>Comprar</td>
          <td>Comprar</td>
        </tr>
      </tbody>
    </TableStylesMain>
  );
};

export default Plans;
