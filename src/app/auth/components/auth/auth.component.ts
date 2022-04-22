import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NbAuthComponent, NbAuthService } from "@nebular/auth";
import { NbMenuService } from "@nebular/theme";
import { filter, map } from "rxjs/operators";
import { StateService } from "../../../@core/utils";
import { LanguageService } from "../../../@core/utils/language.service";

@Component({
  selector: "ngx-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent extends NbAuthComponent {
  LANGUAGE_MENU = [];
  flipped: boolean = false;
  role: string = "customer";

  constructor(
    protected auth: NbAuthService,
    protected location: Location,
    public router: Router,
    public stateService: StateService,
    public languageService: LanguageService,
    public menuService: NbMenuService
  ) {
    super(auth, location);

    this.stateService.roleChanged$.subscribe((role) => {
      if (this.role !== role) {
        this.role = role;
        this.flip();
      }
    });

    this.stateService.registerFlipped$.subscribe(() => {
      if (this.isProvider) this.flip();
    });

    this.languageService.onLanguageChanged().subscribe((language) => {
      this.LANGUAGE_MENU = language;
    });

    this.menuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === "language-menu"),
        map(({ item: item }) => item)
      )
      .subscribe((item) => this.languageService.onLanguageMenuClick(item));
  }

  get overflow() {
    return this.flipped ? "auto" : "hidden";
  }

  roleChanged(role) {
    this.stateService.changeRole(role[0]);
  }

  flip() {
    this.flipped = !this.flipped;
  }

  get isProvider() {
    return this.role === "provider";
  }

  get isCustomer() {
    return this.role === "customer";
  }
}
