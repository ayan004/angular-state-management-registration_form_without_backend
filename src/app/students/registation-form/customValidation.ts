import { AbstractControl } from "@angular/forms";

var password;

export function ValidatePasswordNoConsecutiveNumberOrAlphabet(control: AbstractControl): { [key: string]: any } | null {
  password = control.value;
  if (control.value !== null) {
    if (password.length > 1) {
      var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
      var result = str.match(password);
      if (result !== null) {
        return { 'consecutiveCharacters': true };
      }
    }
  }
  return null;
}

export function ValidatePasswordAllValidations(control: AbstractControl): { [key: string]: any } | null {
  password = control.value;
  if (control.value !== null) {
    var upperCaseCheck = /(?=.*[A-Z])/;
    if (!upperCaseCheck.test(password)) {
      return { 'noCapitalLetter': true };
    }

    var lowerCaseCheck = /(?=.*[a-z])/;
    if (!lowerCaseCheck.test(password)) {
      return { 'noSmallLetter': true };
    }

    var digitCheck = /(?=.*\d)/;
    if (!digitCheck.test(password)) {
      return { 'noNumber': true };
    }

    var specialCharacterCheck = /(?=.*[!@#$%^&*])/;
    if (!specialCharacterCheck.test(password)) {
      return { 'noSpecialCharacter': true };
    }

  }

  return null;
}

export function ValidateConfirmPasswordEqualsPassword(control: AbstractControl): { [key: string]: any } | null {
  var confirm_password = control.value;
  if (password !== confirm_password) {
    return { 'notEqualToPassword': true };
  }
  return null;
}

export function ValidatePhone(control: AbstractControl): { [key: string]: any } | null {
  var ph_numb = parseInt(control.value);
  var ph_numb_str = ph_numb.toString();
  if (control.value !== null) {
    if ((ph_numb_str.length !== control.value.length) || (control.value && control.value.length != 10)) {
      return { 'phoneNumberInvalid': true };
    }
  }

  return null;
}

export function ValidatePincode(control: AbstractControl): { [key: string]: any } | null {
  var pincode = parseInt(control.value);
  var pincode_str = pincode.toString();
  if (control.value !== null) {
    if (pincode_str.length !== control.value.length) {
      return { 'pincodeInvalid': true };
    }
  }

  return null;
}

export function ValidateWebsite(control: AbstractControl): { [key: string]: any } | null {
  var website = control.value;
  var dot = 0;
  if (control.value !== null) {
    for (var i = 0; i < website.length; i++) {
      if (website[i] === ".") {
        dot++;
        if (website[i + 1] === undefined) {
          return { 'websiteInvalid': true };
        }
        if (dot > 2) {
          return { 'websiteInvalid': true };
        }
      }
    }
    if (dot == 0) {
      return { 'websiteInvalid': true };
    }
  }

  return null;
}

export function ValidateEmailWithSingleDot(control: AbstractControl): { [key: string]: any } | null {
  var email = control.value;
  var dot = 0;
  if (control.value !== null) {
    for (var i = 0; i < email.length; i++) {
      if (email[i] === ".") {
        dot++;
        if (email[i + 1] === undefined) {
          return { 'emailContainNoDot': true };
        }
        if (dot > 2) {
          return { 'emailContainNoDot': true };
        }
      }
    }
    if (dot == 0) {
      return { 'emailContainNoDot': true };
    }
  }

  return null;
}