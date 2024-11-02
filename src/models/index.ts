export interface ILinkProps {
  link: string,
  label: string,
  logout?: () => {}
}

export interface IModal {
  type: string,
  message: string,
}

export interface IUserState {
  id: string,
  login: string | null,
  fullName: string | null,
  email: string | null,
  avatar: string,
  statusAdmin: boolean,
}

export interface IResponseUser {
  id: string,
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

export interface IFileServer {
  id: number,
  title: string,
  file: string,
  comment: string,
  size: number,
  created: string,
  last_download: string,
  user_id: string,
}

export interface IFile {
  id: number,
  title: string,
  file: string,
  comment: string,
  size: number,
  created: string,
  lastDownload: string,
  userId: string,
}

export interface IItemUser {
  id: string,
  login: string,
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
  currentUser: IItemUser | null,
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

export interface IItemLabel {
  title: string,
  type: string, 
  name: string, 
  changeInput: (event: React.ChangeEvent<HTMLInputElement>) => void, 
  value: string, 
  message?: string, 
  error?: boolean,
}