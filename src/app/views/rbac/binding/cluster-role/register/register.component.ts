import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { ClusterRoleBinding } from '../../../../../model/cluster-role-binding';
import { ClusterRoleList } from '../../../../../model/cluster-role-list';
import { ClusterRoleService } from '../../../../../services/cluster-role.service';
import { timeout } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ClusterRoleBindingService } from '../../../../../services/cluster-role-binding.service';
import { ClusterRole } from '../../../../../model/cluster-role';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class ClusterRoleBindingRegisterComponent implements OnInit {


  clusterRoleBinding : ClusterRoleBinding= new ClusterRoleBinding()
  clusterRoleList: ClusterRoleList
  clusterRole: ClusterRole

  constructor(private clusterRoleService: ClusterRoleService,
    private clusterRoleBindingService: ClusterRoleBindingService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listClusterRole()
  }

  listClusterRole(){

    this.clusterRoleService.listClusterRoles()
      .pipe(timeout(environment.TIMEOUT_HTTP_REQUEST))
      .subscribe(r=>{
         if(r.ok ){
           this.clusterRoleList=r.body
           this.clusterRoleList.items=this.clusterRoleList.items.filter(cr=>{return !cr.metadata.name.startsWith("system:")})
           return
         }
         this.toastr.error("Error while trying to fetch cluster roles")
      })
  }

  submitForm(){

    this.clusterRoleBinding.roleRef.apiVersion=this.clusterRole.apiVersion
    this.clusterRoleBinding.roleRef.kind=this.clusterRole.kind
    this.clusterRoleBinding.roleRef.name=this.clusterRole.metadata.name
    
    this.clusterRoleBindingService.createClusterRoleBinding(this.clusterRoleBinding)
      .subscribe(r=>{
        if(r.ok ){
            this.toastr.success("Cluster Role Assignment created.")
            return
        }
        this.toastr.error("Unexpected error ocurred.")
      })
  }

}
