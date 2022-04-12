import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { ProfileRoutingModule } from "./profile-routing.module";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbStepperModule,
  NbUserModule,
} from "@nebular/theme";
import { AngularTelegramLoginWidgetModule } from "angular-telegram-login-widget";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StepperComponent } from "./stepper/stepper.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    NbLayoutModule,
    NbMenuModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbUserModule,
    NbActionsModule,
    NbCardModule,
    NbStepperModule,
    ReactiveFormsModule,
    AngularTelegramLoginWidgetModule,
  ],
  declarations: [ProfileComponent, StepperComponent],
})
export class ProfileModule {}
