export interface ILogin {
  email: string;
  password: string;
}
export interface IRegister {
  email: string;
  password: string;
  passConfirmation: string;
}
export interface ILoginResponse {
  "0": UserDTO;
  roles: string[];
  token: string;
  plan: string;
  functionalities: IFunctionality[];
}
export interface IAuthData {
  user: UserDTO;
  roles: string[];
  token: string;
  plan: string;
  functionalities: IFunctionality[];
}

export interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  email: string;
  contactNumber: string;
  picture: string;
  googleId: string;
  facebookId: string;
  status: string;
  isActive: boolean;
  createdAt: string;
  username: string;
  roles: RoleDTO[];
}

export interface RoleDTO {
  id: number;
  name: string;
  guardName: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFunctionality {
  id: 1;
  name: "general";
  function: EFuncionality;
  description: string;
  enabled: boolean;
  amount: number;
  formats: string[];
  fonts: string[];
  unlimited: boolean;
  enviroment: string;
  isActive: boolean;
  createdAt: string;
}

export enum EFuncionality {
  FUNC_DOWNLOAD_SIZE = "FUNC_DOWNLOAD_SIZE",
  FUNC_LIST_SHEETS = "FUNC_LIST_SHEETS",
  FUNC_UPLOAD_IMAGE = "FUNC_UPLOAD_IMAGE",
  FUNC_LIST_FONTS = "FUNC_LIST_FONTS",
  FUNC_ADD_FIGURE = "FUNC_ADD_FIGURE",
  FUNC_CONSULTING = "FUNC_CONSULTING",
  FUNC_DOWNLOADS = "FUNC_DOWNLOADS",
}
