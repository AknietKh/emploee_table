export class Alert {
  type: AlertType;
  message: string;
  delay?: number | null;
  id: number;

  constructor(init?:Partial<Alert>) {
      Object.assign(this, init);
      this.id = Date.now();
  }
}

export enum AlertType {
  Success,
  Error
}