import React from 'react'
import styled from 'styled-components'
import { Grid, Typography, MenuItem } from '@mui/material'
import SearchLamina from "../../../../components/search-lamina/search-lamina";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { listFavourites } from '../../../../config/mocks/list-favourites'
import CardLamina from '../../../../components/card-lamina/card-lamina'

const WrapperFavourites = styled.div`
  position: relative;
  padding: 20px;
`

const ListFavourites = styled.div`
  width: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(2,1fr);
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
    grid-template-columns: repeat(2, 1fr);
  }
`

const FavouriteSection: React.FC = () => {
  const [favouritesNumber, setFavouritesNumber] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setFavouritesNumber(event.target.value);
  };

  return (
    <WrapperFavourites>
      <Grid container>
        <Grid xs={12}>
          <Typography variant="body2" component="p">
            Se han encontrado
            <Typography component="span" color="red" fontWeight={600}> 20 </Typography>
            subscripciones
          </Typography>
        </Grid>
        <Grid xs={12} md={7} marginTop={2} alignSelf={"center"}>
          <Typography
            variant="body1"
            component="span"
            fontWeight={400}
            paddingRight={2}
          >
            Mostrar
          </Typography>
          <Select
            value={favouritesNumber}
            onChange={handleChange}
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
        <Grid xs={12} md={5} marginTop={2} alignSelf={"center"}>
          <SearchLamina
            placeHolder="Buscar"
            customStyle={`
              border-radius: 30px;
              background: #FFF;
              box-shadow: 0px 6px 20px 10px rgba(156, 156, 156, 0.25);
              backdrop-filter: blur(12.5px);
              `}/>
        </Grid>
        <Grid xs={12} marginTop={2}>
          <ListFavourites>
            {listFavourites.map((lamina) => (
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
          </ListFavourites>
        </Grid>
      </Grid>
    </WrapperFavourites>
  )
}

export default FavouriteSection