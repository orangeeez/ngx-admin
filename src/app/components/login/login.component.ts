import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthJWTToken, NbAuthResult, NbAuthService, NbLoginComponent, NbTokenService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends NbLoginComponent {
  isLoad: boolean = false;
  isLoadError: boolean = false;
  userOutput = '';
  botName = 'auth2fitnessbot';

  constructor(
      @Inject(NB_AUTH_OPTIONS) protected options = {},
      public tokenService: NbTokenService,
      service: NbAuthService,
      cd: ChangeDetectorRef,
      router: Router) {
    super(service, options, cd, router);
  }

  login(): void {
    super.login();
  }

  onLoad() {
    this.isLoad = true;
  }

  onLoadError() {
    this.isLoadError = true;
  }

  onLogin(user: any) {
    const token = new NbAuthJWTToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJuYW1lIjoiQW5kcmV3IFJ5emhrb3YiLCJpYXQiOjE1MTYyMzkwMjIsInBpY3R1cmUiOiJhc3NldHMvaW1hZ2VzL3J5emhrb3YuanBnIn0.aUhizY7ESNFDPL1aSVL8LWpHkkfnbW1kcYKs9Ai20CI', 'login', new Date(1516239022));
    const result = new NbAuthResult(true, null, '/', [], 'You have been successfully logged in.', token);
    this.tokenService.set(result.getToken());
    if (result.getRedirect()) {
      setTimeout(() => {
          this.router.navigateByUrl(result.getRedirect());
      }, this.redirectDelay);
    }
    this.cd.detectChanges();
  }
}
