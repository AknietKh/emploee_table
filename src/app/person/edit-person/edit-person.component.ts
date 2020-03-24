import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import { HttpService } from '../../service/http.service';
import { Person } from '../../model/person.model';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
  editForm: FormGroup;
  persons: Person[];
  personId: number;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    console.log(this.activatedRoute);
    const key = 'id';
    this.personId = parseInt(this.activatedRoute.snapshot.params[key], 10);

    this.getPerson(this.personId);

    this.editForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required]
    });
  }

  getPerson(id: number) {
    this.httpService.getSomePerson(id)
      .subscribe(data => {
        this.editForm.setValue({
          firstName: data.firstName,
          lastName: data.lastName
        });
      });
  }

  onSubmit(editForm: Person): void {
    console.log(this.personId, editForm);
    this.httpService.editData(this.personId, editForm)
      .subscribe(data => {
        this.alertService.success('Редактирование прошло успешно', 3000);
      },
      err => {
        console.log('edit', err.message);
      });

    this.router.navigate(['']);
  }
}
