import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleComponent } from './role.component';
import { ClusterRoleComponent } from './cluster-role.component';
import { ClusterRoleNewComponent } from './cluster-role-new/cluster-role-new.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Roles'
    },
    children: [
      {
        path: '',
        redirectTo: 'buttons'
      },
      {
        path: 'roles',
        component: RoleComponent,
        data: {
          title: 'Namespace Roles'
        }
      },
      {
        path: 'cluster-roles',
        component: ClusterRoleComponent,
        data: {
          title: 'Cluster Role'
        } 
      }  ,
      {
        path: 'cluster-roles/new',
        component: ClusterRoleNewComponent,
        data: {
          title: 'Create/Edit Cluster Roles'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule {}
