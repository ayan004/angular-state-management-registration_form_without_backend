import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as formDataActions from 'src/app/students/form.action';
import { BeginGetformDataAction } from 'src/app/students/form.action';
import formdata from 'src/app/students/form.model';
import studentListState from 'src/app/students/form.state';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})

export class DataTableComponent implements OnInit {

  studentListObservable$: Observable<studentListState>;
  studentListSubscription!: Subscription;
  allRegisteredStudents!: formdata[];
  anyTypeOfError!: Error;

  constructor(private store: Store<{ listOfStudent: studentListState }>) {
    this.studentListObservable$ = store.pipe(select('listOfStudent'));
  }

  ngOnInit() {
    this.studentListSubscription = this.studentListObservable$.pipe(
      map(x => {
        this.allRegisteredStudents = x.studentList;
        // this.anyTypeOfError = x.SlError;
      })
    ).subscribe(() => {
      // we Call subscribe() - to start listening for updates
      console.log('here', this.allRegisteredStudents);
      console.log('here we go');
    });
  }

  ngOnDestroy() {
    if (this.studentListSubscription) {
      this.studentListSubscription.unsubscribe();
    }
  }

  // testFunction() {
  //   console.log("test button clicked");
  //   console.log("address : " + this.allRegisteredStudents[0].houseNameOrNumberOrRoadName + ", " + this.allRegisteredStudents[0].landmark);
  // }

}
