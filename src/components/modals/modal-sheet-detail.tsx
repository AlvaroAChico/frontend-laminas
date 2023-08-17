import React from "react";
import { Modal, Fade, Box, Backdrop, Grid, Typography } from "@mui/material";
import {
  getCurrentSheetDetail,
  getStatusModalSheetDetail,
  updateStatusModalSheetDetail,
} from "../../core/store/app-store/appSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Download } from "@styled-icons/evaicons-solid/Download";
import { Eye } from "@styled-icons/ionicons-outline/Eye";
import { Edit } from "@styled-icons/fluentui-system-filled/Edit";
import { CheckCircle } from "@styled-icons/bootstrap/CheckCircle";
import { customPalette } from "../../config/theme/theme";
import RuleImg from "../../assets/img/rule_icon.png";
import BookImg from "../../assets/img/book_icon.png";
import styled from "styled-components";
import CustomButton from "../custom-button/custom-button";
import { ICategory, ITag } from "../../core/store/sheets/types/laminas-type";

const BoxStyle = styled(Box)`
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  min-width: 300px;
  padding: 20px 25px;
  outline: none;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  overflow-y: auto;
  max-height: 90%;
`;

const WrapperBookImg = styled.img`
  position: absolute;
  bottom: 10px;
  left: -60px;
  width: 150px;
  opacity: 0.2;
  z-index: -1;
`;
const WrapperRuleImg = styled.img`
  position: absolute;
  top: 0;
  right: -80px;
  width: 200px;
  opacity: 0.2;
  z-index: -1;
`;

const ContainerImage = styled.div`
  max-height: 350px;
  overflow: hidden;

  > img {
    width: 100%;
    max-width: 600px;
    min-width: 300px;
    height: 100%;
    object-fit: cover;
    object-position: top;
    border-radius: 20px;
  }
`;
const ContainerTitleSheet = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: space-between;
  color: black;
  margin-top: 15px;

  > div:nth-child(2) {
  }
  > div svg {
    width: 20px;
    margin: 0 10px;
  }
`;

const ContainerButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ContainerFormats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const ItemFormatDownload = styled.div<{ selected: boolean }>`
  border: 1px solid ${(p) => (p.selected ? "#55B65E" : "transparent")};
  box-shadow: 0px 4px 10px 2px rgba(155, 155, 155, 0.25);
  justify-content: space-betwen;
  border-radius: 10px;
  align-items: center;
  row-gap: 10px;
  background: #fff;
  display: flex;
  padding: 5px 8px;
  width: fit-content;
  cursor: pointer;

  > div svg {
    width: ${(p) => (p.selected ? "16px" : "0px")};
    color: ${(p) => (p.selected ? "#55B65E" : "white")};
  }
`;

const DividerSection = styled.div`
  width: 100%;
  height: 1px;
  background: #e1e1e1;
  margin: 20px 0;
  border-radius: 20px;
