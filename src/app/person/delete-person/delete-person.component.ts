import { Component } from '@angular/core';
import {Input, Output, EventEmitter} from '@angular/core';
import { HttpService } from '../../service/http.service';
import { Person } from 'src/app/model/person.model';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-delete-person',
  templateUrl: './delete-person.component.html',
  styleUrls: ['./delete-person.component.css']
})
export class DeletePersonComponent {
  @Input() person: Person;
  @Output() toggleModal = new EventEmitter<boolean>();
  
  constructor(
    private httpService: HttpService,
    private alertService: AlertService
  ) { }

  onCancel(showModal: boolean){
    this.toggleModal.emit(showModal);
  }

  onDelete(showModal: boolean) {
    this.httpService.deleteData(this.person.id).subscribe(
      data => this.alertService.success('Успешно удалено', 3000),
      err => console.log('deleteErr', err.message)
    );
    
    this.toggleModal.emit(showModal);
  }
}
