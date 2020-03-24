import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from '../../model/person.model';
import { HttpService } from '../../service/http.service';
import { AlertService } from 'src/app/service/alert.service';


@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent {
  addForm: FormGroup;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.addForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.httpService.addData(new Person(this.addForm.value.firstName, this.addForm.value.lastName ))
      .subscribe(
        data => {
          this.alertService.success(`Сотрудник ${data.firstName} ${data.lastName} успешно добавлен`, 3000);
        },
        err => {
          console.log('add-data', err.message);
        });

    this.router.navigate(['']);
  }

}
