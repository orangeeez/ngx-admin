import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NbAuthComponent, NbAuthService } from "@nebular/auth";
import { StateService } from "../../../@core/utils";

@Component({
  selector: "ngx-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent extends NbAuthComponent {
  flipped: boolean = false;
  role: string = "Customer";

  constructor(
    protected auth: NbAuthService,
    protected location: Location,
    public router: Router,
    public stateService: StateService
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
    return this.role === "Provider";
  }

  get isCustomer() {
    return this.role === "Customer";
  }
}
