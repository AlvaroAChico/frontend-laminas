import React from "react";
import styled from "styled-components";
import { Grid, Box, Typography } from "@mui/material";
import BaseAvatarImg from "../../../../assets/img/avatar_base.png";
import CustomButtom from "../../../../components/custom-button/custom-button";
import { customPalette } from "../../../../config/theme/theme";
import { Edit } from "@styled-icons/fluentui-system-filled/Edit";
import { Save } from "@styled-icons/fluentui-system-regular/Save";
import PencilImg from "../../../../assets/img/pencil_icon.png";
import useDataUser from "../../../../utils/hooks/use-data-user";
import { IAuthData } from "../../../../core/store/auth/types/auth-types";
import { useUpdateBasicDataUserMutation } from "../../../../core/store/user/userAPI";
import { IUserUpdate } from "../../../../core/store/user/types/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserForm, UserSchema } from "../../../../core/models/user-model";
import { Toaster, toast } from "react-hot-toast";
import useLogger from "../../../../utils/hooks/use-logger";
import Cookies from "js-cookie";
import { APP_CONSTANS } from "../../../../constants/app";
import { updateStatusModalChangePassword } from "../../../../core/store/app-store/appSlice";
import { useAppDispatch } from "../../../../app/hooks";

const WrapperProfile = styled.div`
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  padding: 20px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
`;
const ContainerAvatar = styled.div`
  position: relative;
  width: fit-content;
  border-radius: 50%;
  margin: auto;
`;
const WrapperEdit = styled.div`
  background: ${customPalette.secondaryColor};
  border-radius: 50%;
  position: absolute;
  cursor: pointer;
  padding: 8px;
  bottom: 0;
  right: 0;

  > svg {
    width: 22px;
    color: white;
  }

  > input {
    display: none;
  }
`;
const GridBasicDataContainer = styled(Grid)`
  > div {
    display: flex;
    flex-direction: column;
  }
`;
const GridInfoContainer = styled(Grid)`
  > div {
    display: flex;
    flex-direction: column;
  }
`;

const WrapperPencilImg = styled.img`
  position: absolute;
  right: -80px;
  width: 240px;
  bottom: 0;
  opacity: 0.2;
  z-index: -1;
`;
const ContainerInput = styled.div`
  margin: 5px 0 2px;

  > input {
    width: 100%;
    padding: 8px 10px;
    box-sizing: border: box; 
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    outline: none;
    border: 0.5px solid #e3e3e3;
    border-radius: 15px;
  }
`;

