import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ClusterRoleList } from '../../model/cluster-role-list';
import { ClusterRoleService } from '../../services/cluster-role.service';
import { NotifierService } from 'angular-notifier';


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
    private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.clusterRoleService.listClusterRoles().subscribe((r)=>{      
      this.clusterRoleList.apiVersion = r.body.apiVersion
      this.clusterRoleList.kind = r.body.kind
      this.clusterRoleList.items = []
      r.body.items.forEach(cr=>{
        if(!cr.metadata.name.startsWith('system:')){
          this.clusterRoleList.items.push(cr)
        }
      })
      }, (e)=>{
        console.error('an error has occur trying to fetch cluster roles', e)
    });
  }

  goToEdit(clusterRole: string){

    this.router.navigate(['new'],{
      queryParams: {
        clusterrole: clusterRole
      },
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
          this.deleteModal.hide()
          this.notifierService.notify('success','cluster role deleted succesfully.')
        }
        this.notifierService.notify('danger','An error ocurred trying to delete the cluster role.')

      }, (e)=>{
        console.error('an error has occur trying to fetch cluster roles', e)
    });
    }

    this.notifierService.notify('warning','no cluster role to be deleted was specified.')
    
  }

  
}
