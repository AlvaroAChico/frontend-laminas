import React from "react";
import styled from "styled-components";
import {
  Grid,
  Typography,
  MenuItem,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Paper,
} from "@mui/material";
import SearchLamina from "../../../../components/search-lamina/search-lamina";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const WrapperDownloads = styled.div`
  position: relative;
  padding: 20px;
`;
const TableContainerStyles = styled(TableContainer)`
  scrollbar-width: thin;
  scrollbar-color: #6969dd #e0e0e0;

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: #e3e3e3db;
    border-radius: 20px;
  }
  ::-webkit-scrollbar-thumb {
    background: #ffa95ad9;
    border-radius: 20px;
  }
`;

const DownloadsSection: React.FC = () => {
  const [downloadsNumber, setDownloadsNumber] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setDownloadsNumber(event.target.value);
  };

  return (
    <WrapperDownloads>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="body2" component="p">
            Se han encontrado
            <Typography component="span" color="red" fontWeight={600}>
              {" "}
              20{" "}
            </Typography>
            descargas
          </Typography>
        </Grid>
        <Grid item xs={12} md={7} marginTop={2} alignSelf={"center"}>
          <Typography
            variant="body1"
            component="span"
            fontWeight={400}
            paddingRight={2}
          >
            Mostrar
          </Typography>
          <Select
            value={downloadsNumber}
            onChange={handleChange}
            sx={{
              width: "fit-content",
              padding: "5px",
              borderRadius: "20px",
              maxHeight: "45px",
            }}
          >
            <MenuItem value={10} selected>
              10
            </MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={5} marginTop={2} alignSelf={"center"}>
          <SearchLamina
            placeHolder="Buscar"
            customStyle={`
              border-radius: 30px;
              background: #FFF;
              box-shadow: 0px 6px 20px 10px rgba(156, 156, 156, 0.25);
              backdrop-filter: blur(12.5px);
              `}
          />
        </Grid>
        <Grid item xs={12} marginTop={2}>
          <TableContainerStyles sx={{ border: "none" }}>
            <Table
              sx={{ minWidth: 650, boxShadow: "none" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography
                      variant="caption"
                      component="p"
                      color="#55B65E"
                      fontWeight={600}
                    >
                      Lámina
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="caption"
                      component="p"
                      color="#55B65E"
                      fontWeight={600}
                    >
                      Fecha
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="caption"
                      component="p"
                      color="#55B65E"
                      fontWeight={600}
                    >
                      Tamaño
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="caption"
                      component="p"
                      color="#55B65E"
                      fontWeight={600}
                    >
                      Método
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body2" component="p">
                      Mapa Hidrográfico del Perú
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" component="p">
                      2023-02-06 23:53:47
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" component="p">
                      A4
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" component="p">
                      Editor
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body2" component="p">
                      Mapa Hidrográfico del Perú
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" component="p">
                      2023-02-06 23:53:47
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" component="p">
                      A4
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" component="p">
                      Editor
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainerStyles>
        </Grid>
      </Grid>
    </WrapperDownloads>
  );
};

export default DownloadsSection;
