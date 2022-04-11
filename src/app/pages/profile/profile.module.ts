import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { ProfileRoutingModule } from "./profile-routing.module";
import {
  NbActionsModule,
  NbButtonModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
} from "@nebular/theme";
import { AngularTelegramLoginWidgetModule } from "angular-telegram-login-widget";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    NbLayoutModule,
    NbMenuModule,
    NbInputModule,
    NbButtonModule,
    NbUserModule,
    NbActionsModule,
    AngularTelegramLoginWidgetModule,
  ],
  declarations: [ProfileComponent],
})
export class ProfileModule {}
