import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import { HttpService } from '../../service/http.service';
import { Person } from '../../model/person';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
  editForm: FormGroup;
  // personId: number;
  persons: Person[];
  curentPerson: Person;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    // this.personId = parseInt(route.snapshot.params['id']);
  }

  ngOnInit(): void {
    // this.httpService.getData().subscribe(data => {
    //   this.persons = data;
    //   this.curentPerson = this.persons.filter(item => item.id === this.personId)[0];
    // });
    // this.httpService.getSomePerson(this.personId)
    //   .subscribe(data => this.curentPerson = data)
    this.getPerson(parseInt(this.activatedRoute.snapshot.params['id']));
    this.editForm = this.formBuilder.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required] 
    }) 
  }

  getPerson(id: number) {
    this.httpService.getSomePerson(id)
      .subscribe(data => {
        this.curentPerson = data;
        console.log(this.curentPerson);
        this.editForm.setValue({
          'firstName': data['firstName'],
          'lastName': data['lastName']
        })
      })
  }

  onSubmit(editForm: Person): void {
    console.log(this.curentPerson.id, editForm);
    this.httpService.editData(this.curentPerson.id, editForm)
      .subscribe(data => {
        this.alertService.success("Редактирование прошло успешно", 5000);
      },
      err => {
        console.log('edit', err.message)
      });
    
    this.router.navigate(['']);
  }
}
