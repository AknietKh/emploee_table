import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../model/person.model';
import { ModalType } from '../model/modal.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from '../service/modal.service';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() title: string;
  @Input() buttonText: string;
  @Input() person: Person;
  @Input() type: ModalType;

  public personForm: FormGroup;

  constructor(private modalService: ModalService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.personForm = new FormGroup({
      firstName: new FormControl(this.person.firstName.trim(), Validators.required),
      lastName: new FormControl(this.person.lastName.trim(), Validators.required)
    });
  }

  public close() {
    this.modalService.close();
  }

  public confirm(e) {
    e.preventDefault();
    switch (this.type) {
      case ModalType.Add:
        this.onAddPerson();
        break;
      case ModalType.Edit:
        this.onEditPerson();
        break;
      case ModalType.Delete:
        this.onDeletePerson();
        break;
    }

    this.modalService.confirm();
  }

  public isDeleteModal() {
    return this.type == ModalType.Delete ? 'disabled' : null;
  }

  private onAddPerson(): void {
    this.modalService.setModalData({
      firstName: this.personForm.value.firstName.trim(),
      lastName: this.personForm.value.lastName.trim()
    },
    ModalType.Add
    );
  }

  private onEditPerson(): void {
    const {person, personForm} = this;

    if (person.lastName === personForm.value.lastName.trim() && person.firstName === personForm.value.firstName.trim()) {
      this.alertService.success('Измненений нет', 1500);
      return;
    }

    const editPerson: Person = {
      id: this.person.id,
      firstName: personForm.value.firstName.trim(),
      lastName: personForm.value.lastName.trim()
    };

    this.modalService.setModalData(editPerson, ModalType.Edit);
  }

  private onDeletePerson(): void {
    this.modalService.setModalData(this.person, ModalType.Delete);
  }
}
