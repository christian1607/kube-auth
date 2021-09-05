import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs/operators';
import { NamespaceList } from '../../model/namespace-list';
import { RoleList } from '../../model/role-list';
import { NamespaceService } from '../../services/namespace.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html'
})
export class RoleComponent implements OnInit {

  @ViewChild('deleteModal') public deleteModal: ModalDirective;

  roleList: RoleList = new RoleList();
  namespaceList: NamespaceList = new NamespaceList();

  private roleToDelete: string 
  private roleNamespaceToDelete: string 
  private filterNamespace: string 
  
  
  constructor(private roleService: RoleService, 
    private namespaceService: NamespaceService, 
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }
  
  ngOnInit(): void {
    this.listAllRoles();
    this.listNamespaces();
  }


  goToEdit(_role: string, _namespace:string){
  
    this.router.navigate(['new'],{
      queryParams: {
        role: _role,
        namespace: _namespace
      },
      relativeTo: this.route
    })
  }
  
  goToCreate(){
    this.router.navigate(['new'],{
      relativeTo: this.route
    })
  }
  
  openConfirmationModal(role: string, namespace:string){
    this.roleToDelete=role
    this.roleNamespaceToDelete=namespace

    this.deleteModal.show()
  }
  
  deleteRole(){
    if (this.roleToDelete && this.roleNamespaceToDelete){
      this.roleService.deleteRole(this.roleToDelete, this.roleNamespaceToDelete).subscribe((r)=>{
        if (r.ok){
          this.roleList.items = this.roleList.items.filter(i=>{return i.metadata.name!==this.roleToDelete})
          this.deleteModal.hide()
          this.toastr.success('Role deleted succesfully.')
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


  private listNamespaces(){

    this.namespaceService.listAllNamespaces()
      .pipe(timeout(5000))
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

  filterRoleByNamespace(){

    if (this.filterNamespace){
      this.roleService.listRoles(this.filterNamespace)
      .pipe(timeout(5000))
      .subscribe((r)=>{      
        this.roleList.apiVersion = r.body.apiVersion
        this.roleList.kind = r.body.kind
        this.roleList.items = []
        r.body.items.forEach(cr=>{
          if(!cr.metadata.name.startsWith('system:')){
            this.roleList.items.push(cr)
          }
        })
        }, (e)=>{
          this.toastr.error('An error has occur trying to fetch roles.')
        });
    }else{
      this.listAllRoles()
    }
  }

  listAllRoles(){
    this.roleService.listRolesAllNamespaces()
      .pipe(timeout(5000))
      .subscribe((r)=>{      
        this.roleList.apiVersion = r.body.apiVersion
        this.roleList.kind = r.body.kind
        this.roleList.items = []
        r.body.items.forEach(cr=>{
          if(!cr.metadata.name.startsWith('system:')){
            this.roleList.items.push(cr)
          }
        })
      }, (e)=>{
        this.toastr.error('An error has occur trying to fetch roles.')
      }
    );
  }



}