import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { ClusterRoleBinding } from '../../../../../model/cluster-role-binding';
import { ClusterRoleList } from '../../../../../model/cluster-role-list';
import { ClusterRoleService } from '../../../../../services/cluster-role.service';
import { timeout } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ClusterRoleBindingService } from '../../../../../services/cluster-role-binding.service';
import { ClusterRole } from '../../../../../model/cluster-role';
import { Subject } from '../../../../../model/subject';
import { ServiceAccount } from '../../../../../model/service-account';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class ClusterRoleBindingRegisterComponent implements OnInit {


  clusterRoleBinding : ClusterRoleBinding= new ClusterRoleBinding()
  clusterRoleList: ClusterRoleList=new ClusterRoleList()
  clusterRole: ClusterRole=new ClusterRole()
  clusterRoleBindingName : string
  users : Object[] = [];
  groups : Object[] = [];
  serviceAccounts : ServiceAccount[]=[]
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

    if (this.clusterRole){
      this.clusterRoleBinding.roleRef.apiGroup="rbac.authorization.k8s.io"
      this.clusterRoleBinding.roleRef.kind="ClusterRole"
      this.clusterRoleBinding.roleRef.name=this.clusterRole.metadata.name
  
      this.users.forEach(u=>{
        this.clusterRoleBinding.subjects.push(new Subject(u["value"],"rbac.authorization.k8s.io","User"))
      })
      
      this.groups.forEach(g=>{
        this.clusterRoleBinding.subjects.push(new Subject(g["value"],"rbac.authorization.k8s.io","Group"))
      })

      this.clusterRoleBindingService.createClusterRoleBinding(this.clusterRoleBinding)
        .subscribe(r=>{
          if(r.ok ){
              this.toastr.success("Cluster Role Assignment created.")
              return
          }
          this.toastr.error("An error ocurred while trying to create permission assignment.")
      }, e=>{
        this.toastr.error("Unexpected error ocurred.")
      })

    }

  
  }

}
