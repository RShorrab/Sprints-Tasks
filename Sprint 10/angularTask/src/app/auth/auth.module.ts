import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterationComponent } from './registeration/registeration.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    RegisterationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
