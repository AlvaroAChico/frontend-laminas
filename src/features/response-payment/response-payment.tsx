import React from "react";
import { APP_CONSTANS } from "../../constants/app";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { updateStatusIframePayment } from "../../core/store/app-store/appSlice";

const ResponsePayment: React.FC = () => {
  const { transactionToken } = useParams();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    console.log("URL -> ", `/planes?txk=${transactionToken}`);
    localStorage.setItem(APP_CONSTANS.TXK_NIUBIZ, `${transactionToken}`);
    dispatch(updateStatusIframePayment(false));
  }, []);
  return <div>ResponsePayment</div>;
};

export default ResponsePayment;
