import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestAccessComponent } from './request-access/request-access.component';
import { EvaluateAccessComponent } from './evaluate-access/evaluate-access.component';


// Buttons Routing

import { FormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { X509RoutingModule } from './x509-routing.module';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MonacoEditorModule } from 'ngx-monaco';


@NgModule({
  declarations: [
    RequestAccessComponent,
    EvaluateAccessComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    X509RoutingModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    MonacoEditorModule.forRoot()

  ]
})
export class X509Module { }