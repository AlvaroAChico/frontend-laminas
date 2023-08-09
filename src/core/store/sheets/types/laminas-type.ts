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
  isFavorite: false;
  isMostSeen: boolean;
  isRecommended: boolean;
  isHorizontal: boolean;
  summary: string;
  status: string;
  isActive: boolean;
  createdAt: string;
  tira: string;
  numberOfViews: number;
}