const ProfileSection: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [user, setUser] = React.useState<IAuthData>();
  const handleInitEditing = () => setIsEditing(true);
  const handleCancelEditing = () => setIsEditing(false);
  const dispatch = useAppDispatch();

  const handleFinishEditing = () => {
    submitWrapper(handleSubmit)();
  };

  const { handleGetToken } = useDataUser();
  const { Logger } = useLogger();

  React.useEffect(() => {
    const data = handleGetToken();
    if (data) {
      const user = JSON.parse(data) as IAuthData;
      setUser(user);
    }
  }, []);

  const methods = useForm<UserForm>({
    resolver: yupResolver(UserSchema),
    defaultValues: {
      firstName: user?.user.firstName,
      lastName: user?.user.lastName,
      address: user?.user.address,
      contactNumber: user?.user.contactNumber,
    },
  });

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
  } = methods;

  const [startUpdateUser, resultUser] = useUpdateBasicDataUserMutation();

  const handleSubmit = React.useCallback((data: any) => {
    if (
      data.firstName != "" ||
      data.lastName != "" ||
      data.address != "" ||
      data.contactNumber != ""
    ) {
      startUpdateUser({
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        contactNumber: data.contactNumber,
      } as IUserUpdate);
    } else {
      toast.error("Debes llenar al menos un campo");
    }
  }, []);

  React.useEffect(() => {
    if (resultUser && resultUser.isSuccess) {
      const newUser: IAuthData = user as IAuthData;
      if (newUser != null && newUser.user != null) {
        newUser!.user!.firstName = resultUser.data?.firstName || "";
        newUser!.user!.lastName = resultUser.data?.lastName || "";
        newUser!.user!.contactNumber = resultUser.data?.contactNumber || "";
        newUser!.user!.address = resultUser.data?.address || "";
        Cookies.set(APP_CONSTANS.AUTH_USER_DATA, JSON.stringify(newUser));
        setUser(newUser);
        setIsEditing(false);
      }
    }
    if (resultUser.isError) {
      toast.error("No se pudo actualizar los datos, intenta nuevamente");
    }
  }, [resultUser]);

  const handleChangeAvatar = () => {
    document.getElementById("input-file-image")?.click();
  };

  return (
    <WrapperProfile>
      <Toaster />
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
            <WrapperEdit onClick={handleChangeAvatar}>
              <Edit />
              <input
                id="input-file-image"
                type="file"
                multiple={false}
                onInput={(e: any) => {
                  if (e!.target!.files && e!.target!.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function (evt: any) {
                      const ext = e!
                        .target!.files[0].name.split(".")
                        .pop()
                        .toLowerCase();
                      if (["PNG", "JPG", "JPEG"].includes(ext!.toUpperCase())) {
                        Logger("Avatar", evt!.target!.result);
                      } else {
                        toast.error("Extensión no permitida");
                      }
                    };
                    reader.readAsDataURL(e!.target!.files[0]);
                  }
                }}
              />
            </WrapperEdit>
          </ContainerAvatar>
        </Grid>
        <Grid item xs={12} md={9} p={"20px"}>
          <Grid container>
            {!isEditing && (
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
                  "@media(max-width: 768px)": {
                    justifyContent: "center",
                  },
                }}
              >
                <CustomButtom
                  title="Cambiar contraseña"
                  style="SECONDARY"
                  borderStyle="NONE"
                  action={() => dispatch(updateStatusModalChangePassword(true))}
                  Icon={Edit}
                  customStyle={`
                  width: fit-content;
                `}
                />
                <CustomButtom
                  title="Editar"
                  style="SECONDARY"
                  borderStyle="NONE"
                  action={handleInitEditing}
                  Icon={Edit}
                  customStyle={`
                  width: fit-content;
                  cursor: pointer;
                `}
                />
              </Grid>
            )}
            <GridBasicDataContainer
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
                  Nombres
                </Typography>
                {isEditing ? (
                  <ContainerInput>
                    <input
                      type="text"
                      placeholder={"Escribe tus nombres"}
                      defaultValue={user?.user.firstName}
                      disabled={resultUser.isLoading}
                      {...register("firstName")}
                    />
                  </ContainerInput>
                ) : (
                  <Typography
                    variant={user?.user.firstName ? "body2" : "caption"}
                    fontStyle={user?.user.firstName ? "normal" : "italic"}
                    component="span"
                    fontWeight={300}
                  >
                    {user?.user.firstName
                      ? user.user.firstName
                      : "No registrado"}
                  </Typography>
                )}
              </div>
              <div>
                <Typography
                  variant="caption"
                  component="span"
                  color="#55B65E"
                  fontWeight={600}
                >
                  Apellidos
                </Typography>
                {isEditing ? (
                  <ContainerInput>
                    <input
                      type="text"
                      placeholder={"Escribe tus apellidos"}
                      defaultValue={user?.user.lastName}
                      disabled={resultUser.isLoading}
                      {...register("lastName")}
                    />
                  </ContainerInput>
                ) : (
                  <Typography
                    variant={user?.user.lastName ? "body2" : "caption"}
                    fontStyle={user?.user.lastName ? "normal" : "italic"}
                    component="span"
                    fontWeight={300}
                  >
                    {user?.user.lastName ? user.user.lastName : "No registrado"}
                  </Typography>
                )}
              </div>
            </GridBasicDataContainer>
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
                {isEditing ? (
                  <ContainerInput>
                    <input
                      type="text"
                      placeholder={"Escribe tu celular"}
                      defaultValue={user?.user.contactNumber}
                      disabled={resultUser.isLoading}
                      {...register("contactNumber")}
                    />
                  </ContainerInput>
                ) : (
                  <Typography
                    variant={user?.user.contactNumber ? "body2" : "caption"}
                    fontStyle={user?.user.contactNumber ? "normal" : "italic"}
                    component="span"
                    fontWeight={300}
                  >
                    {user?.user.contactNumber
                      ? user?.user.contactNumber
                      : "No registrado"}
                  </Typography>
                )}
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
                <Typography variant="body2" component="span" fontWeight={300}>
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
              {isEditing ? (
                <ContainerInput>
                  <input
                    type="text"
                    placeholder={"Escribe tu dirección"}
                    defaultValue={user?.user.address}
                    disabled={resultUser.isLoading}
                    {...register("address")}
                  />
                </ContainerInput>
              ) : (
                <Typography
                  variant={user?.user.address ? "body2" : "caption"}
                  fontStyle={user?.user.address ? "normal" : "italic"}
                  component="span"
                  fontWeight={300}
                >
                  {user?.user.address ? user.user.address : "No registrado"}
                </Typography>
              )}
            </Grid>
            {isEditing && (
              <Grid
                item
                xs={12}
                flexDirection="row"
                flexWrap="wrap"
                display="flex"
                paddingTop={1}
                justifyContent={"right"}
                marginTop={2}
                gap={2}
              >
                <CustomButtom
                  title="Cancelar"
                  style="SECONDARY"
                  borderStyle="OUTLINE"
                  action={handleCancelEditing}
                  Icon={Save}
                  customStyle={`
                    width: fit-content;
                    cursor: pointer;
                  `}
                />
                <CustomButtom
                  title="Guardar"
                  style="SECONDARY"
                  borderStyle="NONE"
                  action={handleFinishEditing}
                  Icon={Save}
                  isLoading={resultUser.isLoading}
                  customStyle={`
                    width: fit-content;
                    cursor: pointer;
                  `}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </WrapperProfile>
  );
};

export default ProfileSection;
