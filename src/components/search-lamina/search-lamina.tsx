import React from "react";
import styled, { keyframes } from "styled-components";
import { Search } from "@styled-icons/evaicons-solid/Search";
import { customPalette } from "../../config/theme/theme";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { SearchForm, SearchSchema } from "../../core/models/search-model";
import { useForm } from "react-hook-form";
import {
  getCurrentSearchWord,
  updateCurrentSearchWord,
} from "../../core/store/sheets/sheetsSlice";

const WrapperSearch = styled.div<{ customStyle: string }>`
  background: #fff;
  box-shadow: 0px 6px 20px 10px rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12.5px);
  position: relative;
  border-radius: 30px;

  > input {
    width: 100%;
    height: 100%;
    padding: 16px 25px;
    outline: none;
    border-radius: inherit;
    border: none;
  }

  ${(p) => p.customStyle}
`;

const WrappeSearch = styled.div`
  position: absolute;
  background: ${customPalette.secondaryColor};
  top: 0;
  bottom: 0;
  right: 0;
  border-radius: inherit;
  display: grid;
  place-items: center;
  padding: 20px;
  cursor: pointer;
  align-content: center;

  > svg {
    width: 100%;
    max-width: 25px;
    color: white;
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderStyle = styled.span`
  width: 25px;
  height: 25px;
  border: 3px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotate} 1s linear infinite;
`;

interface IOwnProps {
  placeHolder?: string;
  customStyle?: string;
  activeWord?: string;
  handleSetData?: (value: any) => void;
  handleKeyUp?: () => void;
  isLoading?: boolean;
}

const SearchLamina: React.FC<IOwnProps> = ({
  placeHolder = "Buscar imágenes o láminas",
  customStyle = "",
  isLoading = false,
  handleSetData = () => null,
  handleKeyUp = () => null,
}) => {
  const dispatch = useAppDispatch();
  const activeWord = useAppSelector(getCurrentSearchWord);
  const methods = useForm<SearchForm>({
    resolver: yupResolver(SearchSchema),
    defaultValues: {
      sheet: "",
    },
  });

  const { handleSubmit: submitWrapper, setValue } = methods;

  const handleSubmit = React.useCallback((data: any) => {
    handleSetData(data.sheet);
    handleKeyUp();
  }, []);
  const handleChange = (e: any) => {
    dispatch(updateCurrentSearchWord(e.target.value));
    setValue("sheet", e.target.value);
  };

  const onKeyUp = (e: any) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      submitWrapper(handleSubmit)();
    }
  };

  return (
    <WrapperSearch customStyle={customStyle}>
      <input
        type="text"
        placeholder={placeHolder}
        onKeyUp={onKeyUp}
        value={activeWord}
        onChange={handleChange}
      />
      <WrappeSearch onClick={handleKeyUp}>
        {isLoading ? <LoaderStyle></LoaderStyle> : <Search />}
      </WrappeSearch>
    </WrapperSearch>
  );
};

export default SearchLamina;
