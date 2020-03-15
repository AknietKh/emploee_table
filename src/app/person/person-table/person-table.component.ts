import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../../model/person.model';
import { HttpService } from '../../service/http.service';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})

export class PersonTableComponent implements OnInit {
  showDeleteModal: boolean = false;
  currentPerson: Person;
  persons: Person[];

  constructor(
    private router: Router,
    private httpService: HttpService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons() {
    this.httpService.getData().subscribe(data => {
      this.persons = data;
      this.alertService.success('Данные успешно получены', 3000);
    });
  }

  goAddPersonModal() {
    this.router.navigate(['/add-person']);
  }

  goEditPersonModal(person: Person) {
    this.router.navigate(['/edit-person', person.id], );
  }

  onDeleteBtn(person: Person): void {
    this.currentPerson = person;
    this.showDeleteModal = true;
  }

  onToggleModal(showModal: boolean) {
    this.showDeleteModal = showModal ? true : false;
  }
}
