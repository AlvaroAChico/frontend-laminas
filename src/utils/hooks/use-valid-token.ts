import React from "react";
import Cookies from "js-cookie";
import { APP_CONSTANS } from "../../constants/app";
import { IAuthData } from "../../core/store/auth/types/auth-types";

const useValidToken = () => {
  const getToken = (): string => {
    const dataUser = Cookies.get(APP_CONSTANS.AUTH_USER_DATA);
    if (dataUser != null && dataUser != undefined) {
      const user = JSON.parse(dataUser) as IAuthData;
      return user.token;
    }
    return "";
  };

  return {
    token: getToken(),
    existToken: !!getToken(),
  };
};

export default useValidToken;
