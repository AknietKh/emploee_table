import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonTableComponent } from './person/person-table/person-table.component';

const routes: Routes = [
  {path: '', component: PersonTableComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
