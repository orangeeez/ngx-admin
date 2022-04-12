import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NbAuthResult,
  NbLoginComponent,
  NbTokenService,
  NB_AUTH_OPTIONS,
} from "@nebular/auth";
import { NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { TELEGRAM_BOT_OPTIONS } from "../../auth.options";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent extends NbLoginComponent implements AfterViewInit {
  isLoad: boolean = false;
  isLoadError: boolean = false;

  constructor(
    @Inject(TELEGRAM_BOT_OPTIONS) protected botOptions,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    public tokenService: NbTokenService,
    public service: AuthService,
    cd: ChangeDetectorRef,
    router: Router
  ) {
    super(service, options, cd, router);

    var state = this.router.getCurrentNavigation()?.extras?.state;
    this.messages = state?.messages;
    this.errors = state?.errors;
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((queryParams: any) => {
      if (!queryParams) return;

      if (queryParams.email) {
        var message = !queryParams.confirmed
          ? `${queryParams.email} was successfully confirmed`
          : `${queryParams.email} wasn't confirmed`;

        this.toastrService.show(message, `Email confirmation`, {
          position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
          status: !queryParams.confirmed ? "success" : "danger",
          duration: 5000,
        });
      }
    });
  }

  onLoad() {
    this.isLoad = true;
  }

  onLoadError() {
    this.isLoadError = true;
  }

  onLogin(data: any) {
    this.service
      .tgLogin(this.strategy, "/login", data)
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
