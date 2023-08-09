import React from "react";
import { IAuthData } from "../../core/store/auth/types/auth-types";
import Cookies from "js-cookie";

const useDataUser = () => {
  const [dataUser, setDataUser] = React.useState<IAuthData>({} as IAuthData);

  const handleGetDataUser = () => {
    const authCookie = Cookies.get("auth_user");
    if (authCookie != null && authCookie != undefined) {
      const authUser: IAuthData = JSON.parse(authCookie);
      setDataUser(authUser);
      return authUser;
    }
    return {} as IAuthData;
  };

  return { dataUser, handleGetDataUser };
};

export default useDataUser;
