import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ValidationErrors, AbstractControl } from '@angular/forms';
import { ValidateConfirmPasswordEqualsPassword, ValidatePhone, ValidatePincode, ValidateWebsite, ValidateEmailWithSingleDot, ValidatePasswordAllValidations, ValidatePasswordNoConsecutiveNumberOrAlphabet } from './customValidation';

import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as formDataActions from 'src/app/students/form.action';
import formData from 'src/app/students/form.model';
import studentListState from 'src/app/students/form.state';

@Component({
  selector: 'app-registation-form',
  templateUrl: './registation-form.component.html',
  styleUrls: ['./registation-form.component.css']
})

export class RegistationFormComponent implements OnInit {

  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
    email: new FormControl('', [Validators.required, Validators.email, ValidateEmailWithSingleDot]),
    phone_number: new FormControl('', [Validators.required, ValidatePhone]),
    website: new FormControl('', [Validators.required, ValidateWebsite]),
    gender: new FormControl('', Validators.required),
    houseNameOrNumberOrRoadName: new FormControl('', Validators.required),
    landmark: new FormControl('', Validators.required),
    cityOrVillage: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    pincode: new FormControl('', [Validators.required, ValidatePincode]),
    password: new FormControl('', [Validators.required, ValidatePasswordAllValidations, ValidatePasswordNoConsecutiveNumberOrAlphabet]),
    confirm_password: new FormControl('', [Validators.required, ValidateConfirmPasswordEqualsPassword]),
    checkbox: new FormControl('', Validators.requiredTrue),
  });

  id!: number;
  studentListObservable$: Observable<studentListState>;
  studentListSubscription!: Subscription;
  allRegisteredStudents: formData[] = [];
  anyTypeOfError!: Error;

  constructor(private store: Store<{ listOfStudent: studentListState }>) {
    this.studentListObservable$ = store.pipe(select('listOfStudent'));
  }

  ngOnInit() {
    this.studentListSubscription = this.studentListObservable$.pipe(
      map(x => {
        this.allRegisteredStudents = x.studentList;
        this.anyTypeOfError = x.SlError;
      })
    ).subscribe();

  }

  postData() {
    const formdata: formData = { id: this.id, username: this.signupForm.value.username, email: this.signupForm.value.email, phone_number: this.signupForm.value.phone_number, website: this.signupForm.value.website, gender: this.signupForm.value.gender, houseNameOrNumberOrRoadName: this.signupForm.value.houseNameOrNumberOrRoadName, landmark: this.signupForm.value.landmark, cityOrVillage: this.signupForm.value.cityOrVillage, state: this.signupForm.value.state, country: this.signupForm.value.country, pincode: this.signupForm.value.pincode, password: this.signupForm.value.password, checkbox: this.signupForm.value.checkbox };

    this.store.dispatch(formDataActions.CreateformDataAction({ payload: formdata }));
    console.log(this.signupForm.value);
    console.log("submit button clicked");
    this.signupForm.reset();
  }

  ngOnDestroy() {
    if (this.studentListSubscription) {
      this.studentListSubscription.unsubscribe();
    }
  }

}

