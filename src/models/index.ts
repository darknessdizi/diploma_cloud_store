export interface IUserState {
  id: number | null,
  login: string | null,
  fullName: string | null,
  email: string | null,
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
  error: { status: boolean, message: string },
  user: IUserState,
}



// export interface IAppState {
//   title: string,
//   zone: string,
//   arrayClock: ({
//     title: string,
//     zone: string,
//   })[],
// }

// export interface IClockProps {
//   list: ({
//     title: string,
//     zone: string,
//   })[],
//   // callback: (event: React.ChangeEvent<HTMLElement>) => void,
//   callback: any,
// }

// export interface IItemClockProps {
//   title: string,
//   zone: string,
//   // callback: (event: React.ChangeEvent<HTMLElement>) => void,
//   callback: any,
// }

// export interface IFormProps {
//   title: string,
//   zone: string,
//   submit: (event: React.ChangeEvent<HTMLFormElement>) => void,
//   change: (event: React.ChangeEvent<HTMLInputElement>) => void,
// }
