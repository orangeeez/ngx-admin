import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { NbActionsModule, NbLayoutModule, NbMenuModule, NbUserModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NbLayoutModule,
    NbMenuModule,
    NbUserModule,
    NbActionsModule,
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
