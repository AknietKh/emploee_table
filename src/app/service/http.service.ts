import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, throwError, Subject} from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Person } from '../model/person.model';
import { AlertService } from './alert.service';

const URL = 'http://localhost:3004/persons';
const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8')
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private personsSub = new Subject<Person[]>();
  private persons: Person[];

  constructor(
    private http: HttpClient,
    private alert: AlertService
  ) { }

  private errMessage(err) {
    let message: string;
    switch (err.status) {
      case 404:
        message = `Сущность не найдена в системе. Ошибка: ${err.status}`;
        break;
      case 400:
        message = `Ошибка: ${err.status}. Неверный запрос`;
        break;
      case 500:
        message = `Ошибка: ${err.status}. Ошибка сервера, попроубйте позже.`;
        break;
      default:
        message = `Произошла ошибка ${err.status}. ${err.statusText}`;
    }

    return message;
  }

  public getPersons() {
    return this.personsSub;
  }

  public fetchData(): Observable<Person[]> {
    return this.http.get<Person[]>(URL, httpOptions)
      .pipe(
        catchError(err => {
          console.error(err.message);
          const message = this.errMessage(err);
          this.alert.error(message);
          return throwError(err);
        })
      );
  }

  public init() {
    this.fetchData().subscribe(response => {
      this.personsSub.next(response);
      this.persons = response;
      this.alert.success('Данные успешно получены', 3000);
    });
  }

  public getSomePerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${URL}/${id}`, httpOptions)
      .pipe(
        catchError(err => {
          console.error(err.message);
          const message = this.errMessage(err);
          this.alert.error(message);
          return throwError(err);
        })
      );
  }

  public addData(person: Person) {
    this.http.post<Person>(URL, person, httpOptions)
      .subscribe(response => {
        console.log('response: ', response);
        this.persons = [...this.persons, response];
        this.personsSub.next(this.persons);
        this.alert.success('Сотрудник успешно добавлен', 3000);
      },
      err => {
        console.error(err.message);
        const message = this.errMessage(err);
        this.alert.error(message);
        return throwError(err);
      });
  }

  public editData(id: number, person: Person) {
    this.http.put<Person>(`${URL}/${id}`, person, httpOptions)
      .subscribe(response => {
        console.log('response: ', response);
        this.persons = this.persons.map(item => item.id === response.id ? response : item);
        this.personsSub.next(this.persons);
        this.alert.success('Данные успешно изменены', 3000);
      },
      err => {
        console.error(err.message);
        const message = this.errMessage(err);
        this.alert.error(message);
        return throwError(err);
      });
  }

  public deleteData(id: number) {
    this.http.delete<Person>(`${URL}/${id}`, httpOptions)
      .subscribe(response => {
        console.log('response: ', response);
        this.persons = this.persons.filter(item => item.id !== id);
        this.personsSub.next(this.persons);
        this.alert.success('Сотрудник удален успешно', 3000);
      },
      err => {
        console.error(err.message);
        const message = this.errMessage(err);
        this.alert.error(message);
        return throwError(err);
      });
  }
}
