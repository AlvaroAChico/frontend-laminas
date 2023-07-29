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
    '0': UserDTO,
    roles: string[],
    token: string
    
}
export interface IAuthData {
    user: UserDTO,
    roles: string[],
    token: string
    
}

export interface UserDTO {
    id: number,
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    email: string,
    contactNumber: string,
    picture: string,
    googleId: string,
    facebookId: string,
    status: string,
    isActive: boolean,
    createdAt: string,
    username: string,
    roles: RoleDTO[]
}

export interface RoleDTO {
    id: number,
    name: string,
    guardName: string,
    createdAt: string,
    updatedAt: string,
}