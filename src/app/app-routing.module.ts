import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from './students/data-table/data-table.component';
import { RegistationFormComponent } from './students/registation-form/registation-form.component';

const routes: Routes = [
  { path: "datatable", component: DataTableComponent },
  { path: "signup", component: RegistationFormComponent },
  { path: "", redirectTo: "signup", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
