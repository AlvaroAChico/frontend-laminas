import React from 'react'
import styled from 'styled-components'
import{ Grid, Box, Typography } from '@mui/material'
import BaseAvatarImg from '../../../../assets/img/avatar_base.png'
import CustomButtom from '../../../../components/custom-button/custom-button'
import { customPalette } from '../../../../config/theme/theme'
import { Edit } from '@styled-icons/fluentui-system-filled/Edit'
import PencilImg from "../../../../assets/img/pencil_icon.png";

const WrapperProfile = styled.div`
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  padding: 20px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
`
const ContainerAvatar = styled.div`
  position: relative;
  width: fit-content;
  border-radius: 50%;
  margin: auto;
`
const WrapperEdit = styled.div`
  background: ${customPalette.secondaryColor};
  border-radius: 50%;
  position: absolute;
  padding: 8px;
  bottom: 0;
  right: 0;

  > svg {
    width: 22px;
    color: white;
  }
`
const GridInfoContainer = styled(Grid)`
  > div {
    display: flex;
    flex-direction: column;
  }
`

const WrapperPencilImg = styled.img`
  position: absolute;
  right: -80px;
  width: 240px;
  bottom: 0;
  opacity: 0.2;
`;

const ProfileSection: React.FC = () => {
  return (
    <WrapperProfile>
      <WrapperPencilImg src={PencilImg} />
      <Grid container>
        <Grid
          item
          xs={12}
          md={3}
          justifyContent="center"
          alignItems="center"
          alignSelf="center"
          p={"10px"}
        >
          <ContainerAvatar>
            <Box
              component="img"
              sx={{
                padding: "4px",
                width: "100%",
                maxWidth: { xs: 160, sm: 140, md: 160 },
              }}
              alt="Avatar"
              src={BaseAvatarImg}
            />
            <WrapperEdit><Edit /></WrapperEdit>
          </ContainerAvatar>
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          p={"20px"}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              justifyContent="right"
              alignItems="right"
              flexDirection="row"
              flexWrap="wrap"
              display={"flex"}
              columnGap={2}
              rowGap={2}
              sx={{
                '@media(max-width: 768px)':{
                  justifyContent: 'center'
                }
              }}
            >
              <CustomButtom
                title="Cambiar contraseña"
                style="SECONDARY"
                borderStyle="NONE"
                action={() => console.log}
                Icon={Edit}
                customStyle={`
                  width: fit-content;
                `}
              />
              <CustomButtom
                title="Editar"
                style="SECONDARY"
                borderStyle="NONE"
                action={() => console.log}
                Icon={Edit}
                customStyle={`
                  width: fit-content;
                `}
              />
            </Grid>
            <Grid
              item
              xs={12}
              flexDirection="column"
              flexWrap="wrap"
              display="flex"
              paddingTop={3}
            >
              <Typography
                variant="caption"
                component="span"
                color="#55B65E"
                fontWeight={600}
              >
                Nombre
              </Typography>
              <Typography
                variant="body2"
                component="span"
                fontWeight={300}
              >
                Alvaro Chico Azabache
              </Typography>
            </Grid>
            <GridInfoContainer
              item
              xs={12}
              display={"flex"}
              justifyContent="left"
              alignItems="left"
              flexDirection="row"
              flexWrap="wrap"
              columnGap={4}
              paddingTop={1}
            >
              <div>
                <Typography
                  variant="caption"
                  component="span"
                  color="#55B65E"
                  fontWeight={600}
                >
                  Celular
                </Typography>
                <Typography
                  variant="body2"
                  component="span"
                  fontWeight={300}
                >
                  935253896
                </Typography>
              </div>
              <div>
                <Typography
                  variant="caption"
                  component="span"
                  color="#55B65E"
                  fontWeight={600}
                >
                  País
                </Typography>
                <Typography
                  variant="body2"
                  component="span"
                  fontWeight={300}
                >
                  Perú
                </Typography>
              </div>
            </GridInfoContainer>
            <Grid
              item
              xs={12}
              flexDirection="column"
              flexWrap="wrap"
              display="flex"
              paddingTop={1}
            >
              <Typography
                variant="caption"
                component="span"
                color="#55B65E"
                fontWeight={600}
              >
                Dirección
              </Typography>
              <Typography
                variant="body2"
                component="span"
                fontWeight={300}
              >
                Avenida Republica de Panamá 5012 - San Isidro
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </WrapperProfile>
  )
}

export default ProfileSection