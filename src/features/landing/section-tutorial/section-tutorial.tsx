import React from "react";
import styled from "styled-components";
import SectionMax from "../../../components/section-max/section-max";
import { Grid, Typography } from "@mui/material";
import { customPalette } from "../../../config/theme/theme";
import ReactPlayer from "react-player";
import WaveIcon from "../../../assets/img/wave_icon.png";

const WrapperTutorialMain = styled.div`
  background: rgba(85, 182, 94, 0.19);
`;
const WrapperPlayerFirst = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 6px 12px 10px rgba(182, 182, 182, 0.25);
  backdrop-filter: blur(10px);
  height: fit-content;

  > img {
    position: absolute;
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

  > div:nth-child(1) {
    width: inherit !important;
  }
`;

const CustomReactPlayer = styled(ReactPlayer)`
  border-radius: 20px;
  width: inherit;
`;

const SectionTutorial: React.FC = () => {
  return (
    <WrapperTutorialMain>
      <SectionMax>
        <Grid container>
          <Grid xs={12}>
            <Grid container>
              <Grid xs={12} sm={12} md={6}>
                <Typography
                  variant="h5"
                  component="h5"
                  color={customPalette.primaryColor}
                  textAlign={"center"}
                  fontWeight={500}
                >
                  Aprende con nuestros tutoriales interactivos para que puedas
                  aprovechar todo el poder de E-Laminas
                </Typography>
              </Grid>
              <Grid xs={12} sm={12} md={6}>
                <WrapperPlayerFirst>
                  <img src={WaveIcon} />
                  <WrapperVideoPlayer>
                    <CustomReactPlayer url="https://www.youtube.com/watch?v=1l8HDVmSqTc&ab_channel=elaminas" />
                  </WrapperVideoPlayer>
                </WrapperPlayerFirst>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Grid container>
              <Grid xs={12} sm={12} md={6}>
                <ReactPlayer url="https://www.youtube.com/watch?v=axnZpEjJhPw&ab_channel=elaminas" />
              </Grid>
              <Grid xs={12} sm={12} md={6}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </SectionMax>
    </WrapperTutorialMain>
  );
};

export default SectionTutorial;
