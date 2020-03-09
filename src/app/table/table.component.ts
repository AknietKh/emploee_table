import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

class Person {
  id: number;
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = Date.now();
  }
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  persons: Person[] = [
    { id: 0, firstName: 'Akniet', lastName: 'Khakim'},
    { id: 1, firstName: 'Akniet', lastName: 'Khakim'},
    { id: 2, firstName: 'Akniet', lastName: 'Khakim'},
    { id: 3, firstName: 'Akniet', lastName: 'Khakim'},
    { id: 4, firstName: 'Akniet', lastName: 'Khakim'},
    { id: 5, firstName: 'Akniet', lastName: 'Khakim'},
    { id: 6, firstName: 'Akniet', lastName: 'Khakim'},
  ]

  addPersonInDb(firstName: string, lastName: string): void {
    this.persons.push(new Person(firstName, lastName));
  }

  addPerson(): void {
    this.router.navigate(['add-person']);
  }
}
