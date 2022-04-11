import { Component, Inject, OnInit } from "@angular/core";
import {
  getDeepFromObject,
  NbAuthResult,
  NbAuthToken,
  NB_AUTH_OPTIONS,
} from "@nebular/auth";
import { NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { TELEGRAM_BOT_OPTIONS } from "../../auth/auth.options";
import { AuthService } from "../../auth/services/auth.service";
import { User } from "../../models/user";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  isLoad: boolean = false;
  isLoadError: boolean = false;
  strategy: string = "";
  user: User;
  linkedEmail: string;

  constructor(
    @Inject(TELEGRAM_BOT_OPTIONS) public botOptions,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    public authService: AuthService,
    public toastrService: NbToastrService
  ) {
    this.strategy = this.getConfigValue("forms.login.strategy");
  }

  ngOnInit() {
    this.authService.getToken().subscribe((token: NbAuthToken) => {
      this.user = token.getPayload();
    });
  }

  onLoad() {
    this.isLoad = true;
  }

  onLoadError() {
    this.isLoadError = true;
  }

  onLogin(data: any) {
    this.authService
      .tgLogin(this.strategy, "/link", data)
      .subscribe((result: NbAuthResult) => {
        this.user = result.getToken().getPayload();

        this.toastrService.show(
          `@${this.user.tg_username} was successfully linked.`,
          `Telegram linking`,
          {
            position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
            status: "success",
            duration: 5000,
          }
        );
      });
  }

  emailLink() {
    this.authService
      .emailLink(this.strategy, this.linkedEmail)
      .subscribe((result: NbAuthResult) => {
        this.user = result.getToken().getPayload();

        this.toastrService.show(
          `@${this.user.email} was successfully linked.`,
          `Email linking`,
          {
            position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
            status: "success",
            duration: 5000,
          }
        );
      });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
