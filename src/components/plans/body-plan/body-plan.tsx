import React from "react";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { StarFill } from "@styled-icons/bootstrap/StarFill";

const BodyPlanStyle = styled.div`
  position: relative;
  border-radius: 15px;
  background: white;
  box-shadow: 0px 8px 6px 6px rgba(54, 54, 54, 0.17);
  padding: 15px 0;
  height: 100%;
  width: 100%;

  > img {
    max-width: 90px;
  }

  > h6 {
    text-transform: uppercase;
    font-weight: 600;
  }
`;

const BaseDetails = styled.div`
  > div {
    opacity: 0.5;
  }
  > div:nth-child(1) {
    top: 30px;
    left: 25px;
  }
  > div:nth-child(2) {
    top: 20px;
    right: 30px;
  }
  > div:nth-child(3) {
    bottom: 35px;
    left: 65px;
  }
  > div:nth-child(4) {
    bottom: 22px;
    right: 35px;
  }
`;
const ListDetailsBasic = styled(BaseDetails)`
  > div {
    position: absolute;
    background: #0066ff;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
`;
const ListDetailsMedium = styled(BaseDetails)`
  > div {
    position: absolute;
    background: #55b65e;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
`;
const ListDetailsPremium = styled(BaseDetails)`
  > div {
    position: absolute;

    > svg {
      width: 100%;
      max-width: 15px;
      color: #bf953f;
    }
  }
`;

const ButtonBase = styled.div`
  box-shadow: 0px 6px 12px 10px rgba(182, 182, 182, 0.25);
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  color: white;
  width: 100%;
  margin: 10px 0;
`;
const CustomButtonBasic = styled(ButtonBase)`
  background: #6fa4f2;
`;
const CustomButtonMedium = styled(ButtonBase)`
  background: #55b65e;
`;
const CustomButtonPremium = styled(ButtonBase)`
  background: linear-gradient(
    to right,
    #bf953f,
    #fcf6ba,
    #b38728,
    #fbf5b7,
    #aa771c
  );
`;

const ContainerButtonsPay = styled.tr`
  background: white !important;

  > td {
    border: none !important;
  }
  > td:nth-child(2) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-width: 400px !important;
  }
`;

const BodyBasePlan = styled.div`
  padding: 10px;
  tex-align: center;
  display: flex;
  row-gap: 5px;
  flex-direction: column;
  font-weight: 300;
`;
const BodyBasicPlan = styled(BodyBasePlan)`
  > div:nth-child(1) {
    color: #6fa4f2;
  }
`;
const BodyMediumPlan = styled(BodyBasePlan)`
  > div:nth-child(1) {
    color: #55b65e;
  }
`;
const BodyPremiumPlan = styled(BodyBasePlan)`
  > div:nth-child(1) {
    color: #bf953f;
  }
`;

interface IOwnProps {
  bodyInfo: "BASIC" | "MEDIUM" | "PREMIUM";
  price: string;
  editor: string;
  text: string;
  images: string;
  arturito: string;
  formats: string;
  downloads: string;
  support: string;
  onlyText?: boolean;
}
const BodyPlan: React.FC<IOwnProps> = ({
  bodyInfo,
  price,
  editor,
  text,
  images,
  arturito,
  formats,
  downloads,
  support,
  onlyText = false,
}) => {
  return (
    <BodyPlanStyle>
      {bodyInfo == "BASIC" && (
        <>
          <BodyBasicPlan>
            {!onlyText && (
              <div>
                <Typography variant="h4" component="h4" fontWeight={600}>
                  {price}
                </Typography>
              </div>
            )}
            {onlyText && <div />}
            <div>
              <Typography variant="caption" component="span">
                {editor}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" component="span">
                {text}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" component="span">
                {images}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" component="span">
                {arturito}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" component="span">
                {formats}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" component="span">
                {downloads}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" component="span">
                {support}
              </Typography>
            </div>
            {!onlyText && (
              <div>
                <Typography
                  fontSize={8}
                  variant="caption"
                  component="p"
                  padding={0}
                  marginTop={2}
                >
                  Solo debes registrarte y tus beneficios serán cargados cada
                  mes
                </Typography>
                <CustomButtonBasic>Registrarme</CustomButtonBasic>
              </div>
            )}
          </BodyBasicPlan>
          <ListDetailsBasic>
            <div />
            <div />
            <div />
            <div />
          </ListDetailsBasic>
        </>
      )}
      {bodyInfo == "MEDIUM" && (
        <>
          <BodyMediumPlan>
            {!onlyText && (
              <div>
                <Typography variant="h4" component="h4" fontWeight={600}>
                  s/ {price}
                </Typography>
              </div>
            )}
            {onlyText && <div />}
            <div>
              <Typography variant="caption" component="span">
                {editor}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" component="span">
                {text}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" component="span">
                {images}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" component="span">
                {arturito}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" component="span">
                {formats}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" component="span">
                {downloads}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" component="span">
                {support}
              </Typography>
            </div>
            {!onlyText && (
              <div>
                <CustomButtonMedium>Comprar</CustomButtonMedium>
              </div>
            )}
          </BodyMediumPlan>
          <ListDetailsMedium>
            <div />
            <div />
            <div />
            <div />
          </ListDetailsMedium>
        </>
      )}
      {bodyInfo == "PREMIUM" && (
        <>
          <BodyPremiumPlan>
            {!onlyText && (
              <div>
                <Typography variant="h4" component="h4" fontWeight={600}>
                  s/ {price}
                </Typography>
              </div>
            )}
            {onlyText && <div />}
            <div>
              <Typography variant="caption" component="span">
                {editor}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" component="span">
                {text}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" component="span">
                {images}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" component="span">
                {arturito}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" component="span">
                {formats}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" component="span">
                {downloads}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" component="span">
                {support}
              </Typography>
            </div>
            {!onlyText && (
              <div>
                <CustomButtonPremium>Comprar</CustomButtonPremium>
              </div>
            )}
          </BodyPremiumPlan>
          <ListDetailsPremium>
            <div>
              <StarFill />
            </div>
            <div>
              <StarFill />
            </div>
            <div>
              <StarFill />
            </div>
            <div>
              <StarFill />
            </div>
          </ListDetailsPremium>
        </>
      )}
    </BodyPlanStyle>
  );
};

export default BodyPlan;
