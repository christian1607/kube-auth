import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Buttons Routing
import { RbacRoutingModule } from './rbac-routing.module';
import { ClusterRoleNewComponent } from './roles/cluster-role/register/cluster-role-new.component';
import { ClusterRoleComponent } from './roles/cluster-role/cluster-role.component';
import { FormsModule } from '@angular/forms';

import { TagInputModule } from 'ngx-chips';

import { ModalModule } from 'ngx-bootstrap/modal';
import { RoleComponent } from './roles/role/role.component';
import { RoleNewComponent } from './roles/role/register/role-new.component';
import { ClusterRoleBindingComponent } from './binding/cluster-role/cluster-role.component';
import { RoleBindingComponent } from './binding/role/role.component';
import { ClusterRoleBindingRegisterComponent } from './binding/cluster-role/register/register.component';
import { RoleBindingRegisterComponent } from './binding/role/register/register.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ClusterRoleComponent,
    ClusterRoleNewComponent,
    RoleComponent,
    RoleNewComponent,
    ClusterRoleBindingComponent,
    RoleBindingComponent,
    ClusterRoleBindingRegisterComponent,
    RoleBindingRegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RbacRoutingModule,
    ModalModule.forRoot(),
    TagInputModule,
    NgSelectModule
  ]
})
export class RbacModule { }
