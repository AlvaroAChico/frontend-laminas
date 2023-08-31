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
} from "@mui/material";
import SearchLamina from "../../../../components/search-lamina/search-lamina";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  IDownloadsDefaultProps,
  useGetListAllDownloadsMutation,
} from "../../../../core/store/downloads/downloadsAPI";
import CustomButton from "../../../../components/custom-button/custom-button";
import { ArrowIosDownward } from "@styled-icons/evaicons-solid/ArrowIosDownward";
import SubscriptionSectionSkeleton from "../subscription/skeleton/subscription-section-skeleton";

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
  const [listDownloads, setListDownloads] = React.useState<
    IDownloadsDefaultProps[]
  >([]);

  const handleChange = (event: SelectChangeEvent) => {
    setDownloadsNumber(event.target.value);
  };

  const [getListDownloads, resultDownloads] = useGetListAllDownloadsMutation();

  React.useEffect(() => {
    getListDownloads("");
  }, []);

  React.useEffect(() => {
    if (resultDownloads.isSuccess) {
      setListDownloads(resultDownloads.data.data);
    }
  }, [resultDownloads]);

  return (
    <WrapperDownloads>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="body2" component="p">
            Se han encontrado
            <Typography component="span" color="red" fontWeight={600}>
              {" "}
              {resultDownloads.data?.total || 0}{" "}
            </Typography>
            descargas
          </Typography>
        </Grid>
        {/* <Grid item xs={12} md={7} marginTop={2} alignSelf={"center"}>
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
        </Grid> */}
        <Grid item xs={12} marginTop={2}>
          {resultDownloads.isLoading && <SubscriptionSectionSkeleton />}
          {!resultDownloads.isLoading && (
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
                  {(listDownloads || []).map((item: IDownloadsDefaultProps) => (
                    <TableRow
                      key={Date.now()}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <Typography variant="body2" component="p">
                          {item.sheet.name || ""}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" component="p">
                          {item.createdAt.split(" ")[0]}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" component="p">
                          {item.size}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" component="p">
                          {item.enviroment}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainerStyles>
          )}
        </Grid>
        <Grid item xs={12}>
          {resultDownloads.data?.nextPageUrl && (
            <CustomButton
              title="Más resultados"
              style="SECONDARY"
              borderStyle="NONE"
              Icon={ArrowIosDownward}
              action={() => null}
              isLoading={false}
              customStyle={`
            border-color: white;
            color: white;
            width: fit-content;
            padding: 12px 30px;
            margin: 40px auto 20px;
            `}
            />
          )}
        </Grid>
      </Grid>
    </WrapperDownloads>
  );
};

export default DownloadsSection;
