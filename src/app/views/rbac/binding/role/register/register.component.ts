import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { timeout } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Subject } from '../../../../../model/subject';
import { ServiceAccount } from '../../../../../model/service-account';
import { NamespaceList } from '../../../../../model/namespace-list';
import { NamespaceService } from '../../../../../services/namespace.service';
import { RoleBindingService } from '../../../../../services/role-binding.service';
import { RoleService } from '../../../../../services/role.service';
import { RoleBinding } from '../../../../../model/role-binding';
import { RoleList } from '../../../../../model/role-list';
import { Role } from '../../../../../model/role';
import { ActivatedRoute } from '@angular/router';
import { ServiceAccountService } from '../../../../../services/service-account.service';
import { Observable,of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RoleBindingRegisterComponent implements OnInit {


  roleBinding : RoleBinding= new RoleBinding()
  roleList: RoleList= new RoleList()
  namespaceList: NamespaceList = new NamespaceList();
  private filterNamespace: string 
  isEdit:boolean=false
  role: Role

  users : Object[] = [];
  groups : Object[] = [];
  serviceAccounts : Object[]=[];

  serviceAccountList$: Observable<any[]>;
  selectedServiceAccount = [];


  constructor(private roleService: RoleService,
    private roleBindingService: RoleBindingService,
    private namespaceService: NamespaceService, 
    private serviceAccService: ServiceAccountService,
    private route: ActivatedRoute,
    private toastr: ToastrService) { 

  }

  ngOnInit(): void {

    var rb = this.route.snapshot.queryParamMap.get('role-binding')
    if (rb){
      this.isEdit=true    
    }

    this.listRole()
    this.listNamespaces()
    this.listServiceAccounts()
  }

  listRole(){

    this.roleService.listRolesAllNamespaces()
      .pipe(timeout(environment.TIMEOUT_HTTP_REQUEST))
      .subscribe(r=>{
         if(r.ok ){
           this.roleList=r.body
           this.roleList.items=this.roleList.items.filter(cr=>{return !cr.metadata.name.startsWith("system:")})
           return
         }
         this.toastr.error("Error while trying to fetch cluster roles")
      })
  }

  
  filterRoleByNamespace(){

    this.roleService.listRoles(this.filterNamespace)
      .pipe(timeout(environment.TIMEOUT_HTTP_REQUEST))
      .subscribe(r=>{
          if(r.ok ){
            this.roleList=r.body
            this.roleList.items=this.roleList.items.filter(cr=>{return !cr.metadata.name.startsWith("system:")})
            return
          }
          this.toastr.error("Error while trying to fetch cluster roles")
      })
  }

  private listNamespaces(){

    this.namespaceService.listAllNamespaces()
      .pipe(timeout(environment.TIMEOUT_HTTP_REQUEST))
      .subscribe(
        (r)=>{
          if(r.ok){
            this.namespaceList=r.body
          }else{
            this.toastr.warning('could not be list namespaces.')
          }
        }, 
        (e)=>{
          this.toastr.error('An error ocurred trying to fetch namespaces.')
        }
      )
  }

  private listServiceAccounts(){
    this.serviceAccService.listServiceAccount()
      .subscribe(r=>{
        if (r.ok){
          this.serviceAccountList$=of(r.body.items.map(sa=>{
            return {"id":sa.metadata.name,"name":sa.metadata.name}
          })).pipe(delay(500));
        }
      })
  }

  private fetchRoleBinding(name:string,namespace:string){

    this.roleBindingService.findRoleBinding(name,namespace)
      .subscribe(r=>{
        if (r.ok){
          this.roleBinding=r.body
          this.users=[]
          this.groups=[]
          this.roleBinding.subjects.forEach(sub=>{
            if (sub.kind=="Group"){
              this.groups.push({"value":sub.name,"display":sub.name})
            }
            if (sub.kind=="User"){
              this.users.push({"value":sub.name,"display":sub.name})
            }
            if (sub.kind=="ServiceAccount"){
              this.users.push({"value":sub.name,"display":sub.name})
            }
          })

          this.role=this.roleList.items.find(crl=> {return  crl.metadata.name==this.roleBinding.roleRef.name})
        }
    })
  }

  submitForm(){

    if (this.role){
      this.roleBinding.roleRef.apiGroup="rbac.authorization.k8s.io"
      this.roleBinding.roleRef.kind="Role"
      this.roleBinding.roleRef.name=this.role.metadata.name
      this.roleBinding.metadata.namespace=this.filterNamespace

  
      this.users.forEach(u=>{
        this.roleBinding.subjects.push(new Subject(u["value"],"rbac.authorization.k8s.io","User"))
      })
      
      this.groups.forEach(g=>{
        this.roleBinding.subjects.push(new Subject(g["value"],"rbac.authorization.k8s.io","Group"))
      })

      if (this.isEdit){
        this.roleBindingService.updateRoleBinding(this.roleBinding.metadata.name,this.roleBinding,this.roleBinding.metadata.namespace)
          .subscribe(r=>{
            if(r.ok ){
                this.toastr.success("Role permission updated.")
                this.fetchRoleBinding(this.roleBinding.metadata.name,this.roleBinding.metadata.namespace)
                return
            }
            this.toastr.error("An error ocurred while trying to update permission assignment.")
        }, e=>{
          this.toastr.error("Unexpected error ocurred.")
          })
      }else{
        this.roleBindingService.createRoleBinding(this.roleBinding,this.roleBinding.metadata.namespace)
          .subscribe(r=>{
            if(r.ok ){
                this.toastr.success("Role permission created.")
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
