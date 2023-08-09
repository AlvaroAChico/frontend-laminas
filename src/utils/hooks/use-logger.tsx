import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import {
  getCurrentSearchWord,
  updateCurrentSearchWord,
} from "../../core/store/sheets/sheetsSlice";
import { APP_CONSTANS } from "../../constants/app";

const useLogger = () => {
  const [valueWord, setValueWord] = React.useState("");
  const currentWord = useAppSelector(getCurrentSearchWord);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSetData = (value: string) => {
    dispatch(updateCurrentSearchWord(value));
    setValueWord(value);
  };

  const handleKeyUp = () => {
    localStorage.setItem(APP_CONSTANS.PENDING_SEARCH_WORD, currentWord);
    navigate("/laminas");
  };

  return { valueWord, handleSetData, handleKeyUp };
};

export default useLogger;
