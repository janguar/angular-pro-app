// export class Alert {
//   constructor(
//     public id: string,
//     public type?: AlertType,
//     public message?: string,
//     public autoClose: boolean = true,
//     public keepAfterRouteChange: boolean = false,
//     public fade: boolean = false
//   ) { }
// }

// export enum AlertType {
//   Success,
//   Error,
//   Info,
//   Warning
// }


export class Alert {
  id?: string;
  type?: AlertType;
  message?: string;
  autoClose?: boolean;
  keepAfterRouteChange?: boolean;
  fade?: boolean;

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}

export class AlertOptions {
  id?: string;
  autoClose?: boolean;
  keepAfterRouteChange?: boolean;
}