`;

const ModalSheetDetail: React.FC = () => {
  const isStatus = useAppSelector(getStatusModalSheetDetail);
  const currentSheetDetail = useAppSelector(getCurrentSheetDetail);
  const [dataDownload, setDataDownload] = React.useState({
    format: "A4",
    includeRetira: false,
  });
  const dispatch = useAppDispatch();

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isStatus}
        onClose={() => dispatch(updateStatusModalSheetDetail(false))}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isStatus}>
          <BoxStyle>
            <Grid container>
              <Grid item xs={12} sm={9} md={8} padding="14px">
                <ContainerImage>
                  <img src={currentSheetDetail.tira} alt="Imagen de lamina" />
                </ContainerImage>
                <ContainerTitleSheet>
                  <div>
                    <Typography
                      component="h5"
                      variant="h5"
                      fontWeight={600}
                      color={customPalette.primaryColor}
                    >
                      {currentSheetDetail.name}
                    </Typography>
                  </div>
                  <div>
                    <Eye />
                    {currentSheetDetail.numberOfViews || 0}
                  </div>
                </ContainerTitleSheet>
              </Grid>
              <Grid item xs={12} sm={3} md={4} padding="14px">
                <div>
                  <Typography
                    component="h5"
                    variant="subtitle1"
                    color={customPalette.secondaryColor}
                    fontWeight={600}
                  >
                    Configuracion de descarga
                  </Typography>
                </div>
                <div>
                  <Typography
                    component="h5"
                    variant="subtitle1"
                    color={"black"}
                    fontWeight={600}
                  >
                    Formato
                  </Typography>
                  <ContainerFormats>
                    <div>
                      <ItemFormatDownload
                        selected={dataDownload.format == "A4"}
                        onClick={() =>
                          setDataDownload({
                            format: "A4",
                            includeRetira: dataDownload.includeRetira,
                          })
                        }
                      >
                        <div>
                          <Typography
                            component="h6"
                            variant="h6"
                            color={"black"}
                            fontWeight={600}
                            fontSize={"16px"}
                          >
                            A4
                          </Typography>
                          <Typography
                            component="span"
                            variant="caption"
                            color={"black"}
                            fontWeight={200}
                            fontSize={"9px"}
                          >
                            21 x 29.7 cm
                          </Typography>
                        </div>
                        <div>
                          <CheckCircle />
                        </div>
                      </ItemFormatDownload>
                    </div>
                    <div>
                      <ItemFormatDownload
                        selected={dataDownload.format == "A3"}
                        onClick={() =>
                          setDataDownload({
                            format: "A3",
                            includeRetira: dataDownload.includeRetira,
                          })
                        }
                      >
                        <div>
                          <Typography
                            component="h6"
                            variant="h6"
                            color={"black"}
                            fontWeight={600}
                            fontSize={"16px"}
                          >
                            A3
                          </Typography>
                          <Typography
                            component="span"
                            variant="caption"
                            color={"black"}
                            fontWeight={200}
                            fontSize={"9px"}
                          >
                            21.5 x 33.0 cm
                          </Typography>
                        </div>
                        <div>
                          <CheckCircle />
                        </div>
                      </ItemFormatDownload>
                    </div>
                    <div>
                      <ItemFormatDownload
                        selected={dataDownload.format == "Oficio"}
                        onClick={() =>
                          setDataDownload({
                            format: "Oficio",
                            includeRetira: dataDownload.includeRetira,
                          })
                        }
                      >
                        <div>
                          <Typography
                            component="h6"
                            variant="h6"
                            color={"black"}
                            fontWeight={600}
                            fontSize={"16px"}
                          >
                            Oficio
                          </Typography>
                          <Typography
                            component="span"
                            variant="caption"
                            color={"black"}
                            fontWeight={200}
                            fontSize={"9px"}
                          >
                            29.7 x 42 cm
                          </Typography>
                        </div>
                        <div>
                          <CheckCircle />
                        </div>
                      </ItemFormatDownload>
                    </div>
                  </ContainerFormats>
                </div>
                <DividerSection />
                <div>
                  <Typography
                    component="h5"
                    variant="subtitle1"
                    color={"black"}
                    fontWeight={600}
                  >
                    Configuración
                  </Typography>
                  <ContainerFormats>
                    <div>
                      <ItemFormatDownload
                        selected={!dataDownload.includeRetira}
                        onClick={() =>
                          setDataDownload({
                            format: dataDownload.format,
                            includeRetira: false,
                          })
                        }
                      >
                        <div>
                          <Typography
                            component="h6"
                            variant="h6"
                            color={"black"}
                            fontWeight={600}
                            fontSize={"12px"}
                          >
                            Imagen
                          </Typography>
                        </div>
                        <div>
                          <CheckCircle />
                        </div>
                      </ItemFormatDownload>
                    </div>
                    <div>
                      <ItemFormatDownload
                        selected={dataDownload.includeRetira}
                        onClick={() =>
                          setDataDownload({
                            format: dataDownload.format,
                            includeRetira: true,
                          })
                        }
                      >
                        <div>
                          <Typography
                            component="h6"
                            variant="h6"
                            color={"black"}
                            fontWeight={600}
                            fontSize={"12px"}
                          >
                            Imagen + Texto
                          </Typography>
                        </div>
                        <div>
                          <CheckCircle />
                        </div>
                      </ItemFormatDownload>
                    </div>
                  </ContainerFormats>
                </div>
                <DividerSection />
                <ContainerButtons>
                  <CustomButton
                    title="Descargar"
                    style="SECONDARY"
                    borderStyle="NONE"
                    Icon={Download}
                    action={() => console.log}
                    isLoading={false}
                    customStyle={`
                      color: white;
                      width: fit-content;
                      font-size: 12px;
                      padding: 5px 10px;
                    `}
                  />
                  <CustomButton
                    title="Editar"
                    style="SECONDARY"
                    borderStyle="NONE"
                    Icon={Edit}
                    action={() => console.log}
                    isLoading={false}
                    customStyle={`
                      color: white;
                      width: fit-content;
                      font-size: 12px;
                      padding: 5px 10px;
                    `}
                  />
                </ContainerButtons>
              </Grid>
              <Grid item xs={12} sm={9} md={8} padding="14px">
                <Typography
                  component="h5"
                  variant="subtitle1"
                  color={customPalette.secondaryColor}
                  fontWeight={600}
                >
                  Descripción
                </Typography>
                <div>{currentSheetDetail.description}</div>
              </Grid>
              <Grid item xs={12} sm={3} md={4} padding="14px">
                <div>
                  <Typography
                    component="h5"
                    variant="subtitle1"
                    color={customPalette.secondaryColor}
                    fontWeight={600}
                  >
                    Categorias
                  </Typography>
                  <div>
                    {(currentSheetDetail.categories || []).map((category) => (
                      <span key={category.id}>{category.name}</span>
                    ))}
                    {(currentSheetDetail.categories != null ||
                      ((currentSheetDetail.categories as ICategory[]) || [])
                        .length == 0) && (
                      <Typography
                        component="span"
                        variant="caption"
                        color={customPalette.primaryColor}
                        fontWeight={200}
                        sx={{ marginTop: "6px", marginBottom: "6px" }}
                      >
                        No se encontraron categorias relacionadas
                      </Typography>
                    )}
                  </div>
                </div>
                <div>
                  <Typography
                    component="h5"
                    variant="subtitle1"
                    color={customPalette.secondaryColor}
                    fontWeight={600}
                  >
                    Tags
                  </Typography>
                  <div>
                    {(currentSheetDetail.tags || []).map((tag) => (
                      <span key={tag.id}>{tag.name}</span>
                    ))}
                    {(currentSheetDetail.tags != null ||
                      ((currentSheetDetail.tags as ITag[]) || []).length ==
                        0) && (
                      <Typography
                        component="span"
                        variant="caption"
                        color={customPalette.primaryColor}
                        fontWeight={200}
                        sx={{ marginTop: "6px", marginBottom: "6px" }}
                      >
                        No se encontraron tags relacionados
                      </Typography>
                    )}
                  </div>
                </div>
              </Grid>
            </Grid>
            <WrapperBookImg src={BookImg} />
            <WrapperRuleImg src={RuleImg} />
          </BoxStyle>
        </Fade>
      </Modal>
    </>
  );
};

export default ModalSheetDetail;
