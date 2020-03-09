import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { DeletePersonComponent } from './delete-person/delete-person.component';


const routes: Routes = [
  {path: '', component: TableComponent},
  {path: 'add-person', component: AddPersonComponent},
  {path: 'edit-person', component: EditPersonComponent},
  {path: 'delete-person', component: DeletePersonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
