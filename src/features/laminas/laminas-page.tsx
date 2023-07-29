import React from 'react'
import HeaderSearch from '../../components/header-search/header-search'
import CustomTitle from '../../components/custom-title/custom-title'
import SectionMax from '../../components/section-max/section-max'
import CardLamina from '../../components/card-lamina/card-lamina'
import { customPalette } from '../../config/theme/theme'
import { listLaminas } from '../../config/mocks/list-laminas'
import {
  Chip,
  Grid,
  Select,
  Drawer,
  MenuItem,
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary
} from '@mui/material'
import { Filter } from '@styled-icons/feather/Filter'
import { ArrowIosDownward } from '@styled-icons/evaicons-solid/ArrowIosDownward'
import styled from 'styled-components'
import { breakpoints } from '../../constants/breakpoints'
import { SelectChangeEvent } from '@mui/material/Select';

const WrapperLaminasPage = styled.div`
  padding: 20px;
  width: 100%;
`
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px auto;

  > div:nth-child(1){
    display: inherit;
    justify-content; center;
    align-items: center;
    
    > div:nth-child(1){
      background: ${customPalette.primaryColor};
      border-radius: 30px;
      padding: 10px 20px;
      display: inherit;
      cursor: pointer;
      color: white;
      margin-right: 10px;
      
      > svg{
        width: 15px;
      }
    }
  }
  > div:nth-child(2){
    display: inherit;
    justify-content; center;
    align-items: center;
  }
`

const ListLaminas = styled.div`
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
const WrapperFilterMenu = styled.div`
  max-width: 250px;
  background: #d8e8ff;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
`
const ItemCourse = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid gray;
  border-radius: 10px;
  align-items: center;
  padding: 4px 8px;
  margin: 6px 0;
  transition: 0.5s;
  cursor: pointer;

  > div {
    background: ${customPalette.secondaryColor};
    color: white;
  }

  :hover {
    background: #d6e6fd;
  }
`
const BaseAccordion = styled(Accordion)`
  border: 1px solid ${customPalette.secondaryColor};
  border-radius: 10px;
  margin: 6px;
  
  > svg {
    width: 15px;
  }
`
const SerchAccordion = styled(BaseAccordion)``
const CoursesAccordion = styled(BaseAccordion)``

const LaminasPage: React.FC = () => {
  const [laminasNumber, setLaminasNumber] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const nroLaminas = 200;
  
  const handleChange =
  (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  
  const handleChangeLaminas = (event: SelectChangeEvent) => {
    setLaminasNumber(event.target.value);
  };
  
  return (
    <>
      <HeaderSearch title="Láminas"/>
      <WrapperLaminasPage>
        <SectionMax>
          <CustomTitle title="Selecciona el plan que mejor se adapte a tus necesidades" />
          <FilterContainer>
            <div>
              <div onClick={() => setStatusFilter(true)}>
                <Filter />
                <Typography variant="caption" component="span">Filtros</Typography>
              </div>
              <div>
                <Grid xs={12} md={7} marginTop={2} alignSelf={"center"}>
                  <Typography
                    variant="body1"
                    component="span"
                    fontWeight={400}
                    paddingRight={2}
                  >
                    Ordenar
                  </Typography>
                  <Select
                    value={laminasNumber}
                    onChange={handleChangeLaminas}
                    sx={{
                      width: "fit-content",
                      padding: "5px",
                      borderRadius: "20px",
                      maxHeight: "45px"
                    }}
                  >
                    <MenuItem value={10} selected>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                  </Select>
                </Grid>
              </div>
            </div>
            {nroLaminas>0?(
              <div>
                <Typography>
                  Se han encontrado <strong>{nroLaminas}</strong> láminas
                </Typography>
              </div>
              ):(
                <div>
                  <Typography>
                    No se encontraron resultados
                  </Typography>
                </div>
              )}
          </FilterContainer>
          <ListLaminas>
            {listLaminas.map((lamina) => (
              <CardLamina
                key={Date.now()}
                id={lamina.id}
                image={lamina.image}
                nroLamina={lamina.nroLamina}
                name={lamina.name}
                isFavourite={lamina.isFavourite}
                nroDownloads={lamina.nroDownloads}
                nroView={lamina.nroView}
              />
            ))}
          </ListLaminas>
        </SectionMax>
      </WrapperLaminasPage>
      <Drawer
        anchor={"left"}
        open={statusFilter}
        onClose={() => setStatusFilter(false)}
        sx={{ maxWidth: "250px" }}
      >
        <WrapperFilterMenu>
          <div>
            <CoursesAccordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary expandIcon={<ArrowIosDownward />}>
                <Typography sx={{ maxWidth: 200, flexShrink: 0 }}>Cursos</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ItemCourse>
                  <Typography variant="caption" component="span">EDUCACIÓN CÍVICA</Typography>
                  <Chip label="999" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">ANATOMÍA</Typography>
                  <Chip label="62" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">BIOLOGÍA</Typography>
                  <Chip label="62" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">BOTANICA</Typography>
                  <Chip label="62" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">ECOLOGIA</Typography>
                  <Chip label="62" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">DEPORTE</Typography>
                  <Chip label="62" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">EDUCACIÓN INICIAL</Typography>
                  <Chip label="62" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">EDUCACIÓN ARTISTICA</Typography>
                  <Chip label="62" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">RELIGIÓN</Typography>
                  <Chip label="62" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">FÍSICA Y QUÍMICA</Typography>
                  <Chip label="62" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">GEOGRAFÍA DEL PERÚ</Typography>
                  <Chip label="62" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">GEOGRAFÍA DEL UNIVERSAL Y DEL MUNDO</Typography>
                  <Chip label="62" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">HISTORIA DEL PERÚ</Typography>
                  <Chip label="62" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">HISTORIA UNIVERSAL</Typography>
                  <Chip label="62" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">LENGUAJE Y LITERATURA</Typography>
                  <Chip label="62" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">LÓGICO MATEMÁTICO</Typography>
                  <Chip label="62" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">OBRAS LITERARIAS</Typography>
                  <Chip label="62" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">PERSONAJES ILUSTRES</Typography>
                  <Chip label="62" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">SALUD Y SEXUALIDAD</Typography>
                  <Chip label="62" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">ZOOLOGÍA</Typography>
                  <Chip label="62" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">CIENCIAS Y TECNOLOGIA</Typography>
                  <Chip label="62" />
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">ASTRONOMIA</Typography>
                  <Chip label="62" />
                </ItemCourse>
              </AccordionDetails>
            </CoursesAccordion>
            <SerchAccordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary expandIcon={<ArrowIosDownward />}>
                <Typography sx={{ maxWidth: 200, flexShrink: 0 }}>Más buscados</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ItemCourse>
                  <Typography variant="caption" component="span">PERSONAJES ILUSTRES</Typography>
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">SALUD Y SEXUALIDAD</Typography>
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">ZOOLOGÍA</Typography>
                </ItemCourse>
                <ItemCourse>
                  <Typography variant="caption" component="span">CIENCIAS Y TECNOLOGIA</Typography>
                </ItemCourse>
              </AccordionDetails>
            </SerchAccordion>
          </div>
          <div>
            <Typography
              color={customPalette.secondaryColor}
              textAlign="right"
              sx={{
                cursor: "pointer",

                ':hover':{
                  textDecoration: "underline",
                  textDecorationThickness: "1px"
                }
              }}
            >
              Limpiar fitros
            </Typography>
          </div>
        </WrapperFilterMenu>
      </Drawer>
    </>
  )
}

export default LaminasPage