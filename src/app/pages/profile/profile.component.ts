import { Component, OnInit } from "@angular/core";
import { NbAuthToken } from "@nebular/auth";
import { AuthService } from "../../auth/services/auth.service";
import { User } from "../../models/user";

@Component({
  selector: "ngx-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  stepperClosed: boolean = false;
  user: User;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.getToken().subscribe((token: NbAuthToken) => {
      this.user = token.getPayload();
    });
  }

  onStepperClose() {
    this.stepperClosed = true;
  }
}
