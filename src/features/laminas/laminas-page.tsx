import React from 'react'
import HeaderSearch from '../../components/header-search/header-search'
import CustomTitle from '../../components/custom-title/custom-title'
import SectionMax from '../../components/section-max/section-max'
import CardLamina from '../../components/card-lamina/card-lamina'
import { listLaminas } from '../../config/mocks/list-laminas'
import { Typography, Drawer, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import styled from 'styled-components'

const WrapperLaminasPage = styled.div`
  padding: 20px;
  width: 100%;
`
const FilterContainer = styled.div``

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
const WrapperFilterMenu = styled.div``

const LaminasPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const nroLaminas = 200;
  
  const handleChange =
  (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  return (
    <>
      <HeaderSearch title="Láminas"/>
      <WrapperLaminasPage>
        <SectionMax>
          <CustomTitle title="Selecciona el plan que mejor se adapte a tus necesidades" />
          <FilterContainer>
            <div>
              <div onClick={() => setStatusFilter(true)}>Filter</div>
              <div>Order</div>
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
      >
        <WrapperFilterMenu>
          <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                expandIcon={<>a</>}
                aria-controls="panel4bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ maxWidth: 200, flexShrink: 0 }}>Cursos</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                  amet egestas eros, vitae egestas augue. Duis vel est augue.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary
                expandIcon={<>a</>}
                aria-controls="panel4bh-content"
                id="panel2bh-header"
              >
                <Typography sx={{ maxWidth: 200, flexShrink: 0 }}>Más buscados</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                  amet egestas eros, vitae egestas augue. Duis vel est augue.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <Typography>Limpiar fitros</Typography>
        </WrapperFilterMenu>
      </Drawer>
    </>
  )
}

export default LaminasPage