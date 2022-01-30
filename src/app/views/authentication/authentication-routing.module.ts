import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RequestAccessComponent } from './x509/request-access/request-access.component';
import { EvaluateAccessComponent } from './x509/evaluate-access/evaluate-access.component';
import { ServiceAccountComponent } from './service-account/sa.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Authentication'
    },
    children: [
      {
        path: 'x509',
        data: {
          title: 'x509 Authentication'
        },
        children: [
          {
            path: 'request-access',
            component: RequestAccessComponent,
            data: {
              title: 'Request Access'
            }
          },
          {
            path: 'evaluate-access',
            component: EvaluateAccessComponent,
            data: {
              title: 'Evaluate Access'
            }
          }
          
        ]
      },
      {
        path: 'service-account',
        data: {
          title: 'Service Accounts'
        },
        component: ServiceAccountComponent,
        children: [
          {
            path: 'new',
            component: RequestAccessComponent,
            data: {
              title: 'Create/Edit Service Account'
            }
          }
          
        ]
      }
      
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
