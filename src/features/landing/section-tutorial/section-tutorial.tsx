import React from "react";
import styled from "styled-components";
import SectionMax from "../../../components/section-max/section-max";
import { Box, Grid, Typography } from "@mui/material";
import { customPalette } from "../../../config/theme/theme";
import ReactPlayer from "react-player";
import WaveIcon from "../../../assets/img/wave_icon.png";
import CustomButtom from "../../../components/custom-button/custom-button";
import { Phone } from "styled-icons/boxicons-regular";
import RuleImg from "../../../assets/img/rule_icon.png";
import Tutorial01IMG from "../../../assets/img/tutorial_01.png";
import Tutorial02IMG from "../../../assets/img/tutorial_02.png";
import { PlayCircleFill } from "@styled-icons/bootstrap/PlayCircleFill";
import { useAppDispatch } from "../../../app/hooks";
import {
  updateCurrentTutorialURI,
  updateStatusModalTutorial,
} from "../../../core/store/app-store/appSlice";

const WrapperTutorialMain = styled.div`
  background: rgba(85, 182, 94, 0.19);
  padding: 4% 0;
  position: relative;
  overflow-x: hidden;
`;
const WrapperPlayerFirst = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 240px;
  width: 350px;
  margin: auto;

  > img {
    position: absolute;
    top: -30px;
    right: -40px;
  }
`;

const WrapperPlayerSecond = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 240px;
  width: 350px;
  margin: auto;

  > img {
    position: absolute;
    top: -10px;
    left: -50px;
  }
`;

const WrapperVideoPlayer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  padding: 20px;
  border-radius: 25px;
  backdrop-filter: blur(10px);

  > div:nth-child(1) {
    position: relative;
  }
  > div div:nth-child(1) {
    width: inherit !important;
    height: fit-content !important;

    > div div iframe {
      max-height: 200px;
      max-width: 350px;
    }
  }
`;
const WrapperVideoPlayerFirst = styled(WrapperVideoPlayer)`
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 6px 12px 10px rgba(182, 182, 182, 0.25);
`;
const WrapperVideoPlayerSecond = styled(WrapperVideoPlayer)`
  background: rgba(220, 186, 68, 0.8);
  box-shadow: 0px 6px 12px 10px rgba(182, 182, 182, 0.25);
`;

const OverlayPlay = styled.div`
  background: #000000b5;
  place-items: center;
  position: absolute;
  max-height: 170px;
  display: grid;
  margin: auto;
  height: 100%;
  width: 100%;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;

  > svg {
    max-width: 45px;
    color: white;
    cursor: pointer;
    transition: 0.5s;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

const WrapperRuleImg = styled.img`
  position: absolute;
  bottom: 50px;
  right: -150px;
  width: 400px;
  opacity: 0.2;
`;

const SectionTutorial: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleCallSupport = () => {
    window.location.href = "tel:+51977431451";
  };

  return (
    <WrapperTutorialMain>
      <WrapperRuleImg src={RuleImg} />
      <SectionMax>
        <Grid container>
          <Grid item xs={12}>
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                justifyContent={"center"}
                alignItems={"center"}
                textAlign={"center"}
              >
                <Typography
                  variant="h5"
                  component="h5"
                  color={customPalette.primaryColor}
                  textAlign={"center"}
                  fontWeight={500}
                  marginBottom="20px"
                >
                  Aprende con nuestros tutoriales interactivos para que puedas
                  aprovechar todo el poder de E-Laminas
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                justifyContent={"center"}
                alignItems={"center"}
                textAlign={"center"}
                display={"grid"}
                sx={{ minHeight: 300, placeItems: "center" }}
              >
                <WrapperPlayerFirst>
                  <img src={WaveIcon} />
                  <WrapperVideoPlayerFirst>
                    <div>
                      <Box
                        component="img"
                        alt="Tutorial 01"
                        src={Tutorial01IMG}
                        sx={{ maxWidth: "300px", width: "100%" }}
                      />
                      <OverlayPlay>
                        <PlayCircleFill
                          onClick={() => {
                            dispatch(
                              updateCurrentTutorialURI(
                                "https://www.youtube.com/watch?v=1l8HDVmSqTc&ab_channel=elaminas"
                              )
                            );
                            dispatch(updateStatusModalTutorial(true));
                          }}
                        />
                      </OverlayPlay>
                    </div>
                    <Typography
                      variant="h6"
                      component="h6"
                      marginTop={"10px"}
                      color={customPalette.primaryColor}
                    >
                      Tutorial E-Laminas
                    </Typography>
                  </WrapperVideoPlayerFirst>
                </WrapperPlayerFirst>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                justifyContent={"center"}
                alignItems={"center"}
                textAlign={"center"}
                display={"grid"}
                sx={{ minHeight: 300, placeItems: "center" }}
              >
                <WrapperPlayerSecond>
                  <img src={WaveIcon} />
                  <WrapperVideoPlayerSecond>
                    <div>
                      <Box
                        component="img"
                        alt="Tutorial 02"
                        src={Tutorial02IMG}
                        sx={{ maxWidth: "300px", width: "100%" }}
                      />
                      <OverlayPlay>
                        <PlayCircleFill
                          onClick={() => {
                            dispatch(
                              updateCurrentTutorialURI(
                                "https://www.youtube.com/watch?v=axnZpEjJhPw&ab_channel=elaminas"
                              )
                            );
                            dispatch(updateStatusModalTutorial(true));
                          }}
                        />
                      </OverlayPlay>
                    </div>
                    <Typography
                      variant="h6"
                      component="h6"
                      marginTop={"10px"}
                      color={customPalette.primaryColor}
                    >
                      Tutorial E-Laminas
                    </Typography>
                  </WrapperVideoPlayerSecond>
                </WrapperPlayerSecond>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                justifyContent={"center"}
                alignItems={"center"}
                textAlign={"center"}
                alignSelf={"center"}
              >
                <Typography
                  component="h5"
                  variant="h5"
                  color={customPalette.primaryColor}
                  marginBottom={3}
                >
                  ¿Necesitas ayuda para descargar tus láminas?
                </Typography>
                <CustomButtom
                  title="Contactar con soporte"
                  Icon={Phone}
                  style="SECONDARY"
                  borderStyle="OUTLINE"
                  action={handleCallSupport}
                  customStyle={`width: fit-content; padding: 10px 30px; margin: auto`}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SectionMax>
    </WrapperTutorialMain>
  );
};

export default SectionTutorial;
