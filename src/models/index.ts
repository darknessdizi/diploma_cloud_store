export interface ILinkProps {
  link: string,
  label: string,
  logout?: () => {}
}

export interface IUserState {
  id: string,
  login: string | null,
  fullName: string | null,
  email: string | null,
  avatar: string,
  statusAdmin: boolean,
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