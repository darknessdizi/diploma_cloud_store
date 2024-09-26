export interface IUserState {
  login: string | null,
  name: string | null,
  email: string | null,
}

export interface IIdentification {
  status: boolean,
  loading: boolean,
  error: string,
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
