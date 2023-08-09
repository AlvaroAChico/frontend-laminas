import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getStatusAuthenticated,
  updateStatusAuthenticated,
} from "../../core/store/app-store/appSlice";
import Cookies from "js-cookie";

const useAuth = () => {
  const isAuthenticated = useAppSelector(getStatusAuthenticated);
  const [valueToken, setValueToken] = React.useState("");
  const dispatch = useAppDispatch();

  const handleUpdateAuth = () => {
    const token = Cookies.get("auth_user");
    if (token) {
      setValueToken(token);
      handleChangeTrueAuth();
    }
  };
  const handleChangeTrueAuth = () => dispatch(updateStatusAuthenticated(true));
  const handleChangeFalseAuth = () => dispatch(updateStatusAuthenticated(true));

  React.useEffect(() => {
    const token = Cookies.get("auth_user");
    if (token) {
      setValueToken(token);
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
