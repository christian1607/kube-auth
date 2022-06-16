import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs/operators';
import { NamespaceList } from '../../../../model/namespace-list';
import { ServiceAccount } from '../../../../model/service-account';
import { Status } from '../../../../model/status';
import { NamespaceService } from '../../../../services/namespace.service';
import { ServiceAccountService } from '../../../../services/service-account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  sa: ServiceAccount=new ServiceAccount();
  private isEditServiceAccount: boolean =false
  namespaceList: NamespaceList = new NamespaceList();
  
 
  constructor(private serviceAccountService: ServiceAccountService, 
    private namespaceService: NamespaceService, 
    private toastr: ToastrService,
    private route: ActivatedRoute) { }



  async ngOnInit(){
   
   

    this.handleEditForm()
    this.listNamespaces();
  }
 
  private handleEditForm(){
    var sa = this.route.snapshot.queryParamMap.get('sa')
    var ns = this.route.snapshot.queryParamMap.get('namespace')

    if (sa && ns){
      this.isEditServiceAccount=true
      this.serviceAccountService.findServiceAccount(sa,ns)
        .subscribe(
          (r)=>{
            if(r.ok){
              this.sa=r.body
            }
          }, 
          (e)=>{
            this.toastr.error(e.error.message)
          }
        )
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
  


  submitForm(form){

    if (this.sa.metadata.name && this.sa.metadata.namespace){
      console.log(this.sa)
      if (this.isEditServiceAccount){
        debugger
        this.serviceAccountService.updateServiceAccount(this.sa)
        .subscribe(
          (r)=>{
            if(r.ok){
              this.toastr.success('Service Account updated!!')
            }
          }, 
          (e:HttpErrorResponse)=>{
            this.toastr.error(e.error.message)
          })
      }else{
        this.serviceAccountService.createServiceAccount(this.sa)
        .subscribe(
          (r)=>{
            if(r.ok){
              this.toastr.success('Service Account created!!')
            }
          }, 
          (e:HttpErrorResponse)=>{
            this.toastr.error(e.error.message)
          })
      }
      
    }else{
      this.toastr.warning('name and namespace are required.')
    }
  }

  
}
