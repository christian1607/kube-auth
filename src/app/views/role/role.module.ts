import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Buttons Routing
import { RoleRoutingModule } from './role-routing.module';
import { ClusterRoleNewComponent } from './cluster-role-new/cluster-role-new.component';


@NgModule({
  declarations: [
    
  
    ClusterRoleNewComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule
  ]
})
export class RoleModule { }
