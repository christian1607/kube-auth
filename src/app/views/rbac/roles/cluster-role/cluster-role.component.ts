import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs/operators';
import { ClusterRoleList } from '../../../../model/cluster-role-list';
import { ClusterRoleService } from '../../../../services/cluster-role.service';



@Component({
  selector: 'app-cluster-role',
  templateUrl: './cluster-role.component.html'
})
export class ClusterRoleComponent implements OnInit {

  @ViewChild('deleteModal') public deleteModal: ModalDirective;

  clusterRoleList: ClusterRoleList = new ClusterRoleList();
  private clusterRoleToDelete: string 


  constructor(private clusterRoleService: ClusterRoleService, 
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.clusterRoleService.listClusterRoles()
      .pipe(timeout(5000))
      .subscribe((r)=>{      
        this.clusterRoleList.apiVersion = r.body.apiVersion
        this.clusterRoleList.kind = r.body.kind
        this.clusterRoleList.items = []
        r.body.items.forEach(cr=>{
          if(!cr.metadata.name.startsWith('system:')){
            this.clusterRoleList.items.push(cr)
          }
        })
      }, (e)=>{
        this.toastr.error('An error has occur trying to fetch cluster roles.')
      }
    );
  }

  goToEdit(clusterRole: string){

    this.router.navigate(['new'],{
      queryParams: {
        clusterrole: clusterRole
      },
      relativeTo: this.route
    })
  }

  goToCreate(){
    this.router.navigate(['new'],{
      relativeTo: this.route
    })
  }


  openConfirmationModal(clusterRole: string){
    this.clusterRoleToDelete=clusterRole
    this.deleteModal.show()
  }

  deleteClusterRole(){
    if (this.clusterRoleToDelete){
      this.clusterRoleService.deleteClusterRole(this.clusterRoleToDelete).subscribe((r)=>{
        if (r.ok){
          this.clusterRoleList.items=this.clusterRoleList.items.filter(i=>{return i.metadata.name!==this.clusterRoleToDelete})
          this.deleteModal.hide()
          this.toastr.success('cluster role deleted succesfully.')
        }else{
          this.toastr.error('An error ocurred trying to delete the cluster role.')
        }
        

      }, (e)=>{
        this.toastr.error('An error ocurred trying to delete the cluster role.')
    });
    }else{
      this.toastr.warning('no cluster role to be deleted was specified.')
    }

    
    
  }

  
}
