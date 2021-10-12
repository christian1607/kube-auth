import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ClusterRoleBindingList } from '../../../../model/cluster-role-binding-list';
import { ClusterRoleBindingService } from '../../../../services/cluster-role-binding.service';
import { timeout } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-cluster-role',
  templateUrl: './cluster-role.component.html'
})
export class ClusterRoleBindingComponent implements OnInit {

  @ViewChild('deleteModal') 
  public deleteModal: ModalDirective;

  public listClusterRoleBinding = new ClusterRoleBindingList()
  
  private crbToDelete: string


  constructor(private clusterRoleBindingService: ClusterRoleBindingService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listClusterRoleBindings()
  }

  listClusterRoleBindings(){
    this.clusterRoleBindingService.listClusterRolesBindings()
    .pipe(timeout(environment.TIMEOUT_HTTP_REQUEST))
    .subscribe(r=>{
      if(r.ok){
        this.listClusterRoleBinding=r.body
        this.listClusterRoleBinding.items=this.listClusterRoleBinding.items.filter(crb=>{return !crb.metadata.name.startsWith("system:")})
      }
    })
    
  }

  goToEdit(crb: string){

    this.router.navigate(['register'],{
      queryParams: {
        "cluster-role-binding": crb,
      },
      relativeTo: this.route
    })

  }

  goToCreate(){
    this.router.navigate(['register'],{
      relativeTo: this.route
    })
  }

  openConfirmationModal(role: string){
    this.crbToDelete=role
    this.deleteModal.show()
  }
  
  deleteRole(){
    if (this.crbToDelete){
      this.clusterRoleBindingService.deleteClusterRoleBinding(this.crbToDelete).subscribe((r)=>{
        if (r.ok){
          this.listClusterRoleBinding.items = this.listClusterRoleBinding.items.filter(i=>{return i.metadata.name!==this.crbToDelete})
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

}
