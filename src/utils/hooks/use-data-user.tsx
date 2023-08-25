import React from "react";
import {
  IAuthData,
  IFunctionality,
  ILoginResponse,
} from "../../core/store/auth/types/auth-types";
import Cookies from "js-cookie";
import { APP_CONSTANS } from "../../constants/app";
import { useAppDispatch } from "../../app/hooks";
import {
  updateDataFunctionality,
  updateDataToken,
  updateStatusAuthenticated,
} from "../../core/store/app-store/appSlice";

const useDataUser = () => {
  const dispatch = useAppDispatch();

  const handleGetToken = () => {
    const dataUser = Cookies.get(APP_CONSTANS.AUTH_USER_DATA);
    if (dataUser != null && dataUser != undefined) {
      const user = JSON.parse(dataUser) as IAuthData;
      dispatch(updateDataToken(user.token));
      dispatch(updateStatusAuthenticated(true));
      return dataUser;
    }
    return "";
  };

  const handleUpdateUserAuth = (data: ILoginResponse, reload = false) => {
    const authData: IAuthData = {
      user: data["0"],
      roles: data.roles,
      token: data.token,
      plan: data.plan,
    } as IAuthData;
    Cookies.set(APP_CONSTANS.AUTH_USER_DATA, JSON.stringify(authData));
    dispatch(updateStatusAuthenticated(true));
    if (reload) {
      location.reload();
    }
  };

  const handleUpdateFunctionalities = (
    data: IFunctionality[],
    reload = false
  ) => {
    localStorage.setItem(
      APP_CONSTANS.AUTH_FUNCIONALITIES,
      JSON.stringify(data)
    );
    dispatch(updateStatusAuthenticated(true));
    if (reload) {
      location.reload();
    }
  };

  const handleGetFuncionalities = () => {
    const functionalityUser = localStorage.getItem(
      APP_CONSTANS.AUTH_FUNCIONALITIES
    );
    if (functionalityUser != null && functionalityUser != undefined) {
      const listFunc = JSON.parse(functionalityUser) as IFunctionality[];
      dispatch(updateDataFunctionality(listFunc));
      dispatch(updateStatusAuthenticated(true));
      return listFunc;
    }
    return [] as IFunctionality[];
  };

  return {
    handleGetToken,
    handleGetFuncionalities,
    handleUpdateUserAuth,
    handleUpdateFunctionalities,
  };
};

export default useDataUser;
