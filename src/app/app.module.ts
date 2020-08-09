import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonTableComponent } from './person/person-table/person-table.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from './alert/alert.module';
import { ModalComponent } from './modal/modal.component';
import { ContainerRefDirective } from './container-ref.directive';

@NgModule({
  declarations: [
    AppComponent,
    PersonTableComponent,
    ModalComponent,
    ContainerRefDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AlertModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
