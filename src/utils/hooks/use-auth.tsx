import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getStatusAuthenticated,
  updateStatusAuthenticated,
} from "../../core/store/app-store/appSlice";
import Cookies from "js-cookie";
import { APP_CONSTANS } from "../../constants/app";
import { IAuthData } from "../../core/store/auth/types/auth-types";

const useAuth = () => {
  const isAuthenticated = useAppSelector(getStatusAuthenticated);
  const [valueToken, setValueToken] = React.useState("");
  const dispatch = useAppDispatch();

  const handleUpdateAuth = () => {
    const dataUser = Cookies.get(APP_CONSTANS.AUTH_USER_DATA);
    if (dataUser != null && dataUser != undefined) {
      const user = JSON.parse(dataUser) as IAuthData;
      setValueToken(user.token);
      handleChangeTrueAuth();
    }
  };
  const handleChangeTrueAuth = () => dispatch(updateStatusAuthenticated(true));
  const handleChangeFalseAuth = () => dispatch(updateStatusAuthenticated(true));

  React.useEffect(() => {
    const dataUser = Cookies.get(APP_CONSTANS.AUTH_USER_DATA);
    if (dataUser != null && dataUser != undefined) {
      const user = JSON.parse(dataUser) as IAuthData;
      setValueToken(user.token);
      handleChangeTrueAuth();
    }
  }, []);

  return [
    isAuthenticated,
    valueToken,
    handleUpdateAuth,
    {
      setTrueAuth: handleChangeTrueAuth,
      setFalseAuth: handleChangeFalseAuth,
    },
  ];
};

export default useAuth;
