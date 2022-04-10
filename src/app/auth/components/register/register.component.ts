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
import { TELEGRAM_BOT_OPTIONS } from "../../auth.options";
import { AuthService } from "../../services/auth.service";

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
    public service: AuthService,
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

  onLogin(data: any) {
    this.service
      .tgLogin(this.strategy, "/register", data)
      .subscribe((result: NbAuthResult) => {
        this.submitted = false;

        if (result.isSuccess()) {
          this.messages = result.getMessages();
        } else {
          this.errors = result.getErrors();
        }

        const redirect = result.getRedirect();
        if (redirect) {
          setTimeout(() => {
            return this.router.navigateByUrl(redirect);
          }, this.redirectDelay);
        }
        this.cd.detectChanges();
      });
  }
}
