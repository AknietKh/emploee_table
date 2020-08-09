import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Person } from '../../model/person.model';
import { HttpService } from '../../service/http.service';
import { ModalManager } from 'src/app/modal/ModalManager';
import { ModalType, DataFromModal } from 'src/app/model/modal.model';
import { ModalComponent } from 'src/app/modal/modal.component';
import { ModalService } from 'src/app/service/modal.service';
import { ContainerRefDirective } from 'src/app/container-ref.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})

export class PersonTableComponent implements OnInit, OnDestroy {
  @ViewChild(ContainerRefDirective, {static: true}) containerRef: ContainerRefDirective;

  private personsSub: Subscription;
  private dataFromModal: DataFromModal;
  private sub: Subscription;
  public persons: Person[];
  public modalType = ModalType;

  constructor(
    private httpService: HttpService,
    private modalService: ModalService,
    private modalManager: ModalManager
  ) { }

  ngOnInit(): void {
    this.httpService.init();

    this.personsSub = this.httpService.getPersons().subscribe((persons: Person[]) => {
      this.persons = persons;
    });

    this.sub = this.modalSub().subscribe((dataFromModal: DataFromModal) => {
      this.dataFromModal = dataFromModal;
      console.log(this.dataFromModal);
      switch (dataFromModal.modalType) {
        case ModalType.Add:
          this.addPersons(dataFromModal.person);
          break;
        case ModalType.Edit:
          this.editPersons(dataFromModal.person);
          break;
        case ModalType.Delete:
          this.deletePerson(dataFromModal.person);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.personsSub.unsubscribe();
  }

  private modalSub() {
    return this.modalService.getModalData();
  }

  private addPersons(person: Person) {
    this.httpService.addData(person);
  }

  private editPersons(person: Person) {
    this.httpService.editData(person.id, person);
  }

  private deletePerson(person: Person) {
    this.httpService.deleteData(person.id);
  }

  private defineModalData(type: ModalType) {
    let title = '';
    let buttonText = '';
    const {modalType} = this;

    switch (type) {
      case modalType.Add:
        title = 'Создание сотрудника';
        buttonText = 'Сохранить';
        break;
      case modalType.Edit:
        title = 'Редактирование сотрудника';
        buttonText = 'Сохранить';
        break;
      case modalType.Delete:
        title = 'Удаление сотрудника';
        buttonText = 'Удалить';
        break;
    }

    return { title, buttonText, type };
  }

  public showModal( type: ModalType, person: Person = {firstName: '', lastName: ''}) {
    const modalOptions = Object.assign({}, this.defineModalData(type), {person});

    document.body.classList.add('overflow-hidden');
    this.modalManager.showModal(this.containerRef, ModalComponent, modalOptions)
      .subscribe(x => {
        document.body.classList.remove('overflow-hidden');
      });
  }
}
