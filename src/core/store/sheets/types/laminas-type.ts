import { string } from "yup";

export interface IPopularSearch {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
}

export interface ISheets {
  page: number;
  size?: string;
  word?: string;
}
export interface ISheetsResponse {
  currentPage: number;
  data: ISheetDefaultProps[];
  firstPageUrl: string;
  from: number;
  lastPage: number;
  lastPageUrl: string;
  nextPageUrl: string;
  path: string;
  perPage: number;
  prevPageUrl: string;
  to: number;
  total: number;
}
export interface ISheetDefaultProps {
  code: string;
  name: string;
  description: string;
  id: string;
  uuid: string;
  isFavorite: boolean;
  isMostSeen: boolean;
  isRecommended: boolean;
  isHorizontal: boolean;
  summary: string;
  status: string;
  isActive: boolean;
  createdAt: string;
  tira: string;
  numberOfViews: number;
  categories: ICategory[];
  tags: ITag[];
}
export interface ISheetDefaultEditor {
  isFavorite: boolean;
  name: string;
  tira: string;
  tiraTemporary: string;
  uuid: string;
}

export interface ICategory {
  id: number;
  name: string;
  image: string;
  status: string;
  isActive: boolean;
  createdAt: string;
}
export interface ITag {
  id: number;
  name: string;
  image: string;
  status: string;
  isActive: boolean;
  createdAt: string;
}
