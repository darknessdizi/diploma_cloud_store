export interface IUserState {
  id: number | null,
  login: string | null,
  fullName: string | null,
  email: string | null,
}

export interface IIdentification {
  auth: boolean,
  loginOccupied: boolean,
  loginNotFound: { status: boolean, message: string },
  user: IUserState,
}

export interface IFile {
  id: number | null,
  title: string | null,
  comment: string | null,
  size: number | null,
  created: string | null,
  last_download: string | null,
}

export interface IDiskState {
  cloudFiles: IFile[],
  currentFile: IFile | null,
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
  blob: boolean,
}
