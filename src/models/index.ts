export interface IUserState {
  id: number | null,
  login: string | null,
  fullName: string | null,
  email: string | null,
  avatar: string | null,
  statusAdmin: boolean,
}

export interface IResponseUser {
  id: number,
  login: string,
  full_name: string,
  email: string,
  avatar: string,
  created: string,
  last_visit: string,
  status_admin: boolean,
  token: string,
}

export interface IIdentification {
  auth: boolean,
  loginOccupied: boolean,
  loginNotFound: { status: boolean, message: string },
  user: IUserState,
}

export interface IFile {
  id: number,
  title: string,
  comment: string,
  size: number,
  created: string,
  last_download: string,
}

export interface IItemUser {
  id: number,
  fullName: string,
  avatar?: string,
  email: string,
  statusAdmin: boolean,
  created: string,
  lastVisit: string,
}

export interface IDiskState {
  cloudFiles: IFile[],
  cloudUsers: IItemUser[],
  currentFile: IFile | null,
  currentUser: IUserState | null,
  flagLookUser: boolean,
  link: string,
}

export interface IModalState {
  modal: boolean,
  modalType: string,
  message: string,
}

export interface IFetchParams {
  url: string,
  headers?: {},
  method?: string,
  body?: string | FormData,
  blob?: boolean,
}
