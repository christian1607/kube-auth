import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RequestAccessComponent } from './request-access/request-access.component';
import { EvaluateAccessComponent } from './evaluate-access/evaluate-access.component';

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
      }
      
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class X509RoutingModule { }
