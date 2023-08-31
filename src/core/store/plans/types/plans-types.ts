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

export interface IAuthorizationRequest {
  accessToken: string;
  purchaseNumber: string;
  transactionToken: string;
}

export interface IAuthorizationResponse {
  amount: string;
  brand: string;
  card: string;
  fulfillment: string;
  purchaseNumber: string;
  tokenId: string;
  transactionUUID: string;
  yapeId: string;
}

export interface IAuthorizationError {
  error: string;
  transactionUUID: string;
  amount: string;
  card: string;
  brand: string;
}
