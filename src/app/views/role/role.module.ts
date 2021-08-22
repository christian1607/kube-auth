import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Buttons Routing
import { RoleRoutingModule } from './role-routing.module';
import { ClusterRoleNewComponent } from './cluster-role-new/cluster-role-new.component';
import { ClusterRoleComponent } from './cluster-role.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClusterRoleComponent,
    ClusterRoleNewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RoleRoutingModule
  ]
})
export class RoleModule { }
