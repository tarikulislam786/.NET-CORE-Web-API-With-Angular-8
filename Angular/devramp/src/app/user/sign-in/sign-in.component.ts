import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  }


  //private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  //get isLoggedIn() {
  //  return this.loggedIn.asObservable(); // {2}
  //}


  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/home');
    }
  }
  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
       // this.loggedIn.next(true);
        this.router.navigateByUrl('/home');
      },
      err => {
        if (err.status == '400') {
          this.toastr.error('Incorrect username or password', 'Authentication failed');
        } else {
          console.log(err);
        }
      }
    );
  }

}
