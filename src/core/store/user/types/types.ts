export interface IUserUpdate {
  firstName: string;
  lastName: string;
  contactNumber: string;
  address: string;
}

export interface IUserUpdateResponse {
  firstName: string;
  lastName: string;
  address: string;
  contactNumber: string;
}

export interface IResetPassRequest {
  token: string;
  email: string;
  pass: string;
}
export interface IResetResponse {
  message: string;
}
