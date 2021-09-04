import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Buttons Routing
import { RoleRoutingModule } from './role-routing.module';
import { ClusterRoleNewComponent } from './cluster-role-new/cluster-role-new.component';
import { ClusterRoleComponent } from './cluster-role.component';
import { FormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { RoleComponent } from './role.component';
import { RoleNewComponent } from './role-new/role-new.component';

@NgModule({
  declarations: [
    ClusterRoleComponent,
    ClusterRoleNewComponent,
    RoleComponent,
    RoleNewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RoleRoutingModule,
    ModalModule.forRoot()

  ]
})
export class RoleModule { }
