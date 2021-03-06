import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../localStorageService';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';


export interface IUser {
  id?: number;
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: IUser = { username: '', password: '' };
  localSotrageService: LocalStorageService<IUser>;
  currentUser: IUser = null;
  constructor(private router: Router, private toastService: ToastService) {
    this.localSotrageService = new LocalStorageService('user');
  }

  ngOnInit() {
    this.currentUser = this.localSotrageService.getItemsFromLocalStorage();
    console.log('this.currentUser.....', this.currentUser);

    if (this.currentUser != null) {
      // this.router.navigate(['contacts']);

    }

  }

  login(user: IUser) {
    console.log('from login user: ', user);
    const defaultUser: IUser = { username: 'miguel2105', password: 'My1992yr' };

    if (user.username !== '' && user.password !== '') {
      if (user.username === defaultUser.username && user.password === defaultUser.password) {
        //log the user in
        //store user in localSotrage
        this.localSotrageService.saveItemsToLocalStorage(user);
        //navigate to contacts page
        this.router.navigate(['contacts', user]);

      } else {
        //show error toast user
        this.toastService.showToast('danger', 5000, 'Login failed! Please check your username or passowrd!');

      }
    } else {
      //show error toast user
      this.toastService.showToast('danger', 5000, 'Login failed! Please specify username or passowrd!');

    }

  }
}
