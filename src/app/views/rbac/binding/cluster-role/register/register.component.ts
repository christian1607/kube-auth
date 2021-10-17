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
import { ActivatedRoute } from '@angular/router';


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
  isEdit: boolean = false
  constructor(private clusterRoleService: ClusterRoleService,
    private clusterRoleBindingService: ClusterRoleBindingService,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit(){
    var crb = this.route.snapshot.queryParamMap.get('cluster-role-binding')
    if (crb){
      this.isEdit=true    
    }
    this.listClusterRole()
    
  }

  private fetchClusterRoleBinding(name:string){
    this.clusterRoleBindingService.findClusterRolesBindings(name)
      .subscribe(r=>{
        if (r.ok){
          this.clusterRoleBinding=r.body
          this.users=[]
          this.groups=[]
          this.clusterRoleBinding.subjects.forEach(sub=>{
            if (sub.kind=="Group"){
              this.groups.push({"value":sub.name,"display":sub.name})
            }
            if (sub.kind=="User"){
              this.users.push({"value":sub.name,"display":sub.name})
            }
          })

          this.clusterRole=this.clusterRoleList.items.find(crl=> {return  crl.metadata.name==this.clusterRoleBinding.roleRef.name})
        }
    })
  }

  listClusterRole(){

    this.clusterRoleService.listClusterRoles()
      .pipe(timeout(environment.TIMEOUT_HTTP_REQUEST))
      .subscribe(r=>{
         if(r.ok ){
           this.clusterRoleList=r.body
           this.clusterRoleList.items=this.clusterRoleList.items.filter(cr=>{return !cr.metadata.name.startsWith("system:")})

           if (this.isEdit){
            var crb = this.route.snapshot.queryParamMap.get('cluster-role-binding')
            this.fetchClusterRoleBinding(crb)
           }
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
      this.clusterRoleBinding.subjects = []

      this.users.forEach(u=>{
        this.clusterRoleBinding.subjects.push(new Subject(u["value"],"rbac.authorization.k8s.io","User"))
      })
      
      this.groups.forEach(g=>{
        this.clusterRoleBinding.subjects.push(new Subject(g["value"],"rbac.authorization.k8s.io","Group"))
      })

      if (this.isEdit){
        this.clusterRoleBindingService.updateClusterRoleBinding(this.clusterRoleBinding.metadata.name,this.clusterRoleBinding)
          .subscribe(r=>{
            if(r.ok ){
                this.toastr.success("Cluster Role permission updated.")
                this.fetchClusterRoleBinding(this.clusterRoleBinding.metadata.name)
                return
            }
            this.toastr.error("An error ocurred while trying to update permission assignment.")
        }, e=>{
          this.toastr.error("Unexpected error ocurred.")
        })
      }else{
        this.clusterRoleBindingService.createClusterRoleBinding(this.clusterRoleBinding)
          .subscribe(r=>{
            if(r.ok ){
                this.toastr.success("Cluster Role permission created.")
                return
            }
            this.toastr.error("An error ocurred while trying to create permission assignment.")
        }, e=>{
          this.toastr.error("Unexpected error ocurred.")
        })
      }
    }

  
  }

}
