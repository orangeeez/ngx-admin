import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import {
  NbAuthResult,
  NbRegisterComponent,
  NbTokenService,
  NB_AUTH_OPTIONS,
} from "@nebular/auth";
import { StateService } from "../../../@core/utils";
import { TELEGRAM_BOT_OPTIONS } from "../../auth.options";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "ngx-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent extends NbRegisterComponent {
  role: string;
  isLoad: boolean = false;
  isLoadError: boolean = false;

  constructor(
    @Inject(TELEGRAM_BOT_OPTIONS) protected botOptions,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    public tokenService: NbTokenService,
    public service: AuthService,
    public stateService: StateService,
    cd: ChangeDetectorRef,
    router: Router
  ) {
    super(service, options, cd, router);
    this.stateService.registerFlip();
    this.stateService.roleChanged$.subscribe((role) => (this.user.role = role));
  }

  onLoad() {
    this.isLoad = true;
  }

  onLoadError() {
    this.isLoadError = true;
  }

  onLoginLinkClick() {
    this.stateService.registerFlip();
    this.router.navigateByUrl("../login");
  }

  onLogin(data: any) {
    this.service
      .tgLogin(this.strategy, "/register", { role: this.user.role, data: data })
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
