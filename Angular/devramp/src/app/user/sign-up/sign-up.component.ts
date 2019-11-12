import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }
  onSubmit() {
    this.service.registerUser().subscribe(
      (res: any) => {
        if (res.Succeeded) {
          this.service.formModel.reset();
          this.toastr.success('New user created!', 'Registration Successful.');
        } else {console.log(res)
          res.Errors.forEach(element => {
            switch (element.Code) {
              case 'DuplicateUserName':
                // Username is already taken
                this.toastr.error('Username is already taken', 'Registration Failed.');
                break;
              default:
                // Registration failed
                this.toastr.error(element.description, 'Registration Failed.');
                break;
            }
          });
        }
      },
      err => {console.log(err) }
    );
  }
}
