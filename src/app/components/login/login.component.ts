import { Component, OnInit } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends NbLoginComponent {
  isLoad: boolean = false;
  isLoadError: boolean = false;
  userOutput = '';
  botName = 'lolka11bot';

  onLoad() {
    this.isLoad = true;
  }

  onLoadError() {
    this.isLoadError = true;
  }

  onLogin(user: any) {
    this.userOutput = JSON.stringify(user, null, 4);
    console.log(this.userOutput);
  }
}
