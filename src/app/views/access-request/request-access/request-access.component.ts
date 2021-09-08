import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-request-access',
  templateUrl: './request-access.component.html',
  styleUrls: ['./request-access.component.scss']
})
export class RequestAccessComponent implements OnInit {


  csr: string;
  csrName: string;

  username: string
  groups: string
  opensslcsrcommand: string = ""
  opensslkeycommand: string = ""
  constructor(private toastr: ToastrService) {
  }
  ngOnInit(): void {
  }


  async createPrivateKey(){

   
  
  }

  updateCreateKeyCommand(){
    if (this.username){
      this.opensslkeycommand="openssl genrsa -out user-"+this.username+".key 2048" 
    }    
  }

  updateCreateCsrCommand(){
    if (this.username && this.groups){
      var groupsList = this.groups.trim().split(",")      
      var groupsCsr=""
      groupsList.forEach(g=>{
        if (g){
          groupsCsr=groupsCsr+"/O="+g
        }        
      })
      this.opensslcsrcommand="openssl req -new -key user-"+this.username+ ".key -out user-"+this.username+".csr -subj '/CN="+this.username+groupsCsr+"'" 
    }    
  }


  
  submitForm(){
    if(this.csrName && this.csr){

    }else{
      this.toastr.warning("Name and Private Key are required fields.")
    }
    //TODO: Invoke api to create Certificate Signing REquest
  }

}
