import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './person/table/table.component';
import { AddPersonComponent } from './person/add-person/add-person.component';
import { EditPersonComponent } from './person/edit-person/edit-person.component';


const routes: Routes = [
  {path: '', component: TableComponent},
  {path: 'add-person', component: AddPersonComponent, data: {title: 'Add Person'}},
  {path: 'edit-person/:id', component: EditPersonComponent, data: {title: 'Edit Person'}},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
