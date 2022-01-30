import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestAccessComponent } from './x509/request-access/request-access.component';
import { EvaluateAccessComponent } from './x509/evaluate-access/evaluate-access.component';


// Buttons Routing

import { FormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthenticationRoutingModule } from './authentication-routing.module';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MonacoEditorModule } from 'ngx-monaco';
import { RegisterComponent } from './service-account/register/register.component';
import { ServiceAccountComponent } from './service-account/sa.component';


@NgModule({
  declarations: [
    RequestAccessComponent,
    EvaluateAccessComponent,
    RegisterComponent,
    ServiceAccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthenticationRoutingModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    MonacoEditorModule.forRoot()

  ]
})
export class AuthenticationModule { }
