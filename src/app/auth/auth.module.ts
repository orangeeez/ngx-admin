import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { NgxAuthRoutingModule } from "./auth-routing.module";
import { NbAuthModule } from "@nebular/auth";
import {
  NbAlertModule,
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
} from "@nebular/theme";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { RequestPasswordComponent } from "./components/request-password/request-password.component";
import { AuthComponent } from "./components/auth/auth.component";
import { AuthService } from "./services/auth.service";
import { AngularTelegramLoginWidgetModule } from "angular-telegram-login-widget";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAuthModule,
    NbCardModule,
    NbLayoutModule,
    NbIconModule,
    NbButtonGroupModule,
    NgxAuthRoutingModule,
    AngularTelegramLoginWidgetModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ResetPasswordComponent,
    RequestPasswordComponent,
    AuthComponent,
  ],
  providers: [AuthService],
})
export class NgxAuthModule {}
