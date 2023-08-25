import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APP_CONSTANS } from "../../constants/app";
import { useAppDispatch } from "../../app/hooks";
import { updateStatusModalPayment } from "../../core/store/app-store/appSlice";

const ResponsePayment: React.FC = () => {
  const { transactionToken } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    console.log("URL -> ", `/planes?txk=${transactionToken}`);
    localStorage.setItem(APP_CONSTANS.TXK_NIUBIZ, `${transactionToken}`);
    dispatch(updateStatusModalPayment(false));
    navigate(`/planes`);
  }, []);
  return <div>ResponsePayment</div>;
};

export default ResponsePayment;
