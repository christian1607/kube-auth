import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../app.component';
import { ApiGroupService } from '../../services/api-group.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent { 

  apiServerUrl: string = ""
  token: string = ""

  constructor(private toastr: ToastrService,
    private router: Router,
    private apiGroupService: ApiGroupService) {

  }


  testConnectivity(){
    this.apiGroupService.listApisConnectivity(this.apiServerUrl,this.token).subscribe(r=>{
      if(r.ok){
        this.toastr.success('Ok')    
      }else{
        this.toastr.warning("Couldn't connect with the cluster, make sure the token is correct.")
      }
    }, (e: HttpErrorResponse) => {
      if (e.status==401){
        this.toastr.warning("Invalid Token.")
      }else{
        this.toastr.error("Couldn't connect with the cluster.")
      }
    })
    
  }

  submitForm(form){
  
    this.apiGroupService.listApisConnectivity(this.apiServerUrl,this.token).subscribe(r=>{
      if(r.ok){
        debugger
        AppComponent.apiServerUrl=this.apiServerUrl
        localStorage.setItem("token",this.token)
        this.router.navigate(["dashboard"])
      }else{
        this.toastr.warning("Couldn't connect with the cluster, make sure the token is correct.")
      }
    }, (e: HttpErrorResponse) => {
      if (e.status==401){
        this.toastr.warning("Invalid Token.")
      }else{
        this.toastr.error("Couldn't connect with the cluster.")
      }
    })
  
  }


}
