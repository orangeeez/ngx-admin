import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  NbAuthJWTToken,
  NbAuthResult,
  NbAuthService,
  NbRegisterComponent,
  NbTokenService,
  NB_AUTH_OPTIONS,
} from "@nebular/auth";
import { TELEGRAM_BOT_OPTIONS } from "../auth.options";

@Component({
  selector: "ngx-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent extends NbRegisterComponent {
  isLoad: boolean = false;
  isLoadError: boolean = false;

  constructor(
    @Inject(TELEGRAM_BOT_OPTIONS) protected botOptions,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    public tokenService: NbTokenService,
    service: NbAuthService,
    cd: ChangeDetectorRef,
    router: Router
  ) {
    super(service, options, cd, router);
  }
  onLoad() {
    this.isLoad = true;
  }

  onLoadError() {
    this.isLoadError = true;
  }

  onLogin(user: any) {
    const token = new NbAuthJWTToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJuYW1lIjoiQW5kcmV3IFJ5emhrb3YiLCJpYXQiOjE1MTYyMzkwMjIsInBpY3R1cmUiOiJhc3NldHMvaW1hZ2VzL3J5emhrb3YuanBnIn0.aUhizY7ESNFDPL1aSVL8LWpHkkfnbW1kcYKs9Ai20CI",
      "login",
      new Date(1516239022)
    );
    const result = new NbAuthResult(
      true,
      null,
      "/",
      [],
      "You have been successfully logged in.",
      token
    );
    this.tokenService.set(result.getToken());
    if (result.getRedirect()) {
      setTimeout(() => {
        this.router.navigateByUrl(result.getRedirect());
      }, this.redirectDelay);
    }
    this.cd.detectChanges();
  }
}
