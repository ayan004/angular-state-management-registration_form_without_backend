import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistationFormComponent } from './registation-form/registation-form.component';
import { DataTableComponent } from './data-table/data-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { formDataReducer } from './form.reducer';

@NgModule({
  declarations: [RegistationFormComponent, DataTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ listOfStudent: formDataReducer }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ]
})

export class StudentsModule { }
