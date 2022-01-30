import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs/operators';
import { NamespaceList } from '../../../model/namespace-list';
import { ServiceAccountList } from '../../../model/service-account-list';
import { NamespaceService } from '../../../services/namespace.service';
import { ServiceAccountService } from '../../../services/service-account.service';

@Component({
  selector: 'sa-role',
  templateUrl: './sa.component.html'
})
export class ServiceAccountComponent implements OnInit {

  @ViewChild('deleteModal') public deleteModal: ModalDirective;

  namespaceList: NamespaceList = new NamespaceList();

  private serviceAccountToDelete: string 
  private roleNamespaceToDelete: string 
  private filterNamespace: string 
  private saList: ServiceAccountList = new ServiceAccountList()
  
  constructor(private namespaceService: NamespaceService,
              private serviceAccountService: ServiceAccountService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) { }
  
  ngOnInit(): void {
    this.listAllServiceAccounts()
    this.listNamespaces();
  }


  goToEdit(_sa: string, _namespace:string){
  
    this.router.navigate(['new'],{
      queryParams: {
        sa: _sa,
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
    this.serviceAccountToDelete=role
    this.roleNamespaceToDelete=namespace
    this.deleteModal.show()
  }
  
  deleteServiceAccount(){
    if (this.serviceAccountToDelete && this.roleNamespaceToDelete){
      this.serviceAccountService.deleteServiceAccount(this.serviceAccountToDelete, this.roleNamespaceToDelete).subscribe((r)=>{
        if (r.ok){
          this.saList.items = this.saList.items.filter(i=>{return i.metadata.name!==this.serviceAccountToDelete})
          this.deleteModal.hide()
          this.toastr.success('Service Account deleted succesfully.')
        }else{
          this.toastr.error('An error ocurred trying to delete the Service Account.')
        }
        
  
      }, (e)=>{
        this.toastr.error('An error ocurred trying to delete the Service Account.')
    });
    }else{
      this.toastr.warning('no Service Account to be deleted was specified.')
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

  filterSaByNamespace(){

    if (this.filterNamespace){
      this.serviceAccountService.listServiceAccountByNamespace(this.filterNamespace)
      .pipe(timeout(5000))
      .subscribe((r)=>{      
        this.saList.apiVersion = r.body.apiVersion
        this.saList.kind = r.body.kind
        this.saList.items = []
        r.body.items.forEach(cr=>{
          this.saList.items.push(cr)
        })
        }, (e)=>{
          this.toastr.error('An error has occur trying to fetch service accounts.')
        });
    }else{
      this.listAllServiceAccounts()
    }
  }

  listAllServiceAccounts(){
    this.serviceAccountService.listServiceAccount()
      .pipe(timeout(5000))
      .subscribe((r)=>{      
        this.saList.apiVersion = r.body.apiVersion
        this.saList.kind = r.body.kind
        this.saList.items = []
        r.body.items.forEach(cr=>{
          this.saList.items.push(cr)
        })
      }, (e)=>{
        this.toastr.error('An error has occur trying to fetch service accounts.')
      }
    );
  }



}