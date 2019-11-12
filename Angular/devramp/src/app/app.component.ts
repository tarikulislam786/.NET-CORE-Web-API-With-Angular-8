import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/user.service';

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['']
})
export class AppComponent implements OnInit {

  title = 'devramp';
  //sorting
  key: string = 'Name'; //set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }





  userDetails;
  // IsLoggedIn: boolean;
  /* public localStorageItem(): boolean {
     if (localStorage.getItem("token") != null) {
       return true;
     } else {
       return false;
     };
   } */
  constructor(private router: Router, private service: UserService) {
    // this.currentItem = (localStorage.getItem('token') !== null) ? localStorage.getItem('token') : [];
    //this.todos = this.currentItem;
    /*  if (localStorage.getItem('token') != null) {
        this.IsLoggedIn = this.localStorageItem();
        console.log(this.IsLoggedIn);
        this.router.navigateByUrl('/homes');
        //  localStorage.getItem('token');
  
      } else {
        console.log(this.IsLoggedIn);
      } */
  }

  ngOnInit() {

    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
