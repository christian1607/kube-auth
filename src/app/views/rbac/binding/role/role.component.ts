import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { RoleBindingList } from '../../../../model/role-binding-list';
import { RoleBindingService } from '../../../../services/role-binding.service';
import { timeout } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { NamespaceList } from '../../../../model/namespace-list';
import { NamespaceService } from '../../../../services/namespace.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html'
})
export class RoleBindingComponent implements OnInit {

  @ViewChild('deleteModal') 
  public deleteModal: ModalDirective;

  public listRoleBinding = new RoleBindingList()
  
  private rbToDelete: string
  private filterNamespace: string 
  private rolebindingNamespaceToDelete: string

  namespaceList: NamespaceList = new NamespaceList();


  constructor(private roleBindingService: RoleBindingService,
    private route: ActivatedRoute,
    private router: Router,
    private namespaceService: NamespaceService, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listRoleBindings()
    this.listNamespaces();

  }

  listRoleBindings(){
    this.roleBindingService.listRolesBindings()
    .pipe(timeout(environment.TIMEOUT_HTTP_REQUEST))
    .subscribe(r=>{
      if(r.ok){
        this.listRoleBinding=r.body
        this.listRoleBinding.items=this.listRoleBinding.items.filter(crb=>{return !crb.metadata.name.startsWith("system:")})
      }
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

  goToEdit(crb: string){

    this.router.navigate(['register'],{
      queryParams: {
        "role-binding": crb,
      },
      relativeTo: this.route
    })

  }

  goToCreate(){
    this.router.navigate(['register'],{
      relativeTo: this.route
    })
  }

  openConfirmationModal(role: string,namespace:string){
    this.rbToDelete=role
    this.rolebindingNamespaceToDelete=namespace
    this.deleteModal.show()
  }
  
  deleteRole(){
    if (this.rbToDelete && this.rolebindingNamespaceToDelete){
      this.roleBindingService.deleteRoleBinding(this.rbToDelete,this.rolebindingNamespaceToDelete)
      .subscribe((r)=>
        {
          if (r.ok){
            this.listRoleBinding.items = this.listRoleBinding.items.filter(i=>{return i.metadata.name!==this.rbToDelete})
            this.deleteModal.hide()
            this.toastr.success('Assignment deleted succesfully.')
          }else{
            this.toastr.error('An error ocurred trying to delete the role.')
          }
        }, (e)=>{
          this.toastr.error('An error ocurred trying to delete the role.')
      });
    }else{
      this.toastr.warning('no role to be deleted was specified.')
    }    
  }

  filterRoleByNamespace(){

    if (this.filterNamespace){
      this.roleBindingService.listRolesBindingsByNamespace(this.filterNamespace)
      .pipe(timeout(5000))
      .subscribe((r)=>{      
        this.listRoleBinding.items = []
        r.body.items.forEach(cr=>{
          if(!cr.metadata.name.startsWith('system:')){
            this.listRoleBinding.items.push(cr)
          }
        })
        }, (e)=>{
          this.toastr.error('An error has occur trying to fetch roles.')
        });
    }else{
      this.listRoleBindings()
    }
  }

}
