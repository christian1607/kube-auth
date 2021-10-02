import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Buttons Routing
import { RbacRoutingModule } from './rbac-routing.module';
import { ClusterRoleNewComponent } from './roles/cluster-role/register/cluster-role-new.component';
import { ClusterRoleComponent } from './roles/cluster-role/cluster-role.component';
import { FormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { RoleComponent } from './roles/role/role.component';
import { RoleNewComponent } from './roles/role/register/role-new.component';
import { ClusterRoleBindingComponent } from './binding/cluster-role/cluster-role.component';
import { RoleBindingComponent } from './binding/role/role.component';

@NgModule({
  declarations: [
    ClusterRoleComponent,
    ClusterRoleNewComponent,
    RoleComponent,
    RoleNewComponent,
    ClusterRoleBindingComponent,
    RoleBindingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RbacRoutingModule,
    ModalModule.forRoot()

  ]
})
export class RbacModule { }
