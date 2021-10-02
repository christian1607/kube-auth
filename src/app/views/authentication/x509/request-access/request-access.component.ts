import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CertificateSigningRequest } from '../../../../model/certificate-signing-request';
import { CertificateSigningRequestSpec } from '../../../../model/certificate-signing-request-spec';
import { Metadata } from '../../../../model/metadata';
import { CsrService } from '../../../../services/csr.service';

const SIGNER_NAME="kubernetes.io/kube-apiserver-client"

@Component({
  selector: 'app-request-access',
  templateUrl: './request-access.component.html'
})
export class RequestAccessComponent implements OnInit {

  

  csr: string;
  csrName: string;
  username: string
  groups: string
  opensslcsrcommand: string = ""
  opensslkeycommand: string = ""

  constructor(private toastr: ToastrService,
    private csrService: CsrService) {
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
      this.opensslcsrcommand="openssl req -new -key user-"+this.username+".key -out user-"+this.username+".csr -subj '/CN="+this.username+groupsCsr+"'" 
    }    
  }


  
  submitForm(){
    if(this.csrName && this.csr){
      var certificateSigningRequest=new CertificateSigningRequest();
      certificateSigningRequest.apiVersion="certificates.k8s.io/v1"
      certificateSigningRequest.kind="CertificateSigningRequest"
      certificateSigningRequest.metadata=new Metadata()
      certificateSigningRequest.metadata.name=this.csrName
      certificateSigningRequest.spec=new CertificateSigningRequestSpec();
      certificateSigningRequest.spec.request= btoa(this.csr.trim())
      certificateSigningRequest.spec.signerName=SIGNER_NAME
      certificateSigningRequest.spec.usages=["client auth"]
      
      //expirationSeconds: 86400  one day
      console.log(certificateSigningRequest)
      this.csrService.createCertificateSigningRequest(certificateSigningRequest).subscribe((r)=>{
        if (r.ok){
          this.toastr.success("Access Request created sucessfully.")
          this.cleanFields()
        }else{
          this.toastr.error('An error ocurred trying to create the access.')
        }    
      }, (e)=>{
        this.toastr.error('Unexpected error has ocurred.')
    });

    }else{
      this.toastr.warning("Fields name and certificate Signing request are required.")
    }
  }

  cleanFields(){
    this.csrName=""
    this.csr=""
  }

}
