export interface IAccessTokenResponse {
  accessToken: string;
}

export interface ISessionTokenRequest {
  accessToken: string;
  planId: string;
}

export interface ISessionTokenResponse {
  sessionKey: string;
  expirationTime: number;
  amount: number;
  purchaseNumber: string;
}
