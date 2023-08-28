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
import CustomButton from "../../../../components/custom-button/custom-button";
import { ArrowIosDownward } from "@styled-icons/evaicons-solid/ArrowIosDownward";
import {
  IPlansDefaultProps,
  useGetListAllPlansMutation,
} from "../../../../core/store/plans/plansAPI";
import SubscriptionSectionSkeleton from "./skeleton/subscription-section-skeleton";

const WrapperSubscription = styled.div`
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

const SubscriptionSection: React.FC = () => {
  const [subscriptionsNumber, setSubscriptionsNumber] = React.useState("");
  const [listPlans, setListPlans] = React.useState<IPlansDefaultProps[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setSubscriptionsNumber(event.target.value);
  };

  const [getListPlans, resultPlans] = useGetListAllPlansMutation();

  React.useEffect(() => {
    getListPlans("");
  }, []);

  React.useEffect(() => {
    if (resultPlans.isSuccess) {
      setListPlans(resultPlans.data.data);
    }
  }, [resultPlans]);

  return (
    <WrapperSubscription>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="body2" component="p">
            Se han encontrado
            <Typography component="span" color="red" fontWeight={600}>
              {" "}
              {resultPlans.data?.total || 0}{" "}
            </Typography>
            subscripciones
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
            value={subscriptionsNumber}
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
          {resultPlans.isLoading && <SubscriptionSectionSkeleton />}
          {!resultPlans.isLoading && (
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
                        Plan
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="caption"
                        component="p"
                        color="#55B65E"
                        fontWeight={600}
                      >
                        Estado
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
                        Descargas
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(listPlans || []).map((item: IPlansDefaultProps) => (
                    <TableRow
                      key={Date.now()}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <Typography variant="body2" component="p">
                          {item.plan.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          component="p"
                          sx={{
                            background: item.plan.name ? "green" : "red",
                            textAlign: "center",
                            color: "white",
                            padding: "4px 6px",
                            borderRadius: "20px",
                          }}
                        >
                          {item.plan.isActive ? "Activo" : "Vencido"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" component="p">
                          {item.plan.createdAt.split(" ")["0"]}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" component="p">
                          {item.plan.totalDownload} / {item.plan.quantity}
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
          {resultPlans.data?.nextPageUrl && (
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
    </WrapperSubscription>
  );
};

export default SubscriptionSection;
