import React from "react";
import { useLocation } from "react-router-dom";
import { useStartLoginSocialMutation } from "../../core/store/auth/authAPI";

const GoogleCallback: React.FC = () => {
  const location = useLocation();
  const [startGoogleCallback, resultCallback] = useStartLoginSocialMutation();

  React.useEffect(() => {
    startGoogleCallback(location.search);
  }, []);

  React.useEffect(() => {
    console.log("Google Callback -> ", {
      object: resultCallback,
      data: resultCallback.data,
      success: resultCallback.isSuccess,
      error: resultCallback.isError,
    });
  }, [resultCallback]);

  return <div>GoogleCallback</div>;
};

export default GoogleCallback;
