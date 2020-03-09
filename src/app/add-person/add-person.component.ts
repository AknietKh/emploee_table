import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  addForm;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.addForm = this.formBuilder.group({
      firstName: '',
      lastName: ''
    })
   }

  ngOnInit(): void {
  }

  onSubmit(newPerson) {
    alert(newPerson);
    this.addForm.reset();
    this.router.navigate(['']);
  }

}
