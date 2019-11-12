import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { User } from './user.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions: any;
  readonly rootUrl = 'http://localhost:51383';
  // User model assigning in service class
  //formData: User;
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  formModel = this.fb.group({
    FirstName: [''],
    LastName: [''],
    UserName: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });
  // confirm password
  comparePasswords(fb: FormGroup) {
    let confirmPasswordCtrl = fb.get('ConfirmPassword');
    // passwordMismatch
    // confirmPasswordCtrl.errors = {passwordMismatch:true}
    if (confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors) {
      if (fb.get('Password').value != confirmPasswordCtrl.value)
        confirmPasswordCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPasswordCtrl.setErrors(null);
    }
  }
  registerUser() {
    var body = {
      FirstName: this.formModel.value.FirstName,
      LastName: this.formModel.value.LastName,
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password
      // ConfirmPassword: this.formModel.value.ConfirmPassword
    };
    //var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    // return this.http.post(this.rootUrl + '/api/ApplicationUser/Register', body, { headers: reqHeader });
    return this.http.post(this.rootUrl + '/api/ApplicationUser/Register', body);
  }

  login(formData) {
    return this.http.post(this.rootUrl + '/api/ApplicationUser/Login', formData);
  }

  getUserProfile() {
    // as the tokenHeader is managed from auth.interceptor.ts file, below these 2 line no needed here
   // var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    //return this.http.get(this.rootUrl + '/api/UserProfile', { headers: tokenHeader });
    return this.http.get(this.rootUrl + '/api/UserProfile');
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {

      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }
}
