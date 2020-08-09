import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalResult, ModalType, DataFromModal } from '../model/modal.model';
import { Person } from '../model/person.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState: Subject<ModalResult>;
  private modalData: Subject<DataFromModal>;

  constructor() {
    this.modalState = new Subject();
    this.modalData = new Subject();
  }

  public getModalState(): Subject<ModalResult> {
    return this.modalState;
  }

  public getModalData(): Subject<DataFromModal> {
    return this.modalData;
  }

  public setModalData(person: Person, modalType: ModalType): void {
    this.modalData.next({person, modalType});
  }

  public confirm(): void {
    this.modalState.next(ModalResult.Confirmed);
  }

  public close(): void {
    this.modalState.next(ModalResult.Closed);
  }
}
