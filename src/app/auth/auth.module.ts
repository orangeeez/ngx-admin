import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
} from '@nebular/theme';
import { LoginComponent } from '../components/login/login.component';
import { AngularTelegramLoginWidgetModule } from 'angular-telegram-login-widget';
import { RegisterComponent } from '../components/register/register.component';
import { LogoutComponent } from '../components/logout/logout.component';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { RequestPasswordComponent } from '../components/request-password/request-password.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    AngularTelegramLoginWidgetModule,

    NbAuthModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ResetPasswordComponent,
    RequestPasswordComponent,
  ],
})
export class NgxAuthModule {}
