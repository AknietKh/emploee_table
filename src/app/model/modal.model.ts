import { Person } from './person.model';

export class DataFromModal {
  person: Person;
  modalType: ModalType;
}

export enum ModalResult {
  Opened,
  Confirmed,
  Closed
}

export enum ModalType {
  Edit,
  Add,
  Delete
}
