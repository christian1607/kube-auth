import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RequestAccessComponent } from './x509/request-access/request-access.component';
import { EvaluateAccessComponent } from './x509/evaluate-access/evaluate-access.component';
import { ServiceAccountComponent } from './service-account/sa.component';
import { RegisterComponent } from './service-account/register/register.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Authentication'
    },
    children: [

      {
        path: 'x509/request-access',
        component: RequestAccessComponent,
        data: {
          title: 'Request Access'
        }
      },
      {
        path: 'x509/evaluate-access',
        component: EvaluateAccessComponent,
        data: {
          title: 'Evaluate-access'
        }
      },
      {
        path: 'service-account',
        component: ServiceAccountComponent,
        data: {
          title: 'Evaluate-access'
        }
      },
      {
        path: 'service-account/new',
        component: RegisterComponent,
        data: {
          title: 'Evaluate-access'
        }
      }  
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
