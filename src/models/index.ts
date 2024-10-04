export interface IUserState {
  id: number | null,
  login: string | null,
  fullName: string | null,
  email: string | null,
  error?: string,
}

export interface IFetchUser {
  login: string,
  fullName: string,
  email: string,
  password: string,
}

export interface IIdentification {
  auth: boolean,
  loading: boolean,
  modal: boolean,
  loginOccupied: boolean,
  loginNotFound: { status: boolean, message: string },
  error: { status: boolean, message: string },
  user: IUserState,
}
