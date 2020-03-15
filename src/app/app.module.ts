import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './person/table/table.component';
import { AddPersonComponent } from './person/add-person/add-person.component';
import { EditPersonComponent } from './person/edit-person/edit-person.component';
import { DeletePersonComponent } from './person/delete-person/delete-person.component';
import { HttpService } from './service/http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from './alert/alert.module';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    AddPersonComponent,
    EditPersonComponent,
    DeletePersonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
