import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NbAuthResult,
  NbResetPasswordComponent,
  NbTokenService,
  NB_AUTH_OPTIONS,
} from "@nebular/auth";
import { NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "ngx-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent extends NbResetPasswordComponent {
  constructor(
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    public tokenService: NbTokenService,
    public service: AuthService,
    cd: ChangeDetectorRef,
    router: Router
  ) {
    super(service, options, cd, router);
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((queryParams: any) => {
      if (!queryParams) return;

      if (queryParams.token) {
        this.user.token = queryParams?.token;
      }
    });
  }

  resetPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service
      .resetPassword(this.strategy, this.user)
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
            return this.router.navigateByUrl(redirect, {
              state: {
                messages: this.messages,
                errors: this.errors,
              },
            });
          }, this.redirectDelay);
        }
        this.cd.detectChanges();
      });
  }
}
