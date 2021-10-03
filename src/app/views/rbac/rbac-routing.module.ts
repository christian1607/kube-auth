import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleComponent } from './roles/role/role.component';
import { ClusterRoleComponent } from './roles/cluster-role/cluster-role.component';
import { ClusterRoleNewComponent } from './roles/cluster-role/register/cluster-role-new.component';
import { RoleNewComponent } from './roles/role/register/role-new.component';
import { ClusterRoleBindingComponent } from './binding/cluster-role/cluster-role.component';
import { RoleBindingComponent } from './binding/role/role.component';
import { ClusterRoleBindingRegisterComponent } from './binding/cluster-role/register/register.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'RBAC'
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
        path: 'roles/new',
        component: RoleNewComponent,
        data: {
          title: 'Create/Edit Roles'
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
      },
      {
        path: 'binding/cluster-role',
        component: ClusterRoleBindingComponent,
        data: {
          title: 'Cluster Roles permissions'
        }
      },
      {
        path: 'binding/cluster-role/register',
        component: ClusterRoleBindingRegisterComponent,
        data: {
          title: 'Assing Cluster Roles permissions'
        }
      },

      

      {
        path: 'binding/role',
        component: RoleBindingComponent,
        data: {
          title: 'Assing Role permissions'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RbacRoutingModule {}
