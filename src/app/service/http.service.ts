import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Person } from '../model/person';
import { AlertService } from './alert.service';

const URL = 'http://localhost:3004/persons1';
const httpOptions = {
  headers: new HttpHeaders().set("Content-Type", "application/json;charset=utf-8")
}

@Injectable()
export class HttpService {
  
  constructor(
    private http: HttpClient,
    private alert: AlertService
  ){}

  errMessage(err) {
    let message: string;
    switch(err.status) {
      case 404:
        message = `Сущность не найдена в системе. Ошибка: ${err.status}`
        break;
      case 400:
        message =`Ошибка: ${err.status}. Неверный запрос`
        break;
      case 500: 
        message =`Ошибка: ${err.status}. Ошибка сервера, попроубйте позже.`
        break;
      default:
        message = `Произошла ошибка ${err.status}`
    }

    return message;
  }

  getData(): Observable<Person[]> {
    return this.http.get<Person[]>(URL)
      .pipe(
        catchError(err => {
          console.error(err.message);
          const message = this.errMessage(err);
          this.alert.error(message);
          return throwError(err);
        })
      )
  }

  getSomePerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${URL}/${id}`)
      .pipe(
        catchError(err => {
          console.error(err.message);
          const message = this.errMessage(err);
          this.alert.error(message);
          return throwError(err);
        })
      )
  }

  addData(person: Person): Observable<Person> {
    return this.http.post<Person>(URL, JSON.stringify(person), httpOptions)
    .pipe(
      catchError(err => {
        console.error(err.message);
        const message = this.errMessage(err);
        this.alert.error(message);
        return throwError(err);
      })
    )
  }

  editData(id:number, person: Person): Observable<Person> {
    return this.http.put<Person>(`${URL}/${id}`, JSON.stringify(person), httpOptions)
      .pipe(
        catchError(err => {
          console.error(err.message);
          const message = this.errMessage(err);
          this.alert.error(message);
          return throwError(err);
        })
      )
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete<void>(`${URL}/${id}`, httpOptions)
      .pipe(
        catchError(err => {
          console.error(err.message);
          const message = this.errMessage(err);
          this.alert.error(message);
          return throwError(err);
        })
      )
  }
}