/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Typography,
  Modal,
  Fade,
  Box,
  Backdrop,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  updateStatusModalCoupon,
  getStatusModalCoupon,
} from "../../core/store/app-store/appSlice";
import CustomButton from "../../components/custom-button/custom-button";
import { RightArrowAlt } from "@styled-icons/boxicons-regular/RightArrowAlt";
import { useForm } from "react-hook-form";
import { settingsAPP } from "../../config/environments/settings";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { CouponForm, CouponSchema } from "../../core/models/coupon-model";
import { customPalette } from "../../config/theme/theme";
import { yupResolver } from "@hookform/resolvers/yup";
import RuleImg from "../../assets/img/rule_icon.png";
import BookImg from "../../assets/img/book_icon.png";
import LogoImg from "../../assets/img/logo.svg";
import ReCAPTCHA from "react-google-recaptcha";
import styled from "styled-components";
import { usePostRedimirCouponMutation } from "../../core/store/coupon/couponAPI";
import { Toaster, toast } from "react-hot-toast";
import {
  ETemporalActions,
  updateTemporalAction,
} from "../../core/store/temporal/temporalSlice";

const BoxStyle = styled(Box)`
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 20px 25px;
  outline: none;
  background: white;
  border-radius: 20px;
  overflow: hidden;

  > div:nth-child(1) {
    background: ${customPalette.secondaryColor};
    width: 3px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 20px;
    height: 100%;
  }
`;
const GridCaptcha = styled(Grid)`
  > div div div:nth-child(1) {
    margin: auto;
  }
`;

const WrapperBookImg = styled.img`
  position: absolute;
  bottom: 10px;
  left: -60px;
  width: 150px;
  opacity: 0.2;
`;
const WrapperRuleImg = styled.img`
  position: absolute;
  top: 0;
  right: -80px;
  width: 200px;
  opacity: 0.2;
`;

const FormContainer = styled.div`
> div:nth-child(1), div:nth-child(2){
  justify-content: center;
    flex-direction: column;
    align-items: left;
    display: flex;
    padding 8px 15px;
    
    > input {
      box-shadow: 0px 4px 8px 5px rgba(198, 198, 198, 0.25);
      border: 1px solid #001C46;
      background-color: white;
      border-radius: 12px;
      padding: 8px 14px;
      outline: none;
      width: 100%;
    }
  }
  
  > div:nth-child(3){
    text-align: right;
    padding-right: 15px;
  }
`;
const ContainerEmailStyle = styled.div<{ errorStyle: boolean }>`
  > input {
    border: ${(p) =>
      p.errorStyle ? "1px solid red !important" : "1px solid #001C46;"};
  }
`;
const ErrorMessage = styled.span`
  font-size: 10px;
  color: red;
  margin-top: 6px;
`;

const ModalCoupon: React.FC = () => {
  const [redimirCoupon, resultCoupon] = usePostRedimirCouponMutation();
  const [statusSnackbar, setStatusSnackbar] = React.useState(false);
  const [msgErrorCoupon, setMsgErrorCoupon] = React.useState<string>("");
  const isStatus = useAppSelector(getStatusModalCoupon);
  const dispatch = useAppDispatch();

  const methods = useForm<CouponForm>({
    resolver: yupResolver(CouponSchema),
    defaultValues: {
      code: "",
      recaptcha: "",
    },
  });

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
    setValue,
  } = methods;

  const handleSubmit = React.useCallback((data: any) => {
    redimirCoupon(data.code)
      .unwrap()
      .catch((error) => setMsgErrorCoupon(error.data.message));
  }, []);

  function onChange(value: any) {
    if (value != "") {
      setValue("recaptcha", value);
    }
  }

  React.useEffect(() => {
    if (resultCoupon.data != null) {
      dispatch(updateStatusModalCoupon(false));
      toast.success("Cupón canjeado exitosamente");
    }
  }, [resultCoupon.isSuccess]);

  React.useEffect(() => {
    if (resultCoupon.isError) {
      setStatusSnackbar(true);
    }
  }, [resultCoupon.isError]);

  return (
    <>
      <Toaster />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isStatus}
        onClose={() => {
          dispatch(updateStatusModalCoupon(false));
          dispatch(updateTemporalAction(ETemporalActions.NO_ACTION));
        }}
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
            <div />
            <WrapperBookImg src={BookImg} />
            <WrapperRuleImg src={RuleImg} />
            <Grid container>
              <Grid
                item
                xs={12}
                justifyContent="center"
                alignItems="center"
                display="flex"
                marginTop={1}
                marginBottom={1}
              >
                <Box
                  component="img"
                  sx={{
                    padding: "4px",
                    maxWidth: { xs: 160, sm: 140, md: 160 },
                    margin: "auto",
                  }}
                  alt="Logo de Elaminas"
                  src={LogoImg}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              justifyContent="center"
              alignItems="center"
              display="flex"
              marginBottom={2}
            >
              <Typography
                variant="h5"
                component="h5"
                fontWeight="600"
                color={customPalette.secondaryColor}
              >
                Canjear Cupón
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormContainer>
                <ContainerEmailStyle
                  errorStyle={!!(errors.code as any)?.message}
                >
                  <Typography
                    variant="caption"
                    component="label"
                    textAlign="left"
                  >
                    Código de cupón
                  </Typography>
                  <input
                    placeholder="Código de cupón"
                    type="email"
                    required
                    {...register("code")}
                  />
                  {!!(errors.code as any)?.message && (
                    <ErrorMessage>{errors?.code?.message}</ErrorMessage>
                  )}
                </ContainerEmailStyle>
              </FormContainer>
            </Grid>
            <GridCaptcha
              item
              xs={12}
              justifyContent="center"
              alignItems="center"
              marginTop={3}
              marginBottom={3}
              textAlign={"center"}
            >
              <ReCAPTCHA
                sitekey={settingsAPP.app.recaptchaKey}
                onChange={onChange}
              />
              {!!(errors.recaptcha as any)?.message && (
                <ErrorMessage>{errors?.recaptcha?.message}</ErrorMessage>
              )}
            </GridCaptcha>
            <Grid item xs={12} justifyContent="center" alignItems="center">
              <CustomButton
                title="Canjear"
                style="SECONDARY"
                borderStyle="NONE"
                Icon={RightArrowAlt}
                action={submitWrapper(handleSubmit)}
                isLoading={resultCoupon.isLoading}
                customStyle={`
                  border-color: white;
                  color: white
                  padding: 8px 10px;
                `}
              />
            </Grid>
          </BoxStyle>
        </Fade>
      </Modal>
      <Snackbar
        open={statusSnackbar}
        autoHideDuration={6000}
        onClose={() => setStatusSnackbar(false)}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={() => setStatusSnackbar(false)}
          elevation={6}
        >
          {msgErrorCoupon
            ? msgErrorCoupon
            : "Hubo un error con el código de cupón"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ModalCoupon;
